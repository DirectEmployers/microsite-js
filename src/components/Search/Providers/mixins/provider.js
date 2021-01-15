import {omitBy, clone, startCase, uniqBy} from "lodash"
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
        isLoadMore: {
            type: Boolean,
            default: false,
            required: false,
        }
    },
    data() {
        return {
            meta: {
                source: this.siteConfig.source,
            },
            status: {
                loading: false,
                error: false,
            },
            jobs: [],
            jobDisplay: [],
            filters: [],
            pagination: {},
            featuredJobs: [],
            isFirstLoad: true,
            appliedFilters: [],
            isCommuteSearch: false,
            input: this.defaultInput,
            extraData: this.defaultExtraData(),
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
            Object.entries(this.inputDefinition).forEach(entry => {
                const [name, definition] = entry
                if (name == 'page' && this.isLoadMore) {
                    return
                }
                defaults[name] = definition.default

                if(definition.clears){
                    this.extraData.clears[name] = definition.clears
                }
            })
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
                sort: this.sort,
                input: this.input,
                status: this.status,
                hasJobs: this.hasJobs,
                jobs: this.jobDisplay,
                loadMore: this.loadMore,
                setInput: this.setInput,
                source: this.meta.source,
                newSearch: this.newSearch,
                isLoadMore: this.isLoadMore,
                pagination: this.pagination,
                featuredJobs: this.featuredJobs,
                removeFilter: this.removeFilter,
                appliedFilters: this.appliedFilters,
                isGoogleTalent: this.isGoogleTalent,
                isCommuteSearch: this.isCommuteSearch,
                getFilterOptions: this.getFilterOptions,
                filteredInput: this.filterInput(this.input),
            }
        },
    },
    watch: {
        //any time query string changes, update component input and search.
        "$route.query"(newval, oldval) {
            this.jobDisplay = []
            this.isFirstLoad = true
            this.input = this.mergeWithDefaultInput(this.$route.query)
            this.queryChanged()
            this.extraData = this.defaultExtraData()
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
            this.search().then(() => {
                if (this.isLoadMore) {
                    this.extraData.offset = this.extraData.num_items
                    this.extraData.num_items /= 2
                    this.jobDisplay = this.jobs.splice(0, this.extraData.num_items)
                }
            })
        } else {
            this.appliedFilters = this.getAppliedFilters()
        }
    },
    methods: {
        queryChanged() {},
        beforeSearch() {},
        beforeLoadMoreSearch() {
            if (this.isFirstLoad) {
                this.extraData.offset = 0
                this.extraData.num_items *= 2
            } else {
                this.extraData.offset += this.extraData.num_items
                this.extraData.num_items = this.siteConfig.num_items
            }
        },
        searchCompleted(data) {},
        excludePayload() {
            return []
        },
        providerInputDefinition() {
            return {}
        },
        applyFilters() {
            return []
        },
        loadMore() {
            this.jobDisplay = this.jobDisplay.concat(this.jobs)
            this.search()
        },
        sharedInputDefinition() {
            return {
                q: {
                    default: "",
                },
                r: {
                    default: "",
                    clears: ["coords", "location"]
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

        getAppliedFilters() {
            return uniqBy(this.configFilters, "name")
                .filter(filter => {
                    return !blank(this.input[filter.name])
                })
                .map(filter => {
                    let parameter = this.extraData.clears[filter.name] ? [filter.name].concat(this.extraData.clears[filter.name]) : 'filter.name'
                    return {
                        display: this.input[filter.name],
                        parameter,
                    }
                })
                .concat(this.applyFilters())
        },

        search() {
            this.status.loading = true
            this.beforeSearch()
            if (this.isLoadMore) {
                this.beforeLoadMoreSearch()
            }
            return this.service({...this.filterInput(this.input), ...this.extraData}, this.siteConfig)
                .then(resp => {
                    const data = resp.data || {}
                    this.featuredJobs = data.featured_jobs || []
                    this.pagination = data.pagination || {}
                    this.filters = data.filters || {}
                    this.jobs = data.jobs || []
                    this.meta = data.meta || {
                        source: SOLR,
                    } //prevents sites from erroring when unable to connect to api
                    this.appliedFilters = this.getAppliedFilters()
                    this.searchCompleted(data)
                    if (!this.isLoadMore){
                        this.jobDisplay = this.jobs
                    }
                    if (this.isLoadMore && this.isFirstLoad) {
                        this.jobDisplay = this.jobs.splice(0, this.siteConfig.num_items)
                    }
                })
                .catch(err => {
                    this.status.error = err
                })
                .finally(() => {
                    this.isFirstLoad = false
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
            options = blank(options) || !Array.isArray(options) ? [] : options
            return options
        },
        setInput(filter) {
            this.newSearch(
                this.mergeWithDefaultInput({
                    ...this.input,
                    ...filter,
                })
            )
        },
        defaultExtraData() {
            if (this.isLoadMore) {
                return {
                    offset: 0,
                    clears: {},
                    num_items: this.siteConfig.num_items,
                }
            }
            return {}
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
