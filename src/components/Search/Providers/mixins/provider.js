import {omitBy, clone, startCase, uniqBy, map} from "lodash"
import {blank} from "../../../../services/helpers"
import {
    searchService,
    SOLR,
    GOOGLE_TALENT,
    parseRouteSearchInput,
} from "../../../../services/search"

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
        },
        delayLoadBy: {
            type: Number,
            default: 0,
            required: false,
        },
        static: {
            type: Object,
            required: false,
            default: function() {
                return {}
            },
        },
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
            rss: "/feed/rss",
            jobs: [],
            jobDisplay: [],
            filters: [],
            pagination: {},
            canonical: this.$route.path,
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
        domain() {
            if (process.isClient) {
                return `${location.protocol}//${location.host}`
            }
            return ""
        },
        canonicalHref() {
            return `${this.domain}${this.canonical}`
        },
        rssHref() {
            return `${this.domain}${this.rssPath}${this.rss}`
        },
        rssTitle() {
            if (this.static?.metadata?.siteName !== undefined) {
                return `${this.static.metadata.siteName} - Jobs`
            }
            return "Jobs"
        },
        rssPath() {
            if (this.shouldIncludeCurrentPath()) {
                return this.$route.path
            }
            return ""
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
                if (name == "page" && this.isLoadMore) {
                    return
                }
                defaults[name] = definition.default
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
                by: null,
            }
            let sortMeta = clone(this.meta.sort || {})

            if (blank(sortMeta)) {
                return sort
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
                isGoogleTalent: this.isGoogleTalent,
                appliedFilters: this.appliedFilters,
                isCommuteSearch: this.isCommuteSearch,
                getFilterOptions: this.getFilterOptions,
                filteredInput: this.filterInput(this.input),
            }
        },
    },
    watch: {
        //any time route changes, update component input and search.
        $route(newval, oldval) {
            this.jobDisplay = []
            this.isFirstLoad = true
            this.input = this.mergeWithDefaultInput(
                parseRouteSearchInput(this.$route)
            )

            this.queryChanged()
            this.extraData = this.defaultExtraData()
            this.search()
        },
    },
    metaInfo() {
        return {
            link: [
                {rel: "canonical", href: this.canonicalHref},
                {
                    rel: "alternative",
                    title: this.rssTitle,
                    type: "application/rss+xml",
                    href: this.rssHref,
                },
            ],
        }
    },
    created() {
        this.input = this.mergeWithDefaultInput(
            parseRouteSearchInput(this.$route)
        )

        if (this.searchOnLoad) {
            this.search()
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
                    clears: ["coords", "location"],
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
        getExtraData() {
            return {
                ...this.extraData,
                ...this.getUrlExtraDataObject({
                    ...this.$route.params,
                }),
            }
        },
        mergeWithDefaultInput(object = {}) {
            let input = {
                ...this.getUrlFiltersObject({
                    ...this.defaultInput,
                    ...object,
                }),
            }

            return input
        },
        getUrlFiltersObject(object) {
            const filterSlugs = this.getConfigFilterSlugs()
            const defaultInputKeys = Object.keys(this.defaultInput)
            const possibleKeys = defaultInputKeys.concat(filterSlugs)

            for (const key in object) {
                if (!possibleKeys.includes(key)) {
                    delete object[key]
                }
            }
            return object
        },
        getUrlExtraDataObject(object) {
            let filterSlugs = this.getConfigFilterSlugs()
            for (const key in object) {
                if (filterSlugs.includes(key)) {
                    delete object[key]
                }
            }
            return object
        },
        getConfigFilterSlugs() {
            return map(uniqBy(this.siteConfig.filters, "name"), "name")
        },
        search() {
            this.status.loading = true
            delete this.status.error
            this.beforeSearch()
            if (this.isLoadMore) {
                this.beforeLoadMoreSearch()
            }
            return this.service(
                {...this.filterInput(this.input), ...this.getExtraData()},
                this.siteConfig.source
            )
                .then(resp => {
                    const data = resp.data || {}
                    this.featuredJobs = data.featured_jobs || []
                    this.pagination = data.pagination || {}
                    this.filters = data.filters || {}
                    this.jobs = data.jobs || []
                    this.meta = data.meta || {
                        source: SOLR,
                    } //prevents sites from erroring when unable to connect to api
                    this.canonical = data.meta.canonical
                    this.rss = data.meta.rss
                    this.appliedFilters = data.meta.filters || []
                    this.searchCompleted(data)
                    if (!this.isLoadMore) {
                        this.jobDisplay = this.jobs
                    }
                    if (this.isLoadMore && this.isFirstLoad) {
                        this.jobDisplay = this.jobs.splice(
                            0,
                            this.siteConfig.num_items
                        )
                    }
                })
                .catch(err => {
                    this.status.error = err
                })
                .finally(() => {
                    this.isFirstLoad = false
                    setTimeout(() => {
                        this.status.loading = false
                    }, this.delayLoadBy)
                })
        },
        getFilterKey(filter) {
            let key = filter.key
            if (typeof key == "object") {
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
                    num_items: this.siteConfig.num_items,
                    offset: 0,
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
        shouldIncludeCurrentPath() {
            const oldPaths = [
                "jobs",
                "new-jobs",
                "vet-jobs",
                "jobs-in",
                "careers",
            ]
            let lastPath = this.$route.path.split("/").pop()

            if (!oldPaths.includes(lastPath) || this.$route.path == "/jobs") {
                return this.$route.path !== "/" ? true : false
            }
            return false
        },
    },
}
