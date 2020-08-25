<template>
    <component :is="tag">
        <slot
            :filters="filters"
            :getUserCoordinates="getUserCoordinates"
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
        />
    </component>
</template>
<script>
import { blank, log } from "../../services/helpers"
import { fullState, removeCountry } from "../../services/api/location"
import { omitBy, omit, clone, merge, assign } from "lodash"
import { SearchService, CommuteSearchService } from "../../services/api/search"

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
        submitUrl: {
            required: false,
            type: String,
            default: "/jobs",
        },
        defaultInput:{
            required: false,
            type: Object,
            default: ()=> {}
        },
    },
    data() {
        const defaultInput = this.getInputDefaults()
        return {
            jobs: [],
            source: this.siteConfig.sources.search,
            filters: [],
            pagination: {},
            status: {
                loading: false,
                error: false,
            },
            supported: {
                geolocation: false,
            },
            meta: {
                hasJobs: this.hasJobs,
                sort: {
                    active: defaultInput['sort'],
                    options: ["relevance", "distance", "title", "date"],
                },
            },
            input: defaultInput,
        }
    },
    created() {
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

        isLocationSearch() {
            return this.input.searchType == "location"
        },

        isCommuteSearch() {
            return this.input.searchType == "commute"
        },

        selectedFilters() {
            let value = null
            let name = null
            let duplicates = []
            let filters = []

            this.siteConfig.filters.forEach((filter) => {
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
            let params = this.siteConfig.filters.map((filter) => {
                return filter.name
            })

            params.push("coords")

            return params
        },
    },
    watch: {
        //any time query string changes, update component input and search.
        "$route.query"() {
            this.setInputFromQuery()
            this.search()
        }
    },
    methods: {
        getInputDefaults() {
            let defaultInput = clone(this.defaultInput)

            return merge({
                searchType: "location",
                commuteMethod: "DRIVING",
                travelDuration: "900",
                roadTraffic: "TRAFFIC_FREE",
                commuteLocation: "",
                q: "",
                r: 25,
                location: "",
                coords: null,
                sort: "relevance",
            }, defaultInput)
        },

        hasLocationInput(){

            if(this.isLocationSearch && !this.blank(this.input.location)){
                return true;
            }

            if(this.isCommuteSearch && !this.blank(this.input.coords)){
                return true;
            }

            return false;
        },
        removeFilter(param) {
            const query = { ...this.$route.query }
            const defaultInput = this.getInputDefaults()

            const defaultSort = ()=>{
                this.input.sort = defaultInput['sort']
                query['sort'] = this.input.sort
            }
            let toRemove = [param]

            if (param == "*") {
                toRemove = this.filterParamList

                if(!this.hasLocationInput()){
                    defaultSort()
                }
            } else if (param == "location") {
                defaultSort()
                toRemove.push("coords")
            }

            toRemove.forEach((param) => {
                delete query[param]
            })

            query['page'] = 1

            this.$router.replace({ query })
        },

        sort(field) {
            if (!this.meta.sort.options.includes(field)) {
                throw new Error(`Invalid sort option ${field}`)
            }

            const query = { ...this.$route.query }

            query["sort"] = field

            this.$router.replace({ query })
        },

        hasInput(key) {
            return !blank(this.input[key])
        },

        setInput(key, value) {
            this.$set(this.input, key, value)
        },

        hasCommuteInfo(commuteInfo) {
            if (blank(commuteInfo)) {
                return false
            }

            const has = Object.prototype.hasOwnProperty.call(
                commuteInfo,
                "travelDuration"
            )

            if (!has) {
                return false
            }

            return true
        },

        getGeoLocation(done) {
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude.toFixed(6)

                let lon = position.coords.longitude.toFixed(6)

                let coords = lat + "," + lon

                if (typeof done == "function") {
                    done(coords)
                }
            })
        },

        getService() {
            const searchType = this.input.searchType
            switch (searchType) {
                case "commute":
                    return CommuteSearchService
                case "location":
                default:
                    return SearchService
            }
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

        setMeta(meta) {
            this.meta = {
                ...meta,
                hasJobs: this.hasJobs,
                selectedFilters: this.selectedFilters,
            }

        },
        async search() {
            this.status.loading = true

            const Service = this.getService()

            try {
                const response = await Service.get(this.getPayload(), this.siteConfig)

                let { jobs, pagination, filters, meta } = response.data

                this.jobs = jobs

                this.pagination = pagination

                this.filters = filters || {}

                this.setMeta(meta)

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

        getUserCoordinates() {
            this.getGeoLocation((coords) => {
                this.input.coords = coords
                this.input.location = this.geoLocationInputText
                this.input.sort = "distance"
            })
        },

        formatInput() {
            if (!blank(this.input.location)) {
                if(this.isLocationSearch){
                    let parts = []

                    let locations = this.input.location.split(",")

                    locations.forEach((location)=>{
                        parts.push(fullState(location))
                    })

                    this.input.location = removeCountry(parts.join(","))
                }else{
                    this.input.location = ""
                }
            }
        },

        setInputFromQuery() {
            this.input = merge(this.getInputDefaults(),  this.$route.query)

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


            if(this.isCommuteSearch){
                this.input.location = ""
            }


            if (this.shouldClearCoords()) {
                this.input.coords = ""
                this.input.commuteLocation = ""
            }


        },
        shouldClearCoords() {
            if (this.isLocationSearch && this.blank(this.input.location)) {
                return true
            }

            if (this.isCommuteSearch && this.blank(this.input.commuteLocation)) {
                return true
            }

            return false
        },
        submitSearchForm(searchType = "location") {
            this.input.page = 1

            this.setSearchType(searchType)

            this.$router
                .push({
                    path: this.submitUrl,
                    query: this.getPayload(),
                })
                .catch((err) => {
                    log(err, "error")
                })
        },
    },
}
</script>
