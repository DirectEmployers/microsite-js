<template>
    <component :is="tag">
        <slot
            :jobs="jobs"
            :input="input"
            :status="status"
            :filters="filters"
            :sort="sort"
            :sortedBy="sortedBy"
            :sortOptions="sortOptions"
            :source="source"
            :isSolr="source == 'solr'"
            :isGoogleTalent="source == 'google_talent'"
            :pagination="pagination"
            :selectPage="selectPage"
            :removeFilter="removeFilter"
            :featuredJobs="featuredJobs"
            :appliedFilters="appliedFilters"
            :getFilterOptions="getFilterOptions"
            :submitSearchForm="submitSearchForm"
        />
    </component>
</template>
<script>
import {blank, titleCase} from "../../services/helpers"
import {fullState, removeCountry} from "../../services/location"
import {
    omitBy,
    omit,
    clone,
    merge,
    assign,
    startCase,
} from "lodash"
import {SearchService} from "../../services/search"

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
            let options = ["date", "relevance", "title"]

            if (!blank(this.meta.sort)) {
                options = this.meta.sort.options
            }

            const distanceIndex = options.indexOf("distance")

            if (this.hasLocationInput && distanceIndex == -1) {
                options.push("distance")
            } else if (!this.hasLocationInput && distanceIndex != -1) {
                options.splice(distanceIndex, 1)
            }

            return options
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

            this.configFilters.forEach(filter => {
                if (!blank(this.input[filter.name]) && !added.includes(filter.name)) {
                    filters.push({
                        display: this.input[filter.name],
                        parameter: filter.name,
                    })
                    added.push(filter.name)
                }
            })

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
            this.input.location = fullState(this.input.location)
        },

        setInputFromQuery() {
            this.input = merge(this.getInputDefaults(), this.$route.query)

            this.formatInput()
        },
        getFilterOptions(filter) {
            let key = filter.key

            if (blank(key)) {
                key = filter.name
            }

            if (Object.prototype.hasOwnProperty.call(this.filters, key)) {
                return this.filters[key]
            }

            return []
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
                defaultInput
            )
        },

        selectPage(page) {
            console.log(page)
            this.input["page"] = page

            this.submitSearchForm()

            this.$el.scrollIntoView()
        },

        sort(field) {
            if (this.meta.sort.options.includes(field)) {
                this.input.sort = field
                this.submitSearchForm()
            }
        },

        shouldClearCoords() {
            const loc = this.input.location
            const coords = this.input.coords
            // this should be a watcher?
            if (blank(loc) || blank(coords)) {
                return true
            }

            return false
        },
        getPayload() {
            return omitBy(this.input, blank)
        },

        submitSearchForm() {

            if (this.shouldClearCoords()) {
                this.input.coords = ""
            }

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

            if (name == "location") {
                this.input.coords = ""
            }

            this.submitSearchForm()
        },
        
        async search() {
            this.status.loading = true

            try {
                const response = await SearchService.get(
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
