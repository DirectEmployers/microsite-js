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
import { omitBy, clone, merge } from "lodash"
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
        searchOnLoad:{
            type: Boolean,
            default: true,
            required: false
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
                selectedFilters: [],
                sort: {
                    active: "relevance",
                    options: ["relevance", "distance", "title", "date"],
                },
            },
            input: {
                q: "",
                r: 25,
                location: "",
                coords: null,
                sort: "relevance",
                searchType: "location",
                commuteMethod: "DRIVING",
                travelDuration: "900",
                roadTraffic: "TRAFFIC_FREE",
                commuteLocation: "",
            },
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

        selectedFilters() {
            let value,
                param = null
            let duplicates = []
            let filters = []

            this.siteConfig.filters.forEach((filter) => {
                param = filter.query_param

                value = this.input[param]

                if (!this.blank(value) && !duplicates.includes(param)) {
                    duplicates.push(param)

                    filters.push({
                        display: value,
                        parameter: param,
                    })
                }
            })

            return filters
        },

        filterParamList() {
            return this.siteConfig.filters.map((filter) => {
                return filter.query_param
            })
        }
    },
    watch: {
        //any time query string changes, update component input and search.
        "$route.query"() {
            this.setInputFromQuery()
            this.search()
        },

        input: {
            handler(newInput, oldInput) {
                //clear coords when user changes location value.
                if (newInput.location != oldInput.location) {
                    newInput.coords = ""
                }

                //clear out commute location when location search is done.
                if (newInput.searchType == "location") {
                    newInput.commuteLocation = ""
                }

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
        removeFilter(param) {
            let toRemove = [param]

            if (param == "*") {
                toRemove = this.filterParamList
            }

            const query = { ...this.$route.query }

            toRemove.forEach((param) => {
                delete query[param]
            })

            this.$router.replace({ query })
        },

        sort(field){

            if(!this.meta.sort.options.includes(field)){
                throw new Error(`Invalid sort option ${field}`)
            }


            const query = { ...this.$route.query }

            query['sort'] = field

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
            const payload = clone(omitBy(this.input, blank))

            this.siteConfig.filters.map((filter) => {
                if (
                    Object.prototype.hasOwnProperty.call(
                        filter,
                        "force_filters"
                    )
                ) {
                    payload[filter.query_param] = filter.force_filters
                }
            })

            return payload
        },

        getFilterOptions(filter){
            const attribute = filter.attributes[this.meta.source]

            return this.filters[attribute] || []
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

            input = input === null ? this.getPayload(): input

            try {
                const response = await Service.get(
                    input,
                    this.siteConfig
                )

                const data = response.data

                const { jobs, pagination, filters } = data

                const JobDriver = this.getJobDriver(data.meta.source)

                this.jobs = jobs.map((job) => {
                    return new JobDriver(job)
                })

                this.pagination = pagination

                this.filters = filters

                this.setMeta(data.meta)
                // emit once DOM/other components are ready
                this.$nextTick(() => {
                    this.$router.app.$emit("search.completed", this.input)
                })
            } catch (error) {
                this.status.error = error

                log(error, "error")
            } finally {
                this.status.loading = false
            }
        },

        getUserCoordinates() {
            this.getGeoLocation((coords) => {
                this.input.coords = coords
                this.input.location = this.geoLocationInputText
            })
        },

        formatInput() {
            if (!blank(this.input.location)) {
                this.input.location = fullState(removeCountry(this.input.location))
            }
        },

        setInputFromQuery() {
            this.input = clone(this.$route.query)

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
                const isString = typeof searchType != "string"

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
        submitSearchForm(searchType = "location") {
            this.input.page = 1

            this.input.searchType = this.parseSearchType(searchType)

            this.$router
                .push({
                    path: this.submitUrl,
                    query: omitBy(this.input, blank),
                })
                .catch((err) => {
                    log(err, "error")
                })
        },
    },
}
</script>
