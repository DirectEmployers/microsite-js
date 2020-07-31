<script>
import get from "lodash/get"
import { isArray, kebabCase, trimEnd } from "lodash"
import {
    searchJobs,
    commuteSearch,
    removeCountry,
} from "../../services/api/jobs"
import mixins from "../../services/mixins/jobs"
import { blank } from "../../services/helpers"

export default {
    data: () => ({
        jobs: [],
        filterData: {},
        status: {
            loading: true,
            errors: {},
        },
        pagination: {},
    }),
    props:{
        siteConfig:{
            type: Object,
            required: true
        }
    },
    watch: {
        //do a search anytime router qs changes.
        "$route.query"() {
            this.search()
        },
    },
    mixins: [mixins],
    mounted() {
        this.search()
    },
    computed: {
        hasJobs () {
            return (this.jobs || []).length > 0
        },
    },
    methods: {
        getAttribute (job, attribute) {
            return get(job, attribute)
        },
        addForceFilters (query) {
            this.siteConfig.filters.map((filter) => {
                if (filter.hasOwnProperty("force_filters")) {
                    query[filter.query_param] = filter.force_filters
                }
            })
            return query
        },
        getRouteQuery () {
            return { ...this.$route.query }
        },
        async search() {
            this.jobs = []

            let query = this.getRouteQuery()

            query = this.addForceFilters(query)

            this.status.loading = true

            try {
                let data = {}

                if (
                    this.$route.query.searchType &&
                    this.$route.query.searchType == "commute"
                ) {
                    data = await commuteSearch({
                        config: this.siteConfig,
                        data: query,
                    })
                } else {
                    data = await searchJobs({
                        config: this.siteConfig,
                        data: query,
                    })
                }

                const { jobs, pagination, filters } = data

                this.jobs = jobs

                this.pagination = pagination

                this.status.loading = false

                this.filterData = filters

                // emit once DOM/other components are ready
                this.$nextTick(()=>{
                    this.$router.app.$emit("search.completed", this.$route.query)
                })
            } catch (err) {
                this.status.errors = err

                this.status.loading = false
            }
        },
        hasCommuteInfo(commuteInfo) {
            if (blank(commuteInfo)) {
                return false
            }

            if (!commuteInfo.hasOwnProperty("travelDuration")) {
                return false
            }
            return true
        },
        getCommuteTime(commuteInfo) {
            if (blank(commuteInfo)) {
                return ""
            }

            const seconds = parseInt(
                commuteInfo.travelDuration.replace("s", "")
            )

            const hours = Math.floor(seconds / 60 / 60)

            const minutes = Math.floor(seconds / 60) - hours * 60

            return minutes
        },
    },
    render() {
        return this.$scopedSlots.default({
            getAttribute: this.getAttribute,
            getCustomAttribute: this.getCustomAttribute,
            getDetailUrl: this.getDetailUrl,
            hasJobs: this.hasJobs,
            filterData: this.filterData,
            jobs: this.jobs,
            pagination: this.pagination,
            status: this.status,
            hasCommuteInfo: this.hasCommuteInfo,
            getCommuteTime: this.getCommuteTime,
        })
    },
}
</script>
