import {omitBy, clone, merge, startCase, uniqBy} from "lodash"
import {blank, displayLocationFromSlug} from "../../../../services/helpers"
import {searchService, SOLR, GOOGLE_TALENT} from "../../../../services/search"

export default {
    props: {
        siteConfig: {
            required: true,
            type: Object,
        },
        tag: {
            required: false,
            type: String,
            default: "div",
        },
        searchOnLoad: {
            type: Boolean,
            default: true,
            required: false,
        },
    },
    data() {
        return {
            jobs: [],
            meta: {
                source: this.siteConfig.source,
            },
            status: {
                loading: false,
                error: false,
            },
            filters: [],
            pagination: {},
            featuredJobs: [],
            appliedFilters: [],
            isCommuteSearch: false,
            input: this.defaultInput,
        }
    },
    computed: {
        source() {
            return this.isGoogleTalent ? GOOGLE_TALENT : SOLR
        },
        inputDefinition() {
            return {
                ...this.sharedInputDefinition(),
                ...this.providerInputDefinition(),
            }
        },
        defaultInput() {
            let defaults = {}
            Object.entries(this.inputDefinition).forEach(
                ([name, definition]) => {
                    defaults[name] = definition.default
                }
            )
            return defaults
        },
        service() {
            return searchService
        },
        isGoogleTalent() {
            return this.meta.source == GOOGLE_TALENT
        },
        //unused
        isSolr() {
            return this.meta.source == SOLR
        },
        hasJobs() {
            return this.jobs.length > 0 || this.featuredJobs.length > 0
        },
        configFilters() {
            return this.siteConfig.filters || []
        },
        sort() {
            let sort = {
                options: [],
                sortField: () => {},
                by: null,
            }

            let sortMeta = clone(this.meta.sort || {})
            if (blank(sortMeta)) {
                return sort
            }
            sort.sortField = field => {
                this.input.sort = field.toLowerCase()
                this.newSearch()
            }
            sort.by = blank(sortMeta) ? "" : startCase(sortMeta.active)
            sort.options = sortMeta.options.map(o => startCase(o))
            return sort
        },
        slotData() {
            return {
                jobs: this.jobs,
                sort: this.sort,
                input: this.input,
                status: this.status,
                hasJobs: this.hasJobs,
                source: this.meta.source,
                setInput: this.setInput,
                newSearch: this.newSearch,
                pagination: this.pagination,
                featuredJobs: this.featuredJobs,
                removeFilter: this.removeFilter,
                isGoogleTalent: this.isGoogleTalent,
                appliedFilters: this.appliedFilters,
                isCommuteSearch: this.isCommuteSearch,
                getFilterOptions: this.getFilterOptions,
                filteredInput: this.filterInput(this.input),
            }
        },
    },
    watch: {
        //any time query string changes, update component input and search.
        "$route.query"() {
            this.input = this.mergeWithDefaultInput(this.$route.query)
            this.queryChanged()
            this.search()
        },
    },
    created() {
        this.input = this.mergeWithDefaultInput({
            ...this.$route.query,
            ...this.$route.params,
        })

        if (!blank(this.$route.params.location)) {
            this.input.location = displayLocationFromSlug(this.input.location)
        }

        if (this.searchOnLoad) {
            this.search()
        } else {
            this.appliedFilters = this.getAppliedFilters()
        }
    },
    methods: {
        queryChanged() {},
        beforeSearch() {},
        excludePayload() {
            return []
        },
        providerInputDefinition() {
            return {}
        },
        applyFilters() {
            return []
        },
        sharedInputDefinition() {
            return {
                q: {
                    default: "",
                },
                r: {
                    default: "",
                },
                location: {
                    default: "",
                    clears: ["coords", "r"],
                },
                coords: {
                    default: "",
                    clears: ["location", "r"],
                },
                page: {
                    default: 1,
                },
                sort: {
                    default: "relevance",
                },
            }
        },
        mergeWithDefaultInput(object = {}) {
            return {
                ...this.defaultInput,
                ...object,
            }
        },
        removeFilter(params) {
            if (params == "*") {
                return this.newSearch(this.defaultInput)
            }
            if (!Array.isArray(params)) {
                params = [params]
            }

            let otherParams = null
            let definition = null
            let getDefinition = name => this.inputDefinition[name] || {}

            params.forEach(key => {
                // default this input filter
                definition = getDefinition(key)
                this.input[key] = definition.default || ""
                //then default dependent params as defined in definition for this input.
                otherParams = definition.clears || []
                otherParams.forEach(name => {
                    definition = getDefinition(name)
                    this.input[name] = definition.default || ""
                })
            })

            this.newSearch()
        },
        getAppliedFilters() {
            return uniqBy(this.configFilters, "name")
                .filter(filter => {
                    return !blank(this.input[filter.name])
                })
                .map(filter => {
                    return {
                        display: this.input[filter.name],
                        parameter: filter.name,
                    }
                })
                .concat(this.applyFilters())
        },
        search() {
            this.beforeSearch()
            this.status.loading = true
            this.service(this.filterInput(this.input), this.siteConfig)
                .then(resp => {
                    const data = resp.data || {}
                    this.featuredJobs = data.featured_jobs || []
                    this.pagination = data.pagination || {}
                    this.filters = data.filters || {}
                    this.jobs = data.jobs || []
                    this.meta = data.meta || {source: SOLR} //prevents sites from erroring when unable to connect to api
                    this.appliedFilters = this.getAppliedFilters()
                })
                .catch(err => {
                    this.status.error = err
                })
                .finally(() => {
                    this.status.loading = false
                })
        },
        getFilterKey(filter) {
            let key = filter.key
            if(typeof key == "object"){
                key = key[this.source]
            }
            return blank(key) ? filter.name : key
        },
        getFilterOptions(filter) {
            let options = this.filters[this.getFilterKey(filter)]
            return blank(options) || !Array.isArray(options) ? [] : options
        },
        setInput(filter) {
            this.newSearch(
                this.mergeWithDefaultInput({
                    ...this.input,
                    ...filter,
                })
            )
        },
        filterInput(input) {
            let excluded = this.excludePayload()
            return omitBy(input, (v, k) => {
                return blank(v) || excluded.includes(k)
            })
        },
        newSearch(payload = null) {
            payload = payload === null ? this.input : payload
            this.$router
                .push({
                    path: "/jobs",
                    query: this.filterInput(payload),
                })
                .catch(err => {})
        },
    },
}
