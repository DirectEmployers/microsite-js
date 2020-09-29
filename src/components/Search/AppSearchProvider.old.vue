<template>
    <component :is="tag">
        <slot
            :filters="filters"
            :setUserCoordinates="setUserCoordinates"
            :blank="blank"
            :input="input"
            :getFilterOptions="getFilterOptions"
            :jobs="jobs"
            :meta="meta"
            :pagination="pagination"
            :status="status"
            :source="source"
            :sort="sort"
            :submitSearchForm="submitSearchForm"
            :supported="supported"
            :selectPage="selectPage"
            :featuredJobs="featuredJobs"
            :isGoogleTalent="meta.source == 'google_talent'"
            :isSolr="meta.source == 'solr'"
        />
    </component>
</template>
<script>
import {blank, log} from "../../services/helpers"
import {fullState, removeCountry, getGeoLocation} from "../../services/api/location"
import {omitBy, omit, clone, merge, assign} from "lodash"
import {SearchService, CommuteSearchService} from "../../services/api/search"

export default {
    props: {
        siteConfig: {
            required: true,
            type: Object,
        },
        geoLocationInputText: {
            required: false,
            type: String,
            default: "Your Location",
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
        defaultInput: {
            required: false,
            type: Object,
            default: () => {},
        },
    },
    data() {
        const defaultInput = this.getInputDefaults()
        return {
            jobs: [],
            featuredJobs: [],
            source: this.siteConfig.source,
            filters: [],
            pagination: {},
            status: {
                loading: false,
                error: false,
            },
            supported: {
                geolocation: false,
            },
            meta: {},
            input: defaultInput,
        }
    },
    created() {
        // set meta in created because it references computed properties
        // which is not avilable during a gridsome build
        this.meta = this.getDefaultMeta()
        //allow other components to update input via global event.
        this.$router.app.$on("searchInputUpdated", this.setInput)

        //filter/breadcrumb removal
        this.$router.app.$on("searchFilterRemoved", this.removeFilter)

        this.setInputFromQuery()

        if (this.searchOnLoad) {
            this.search()
        }
    },
    mounted() {
        if (process.isClient) {
            this.supported["geolocation"] = "geolocation" in window.navigator
        }
    },
    computed: {
        hasJobs() {
            return (this.jobs || []).length > 0
        },
        hasFeaturedJobs() {
            return (this.featuredJobs || []).length > 0
        },
        isLocationSearch() {
            return this.input.searchType == "location"
        },
        isCommuteSearch() {
            return this.input.searchType == "commute"
        },
        searchService() {
            const searchType = this.input.searchType
            switch (searchType) {
                case "commute":
                    return CommuteSearchService
                case "location":
                default:
                    return SearchService
            }
        },
        configFilters(){
            return this.siteConfig.filters || []
        },
        selectedFilters() {
            let value = null
            let name = null
            let duplicates = []
            let filters = []

            this.configFilters.forEach(filter => {
                name = filter.name

                value = this.input[name]

                if (!this.blank(value) && !duplicates.includes(name)) {
                    duplicates.push(name)

                    filters.push({
                        display: value,
                        parameter: name,
                    })
                }
            })

            return filters
        },

        filterParamList() {
            let params = this.configFilters.map(filter => {
                return filter.name
            })

            return params.concat(Object.keys(this.getInputDefaults()))
        },
    },
    watch: {
        //any time query string changes, update component input and search.
        "$route.query"() {
            this.setInputFromQuery()
            this.search()
        },
    },
    methods: {
        selectPage(page) {
            this.$router.push({
                path: this.$route.path,
                query: {
                    ...this.$route.query,
                    ...{page: page},
                },
            })

            this.$el.scrollIntoView()
        },

        getInputDefaults() {
            let defaultInput = clone(this.defaultInput)

            return merge(
                {
                    searchType: "location",
                    commuteMethod: "DRIVING",
                    travelDuration: "900",
                    roadTraffic: "TRAFFIC_FREE",
                    commuteLocation: "",
                    q: "",
                    r: "",
                    moc: "",
                    location: "",
                    coords: null,
                    sort: "relevance",
                },
                defaultInput
            )
        },

        hasLocationInput() {
            if (this.isLocationSearch && !this.blank(this.input.location)) {
                return true
            }

            if (this.isCommuteSearch && !this.blank(this.input.coords)) {
                return true
            }

            return false
        },
        removeFilter(param) {
            const query = {...this.$route.query}
            const defaultInput = this.getInputDefaults()

            let toRemove = [param]

            if (param == "*") {
                toRemove = this.filterParamList
            }

            if (toRemove.includes("location")) {
                toRemove.push("coords")

                if (!this.hasLocationInput()) {
                    this.input.sort = defaultInput["sort"]

                    query["sort"] = this.input.sort
                }
            }

            toRemove.forEach(param => {
                delete query[param]
            })

            query["page"] = 1

            this.$router.replace({query})
        },

        sort(field) {
            if (!this.meta.sort.options.includes(field)) {
                throw new Error(`Invalid sort option ${field}`)
            }

            const query = {...this.$route.query}

            query["sort"] = field

            this.$router.replace({query})
        },

        hasInput(key) {
            return !blank(this.input[key])
        },

        setInput(key, value) {
            this.$set(this.input, key, value)
        },

        getPayload() {
            let data = omitBy(clone(this.input), blank)

            if (!this.isCommuteSearch) {
                data = omit(data, [
                    "searchType",
                    "commuteLocation",
                    "roadTraffic",
                    "travelDuration",
                    "commuteMethod",
                ])
            }
            return data
        },

        getFilterOptions(filter) {
            let key = filter.key

            if (this.blank(key)) {
                key = filter.name
            }

            if (Object.prototype.hasOwnProperty.call(this.filters, key)) {
                return this.filters[key]
            }

            return []
        },

        getDefaultMeta() {
            let inputDefaults = this.getInputDefaults()

            let source = this.siteConfig.source

            return clone({
                hasJobs: this.hasJobs,
                hasFeaturedJobs: this.hasFeaturedJobs,
                selectedFilters: this.selectedFilters,
                source: source,
                sort: {
                    active: inputDefaults["sort"],
                    options: ["relevance", "distance", "title", "date"],
                },
            })
        },

        setMeta(meta) {
            this.meta = merge(this.getDefaultMeta(), meta)
        },
        
        async search() {
            this.status.loading = true

            const Service = this.searchService

            try {
                const response = await Service.get(
                    this.getPayload(),
                    this.siteConfig
                )

                let data = response.data || {}

                let {jobs, pagination, filters, meta, featured_jobs} = data

                this.jobs = jobs || []

                this.pagination = pagination || {}

                this.featuredJobs = featured_jobs || []

                this.filters = filters || {}

                this.setMeta(meta)

                this.status.loading = false

                return response
            } catch (error) {
                this.status.error = error

                this.meta.selectedFilters = []

                log(error, "error")

                return error
            } finally {
                this.status.loading = false
            }
        },
        setUserCoordinates() {
            this.getGeoLocation(coords => {
                this.input.coords = coords
                this.input.location = this.geoLocationInputText
                this.input.sort = "distance"
            })
        },
        formatInput() {
            if (this.isLocationSearch) {
                this.input.location = fullState(this.input.location)
            }
        },
        setInputFromQuery() {
            this.input = merge(this.getInputDefaults(), this.$route.query)

            this.formatInput()
        },
        blank(value) {
            return blank(value)
        },
        setSearchType(type) {
            if (!["location", "commute"].includes(type)) {
                type = "location"
            }

            this.input.searchType = type

            if (this.isCommuteSearch) {
                this.input.location = ""
            }

            if (this.shouldClearCoords()) {
                this.input.coords = ""
                this.input.commuteLocation = ""
            }
        },
        shouldClearCoords() {
            const loc = this.input.location
            const commuteLoc = this.input.commuteLocation
            const coords = this.input.coords
            const geoText = this.geoLocationInputText

            if (this.isLocationSearch && (this.blank(loc) || loc != geoText)) {
                return true
            }

            if (this.isCommuteSearch && this.blank(commuteLoc)) {
                return true
            }

            return false
        },
        submitSearchForm(searchType = "location") {
            this.input.page = 1

            this.setSearchType(searchType)

            if (this.shouldClearCoords()) {
                this.input.coords = ""
            }

            this.$router
                .push({
                    path: "/jobs",
                    query: this.getPayload(),
                })
                .catch(err => {
                    log(err, "error")
                })
        },
    },
}
</script>
