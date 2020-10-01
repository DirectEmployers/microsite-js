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
import {blank, titleCase} from "../../services/helpers"
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
        return {
            jobs: [],
            featuredJobs: [],
            filters: [],
            pagination: {},
            status: {
                loading: false,
                error: false,
            },
            meta: {},
            input: this.getInputDefaults(),
        }
    },
    created() {
        this.setInputFromQuery()

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
        isGoogleTalent(){
            return this.meta.source == 'google_talent'
        },
        isSolr(){
            return this.meta.source == 'solr'
        },
        isCommuteSearch() {
            return !blank(this.input.coords) && !blank(this.input.commuteLocation)
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
        formatInput() {
            if(!this.isCommuteSearch){
                this.input.location = fullState(this.input.location)
            }else{
                this.input.location = ""
            }
        },

        setInputFromQuery() {
            this.input = merge(this.getInputDefaults(), this.$route.query)

            this.formatInput()

        },
        getFilterOptions(filter) {

            if(!blank(filter.options)){
                return filter.options
            }
            
            let key = filter.key

            if (blank(key)) {
                key = filter.name
            }

            if (Object.prototype.hasOwnProperty.call(this.filters, key)) {
                return this.filters[key]
            }

            return []
        },
        getCommuteDefaults() {
            return clone({
                commuteMethod: "DRIVING",
                travelDuration: "900",
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

        selectPage(page) {
            this.input["page"] = page

            this.submitSearchForm()

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
            this.$router
                .push({
                    path: "/jobs",
                    query: this.getPayload(),
                })
                .catch(err => {})
        },

        removeFilter(name) {
            const defaultInput = this.getInputDefaults()

            if (name == "*") {
                this.input = defaultInput
            }

            this.input[name] = defaultInput[name] || ""

            if (['location', 'commuteLocation'].includes(name)) {
                this.input.coords = ""
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
