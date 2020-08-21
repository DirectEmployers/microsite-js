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
import { omitBy, omit, clone, merge } from "lodash"
import { SearchService, CommuteSearchService } from "../../services/api/search"
import GoogleTalentJob from "../../services/api/drivers/job/google-talent"
import SolrJob from "../../services/api/drivers/job/solr"

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
    },
    data() {
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
                    active: "relevance",
                    options: ["relevance", "distance", "title", "date"],
                },
            },
            input: merge(
                {
                    q: "",
                    r: 25,
                    location: "",
                    coords: null,
                    sort: "relevance",
                },
                this.getCommuteDefaults()
            ),
        }
    },
    created() {
        //allow other components to update input via global event.
        this.$router.app.$on("search.input.update", this.setInput)

        //filter/breadcrumb removal
        this.$router.app.$on("search.filter.remove", this.removeFilter)

        if (this.searchOnLoad) {
            this.input = merge(this.input, clone(this.$route.query))

            this.formatInput()

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
        },

        input: {
            handler(newInput, oldInput) {
                this.$router.app.$emit(
                    "search.input.updated",
                    newInput,
                    oldInput
                )
            },
            deep: true,
        },
    },
    methods: {
        getCommuteDefaults() {
            return {
                searchType: "location",
                commuteMethod: "DRIVING",
                travelDuration: "900",
                roadTraffic: "TRAFFIC_FREE",
                commuteLocation: "",
            }
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
            const defaultSort = ()=>{
                this.input.sort = 'relevance'
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

        getJobDriver(source) {
            switch (source) {
                case "solr":
                    return SolrJob
                case "google_talent":
                    return GoogleTalentJob
                default:
                    throw new Error(`Unsupported job driver/source ${source}`)
            }
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

            if (this.input.searchType == "location") {
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
        async search(input = null) {
            this.status.loading = true

            const Service = this.getService()

            input = this.blank(input) ? this.getPayload() : input

            try {
                const response = await Service.get(input, this.siteConfig)

                const data = response.data

                const { jobs, pagination, filters } = data

                const JobDriver = this.getJobDriver(data.meta.source)

                this.jobs = (jobs || []).map((job) => {
                    return new JobDriver(job)
                })

                this.pagination = pagination

                this.filters = filters || {}

                this.setMeta(data.meta)
            } catch (error) {
                this.status.error = error

                this.meta.selectedFilters = []

                log(error, "error")
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
            this.input = clone(this.$route.query)

            //merge commute defaults so that we do not clear out v-model input values.
            this.input = merge(this.getCommuteDefaults(), this.input)

            this.formatInput()
        },

        blank(value) {
            return blank(value)
        },

        parseSearchType(type) {
            //if submitSearchForm is called in the template without args,
            //the default first argument in vuejs is the event object,
            //if this is the case, be flexible and default to location
            //if this is the case
            try {
                const isString = typeof type != "string"

                if (isString && type.constructor.name == "SubmitEvent") {
                    type = "location"
                }
            } catch (error) {
                type = "location"
            }

            if (!["location", "commute"].includes(type)) {
                throw new Error(`Unsupported search type '${type}'`)
            }

            return type
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

            this.input.searchType = this.parseSearchType(searchType)

            if(this.isCommuteSearch){
                this.input.location = ""
            }

            if (this.shouldClearCoords()) {
                this.input.coords = ""
                this.input.commuteLocation = ""
            }

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
