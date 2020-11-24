<template>
    <component :is="tag">
        <slot
            :jobs="jobs"
            :input="input"
            :filteredInput="getPayload()"
            :status="status"
            :filters="filters"
            :sort="sort"
            :sortedBy="sortedBy"
            :sortOptions="sortOptions"
            :source="source"
            :isSolr="isSolr"
            :isGoogleTalent="isGoogleTalent"
            :pagination="pagination"
            :selectPage="selectPage"
            :removeFilter="removeFilter"
            :featuredJobs="featuredJobs"
            :appliedFilters="appliedFilters"
            :getFilterOptions="getFilterOptions"
            :submitSearchForm="submitSearchForm"
            :isCommuteSearch="isCommuteSearch"
        />
    </component>
</template>
<script>
import {blank, titleCase, displayLocationFromSlug, strAfter } from "../../services/helpers"
import {GOOGLE_TALENT, SOLR} from "../../services/search"
import {GoogleTalentClientEvent} from "../../services/events"
import {fullState} from "../../services/location"
import {omitBy, clone, merge, startCase} from "lodash"
import {CommuteSearchService, SearchService} from "../../services/search"

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
        defaultInput: {
            required: false,
            type: Object,
            default: () => {},
        },
    },
    data() {
        const isCommute =
            !blank(this.$route.query.coords) &&
            !blank(this.$route.query.commuteLocation)

        return {
            jobs: [],
            featuredJobs: [],
            filters: [],
            pagination: {},
            status: {
                loading: false,
                error: false,
            },
            isCommuteSearch:
                isCommute && this.siteConfig.source == GOOGLE_TALENT,
            meta: {},
            input: this.getInputDefaults(),
        }
    },
    created() {
        this.setInputFromQuery()
        this.setInputFromParams()

        if (this.searchOnLoad) {
            this.search()
        }
    },
    computed: {
        service() {
            if (this.isCommuteSearch) {
                return CommuteSearchService
            }
            return SearchService
        },
        sortedBy() {
            if (blank(this.meta.sort)) {
                return ""
            }
            return startCase(this.meta.sort.active)
        },
        source() {
            if (blank(this.meta.source)) {
                return this.siteConfig.source
            }
            return this.meta.source
        },
        hasLocationInput() {
            return !blank(this.input.coords) || !blank(this.input.location)
        },
        sortOptions() {
            let options = []

            let sort = clone(this.meta.sort || {})

            if (!blank(sort)) {
                options = sort.options
            }

            return options.map(o => startCase(o))
        },
        isGoogleTalent() {
            return this.meta.source == GOOGLE_TALENT
        },
        isSolr() {
            return this.meta.source == SOLR
        },
        configFilters() {
            return this.siteConfig.filters || []
        },
        filterParamNames() {
            let params = this.configFilters.map(filter => {
                return filter.name
            })

            return params
        },
        appliedFilters() {
            let filters = []
            let added = []
            let input = this.$route.query
            this.configFilters.forEach(filter => {
                if (
                    !blank(input[filter.name]) &&
                    !added.includes(filter.name)
                ) {
                    filters.push({
                        display: input[filter.name],
                        parameter: filter.name,
                    })
                    added.push(filter.name)
                }
            })

            if (this.isCommuteSearch) {
                let commuteLocation = input.commuteLocation
                filters.push({
                    display: `Commute:${commuteLocation}`,
                    parameter: "commuteLocation",
                })
            }
            return filters
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
        formatLocationSlug() {
            if(!blank(this.$route.params.location)){
                this.input.location =  displayLocationFromSlug(this.input.location)
            }
        },

        setInputFromQuery() {
            this.input = merge(this.getInputDefaults(), this.$route.query)
        },

        setInputFromParams() {
            let params = { ... this.$route.params }
            Object.entries(params).map(([key, value]) => {
                this.input[key] = value
            })
            //TODO only do this if the slug was actually present?
            // this causes geolocation value to parse to Your, LOCATION
            this.formatLocationSlug()
        },

        getFilterOptions(filter) {
            if (!blank(filter.options)) {
                return filter.options
            }

            //all filter results are keyed by "key"
            let key = filter.key
            //or param name if no key is present
            if(blank(key)){
                key = filter.name
            }

            return this.filters[key] || []
        },
        getCommuteDefaults() {
            return clone({
                commuteMethod: "DRIVING",
                travelDuration: "3600",
                commuteLocation: "",
                roadTraffic: "TRAFFIC_FREE",
            })
        },
        getInputDefaults() {
            let defaultInput = clone(this.defaultInput)
            return merge(
                {
                    q: "",
                    r: "",
                    moc: "",
                    location: "",
                    coords: null,
                    page: 1,
                    sort: "relevance",
                },
                this.getCommuteDefaults(),
                defaultInput
            )
        },
        pushPayload(payload = null) {
            payload = payload === null ? this.getPayload() : payload

            this.$router
                .push({
                    path: "/jobs",
                    query: payload,
                })
                .catch(err => {})
        },
        selectPage(page) {
            this.input["page"] = page

            this.pushPayload()

            this.$el.scrollIntoView()
        },

        sort(field) {
            field = field.toLowerCase()

            if (this.meta.sort.options.includes(field)) {
                this.input.sort = field
                this.submitSearchForm()
            }
        },

        getPayload() {
            let exclude = []

            if (!this.isCommuteSearch) {
                exclude = Object.keys(this.getCommuteDefaults())
            }

            return omitBy(clone(this.input), (v, k) => {
                return blank(v) || exclude.includes(k)
            })
        },

        submitSearchForm() {
            this.input.page = 1
            if (
                !blank(this.input.coords) &&
                !blank(this.input.commuteLocation) &&
                this.isGoogleTalent
            ) {
                this.isCommuteSearch = true
                this.input.location = ""
            }
            this.pushPayload()
        },

        removeFilter(name) {
            if (name == "*") {
                this.isCommuteSearch = false
                return this.pushPayload({})
            }

            let remove = [name]

            const defaultInput = this.getInputDefaults()

            remove.forEach(key => {
                this.input[key] = defaultInput[name] || ""
            })

            if (["location", "commuteLocation"].includes(name)) {
                this.input.coords = ""
            }

            if (name == "commuteLocation") {
                this.isCommuteSearch = false
                Object.keys(this.getCommuteDefaults()).forEach(key => {
                    this.input[key] = defaultInput[name] || ""
                })
            }

            this.submitSearchForm()
        },

        async search() {
            this.status.loading = true

            try {
                const response = await this.service.get(
                    this.getPayload(),
                    this.siteConfig
                )

                const data = response.data || {}

                this.jobs = data.jobs || []

                this.pagination = data.pagination || {}

                this.featuredJobs = data.featured_jobs || []

                this.filters = data.filters || {}

                this.meta = data.meta || {}

                if (this.isGoogleTalent) {
                    GoogleTalentClientEvent.post(
                        {
                            eventType: "impression",
                            jobs: this.jobs.map((data)=>{
                                return data.job.name
                            }),
                            requestId: this.meta.request_id,
                        },
                        this.siteConfig
                    ).catch((e) => {
                        console.error(e)
                        //fail silently from google talent errors.
                    })
                }

                this.status.loading = false

                return response
            } catch (error) {
                if (Object.prototype.hasOwnProperty.call(error, "response")) {
                    this.status.error = error
                } else {
                    throw new Error(error)
                }
            } finally {
                this.status.loading = false
            }
        },
    },
}
</script>
