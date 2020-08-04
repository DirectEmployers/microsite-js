<template>
    <component :is="tag">
        <slot
            :filters="filters"
            :getUserCoordinates="getUserCoordinates"
            :hasInput="hasInput"
            :setInput="setInput"
            :blank="blank"
            :input="input"
            :jobs="jobs"
            :meta="meta"
            :pagination="pagination"
            :status="status"
            :submitSearchForm="submitSearchForm"
            :supported="supported"
        />
    </component>
</template>
<script>
import { blank } from "../services/helpers"
import { cleanLocation } from "../services/api/location"
import { omitBy, clone, merge, trim } from "lodash"
import { SearchService, CommuteSearchService } from "../services/api/search"
import GoogleTalentJob from "../services/api/drivers/job/google-talent"
import SolrJob from "../services/api/drivers/job/solr"

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
        submitUrl: {
            required: false,
            type: String,
            default: "/jobs",
        },
    },
    data() {
        return {
            jobs: [],
            filters: [],
            pagination: {},
            status: {
                loading: false,
                error: false,
            },
            supported: {
                geolocation: false,
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
        this.syncInputFromParams()

        //allow other components to update input via global event.
        this.$router.app.$on('search.input.update', this.setInput)

        if (this.isResultsPage) {
            this.search()
        }
    },
    mounted() {
        if (process.isClient) {
            this.supported["geolocation"] = "geolocation" in window.navigator
        }
    },
    computed: {
        meta() {
            return {
                hasJobs: this.hasJobs,
                isResultsPage: this.isResultsPage,
            }
        },

        hasJobs() {
            return (this.jobs || []).length > 0
        },

        isResultsPage() {
            let submitUrl = trim(this.submitUrl, "/")

            let current = trim(this.$route.path, "/")

            return `/${submitUrl}` == `/${current}`
        },
    },
    watch: {
        //any time query string changes, update component input and search.
        "$route.query"() {
            this.syncInputFromParams()
            this.search()
        },

        input: {
            handler(newIput, oldInput) {
                //clear coords when user changes location value.
                if (newIput.location != oldInput.location) {
                    newIput.coords = ""
                }

                this.$router.app.$emit(
                    "search.input.updated",
                    newIput,
                    oldInput
                )
            },
            deep: true,
        },
    },
    methods: {
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

                case "google-talent":
                    return GoogleTalentJob
                default:
                    throw new Error(`Unsupported job driver/source ${source}`)
            }
        },

        getService(){
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
            const query = clone(omitBy(this.input, blank))

            this.siteConfig.filters.map((filter) => {
                if (filter.hasOwnProperty("force_filters")) {
                    query[filter.query_param] = filter.force_filters
                }
            })

            return query
        },

        async search() {
            this.status.loading = true

            const Service = this.getService()

            try {
                const response = await Service.get(
                    this.getPayload(),
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
                // emit once DOM/other components are ready
                this.$nextTick(() => {
                    this.$router.app.$emit("search.completed", this.input)
                })
            } catch (error) {
                console.error(error)
                this.status.error = error
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

        syncInputFromParams() {
            this.input = merge(clone(this.$route.query), this.input)

            if (!blank(this.input.location)) {
                this.input.location = cleanLocation(this.input.location)
            }
        },

        blank(value){
            return blank(value)
        },

        parseSearchType(type) {
            //if submitSearchForm is called in the template without args
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
                .catch((err) => {})
        },
    },
}
</script>
