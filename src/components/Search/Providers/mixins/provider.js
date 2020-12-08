import { blank, displayLocationFromSlug } from "../../../../services/helpers"
import {omitBy, clone, cloneDeep, merge, startCase } from "lodash"
import { searchService, SOLR, GOOGLE_TALENT} from '../../../../services/search'

export default  {
    props:{
        siteConfig: {
            required: true,
            type: Object,
        },
        tag: {
            required: false,
            type: String,
            default: "section",
        },
        searchOnLoad: {
            type: Boolean,
            default: true,
            required: false,
        },
        defaultInput: {
            required: false,
            type: Object,
            default: () => { return {} },
        },
    },
    data(){
        return {
            isCommuteSearch: false,
            jobs: [],
            meta: {
                source: this.siteConfig.source
            },
            status: {
                loading: false,
                error: false,
            },
            filters: [],
            pagination: {},
            featuredJobs: [],
            input: this.getInputDefaults()
        }
    },
    computed:{
        service(){
            return searchService
        },
        isGoogleTalent() {
            return this.meta.source == GOOGLE_TALENT
        },
        isSolr() {
            return this.meta.source == SOLR
        },
        hasJobs(){
            return this.jobs.length > 0 && this.featuredJobs.length > 0
        },
        configFilters() {
            return this.siteConfig.filters || []
        },
        sortedBy() {
            if (blank(this.meta.sort)) {
                return ""
            }
            return startCase(this.meta.sort.active)
        },
        sortOptions() {
            let options = []

            let sort = clone(this.meta.sort || {})

            if (!blank(sort)) {
                options = sort.options
            }

            return options.map(o => startCase(o))
        },
        appliedFilters() {
            return this.getAppliedFiltersBase()
        },
    },
    watch: {
        //any time query string changes, update component input and search.
        "$route.query"() {
            this.setInputFromQuery()
            this.search()
        },
    },
    created(){

        this.setInputFromParams()
        this.setInputFromQuery()
        if(this.searchOnLoad) {
            this.search()
        }
    },
    methods:{
        setInputFromParams() {
            let params = { ... this.$route.params }
            Object.entries(params).map(([key, value]) => {
                this.input[key] = value
            })

            if(!blank(this.$route.params.location)){
                this.input.location =  displayLocationFromSlug(this.input.location)
            }
        },
        removeInput(name){
            if (name == "*") {
                this.isCommuteSearch = false
                return this.pushPayload({})
            }

            if(!Array.isArray(name)){
                name = [name]
            }

            const defaultInput = this.getInputDefaults()

            name.forEach(key => {
                this.input[key] = defaultInput[name] || ""
            })
        },
        getAppliedFiltersBase(){
            let filters = []
            let added = []
            const input = this.$route.query
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
            return filters
        },
        search() {
            this.status.loading = true
            this.service(this.input, this.siteConfig).then(resp=>{
                const data = resp.data || {}
                this.featuredJobs = data.featured_jobs || []
                this.pagination = data.pagination || {}
                this.filters = data.filters || {}
                this.jobs = data.jobs || []
                this.meta = data.meta || {'source': 'solr'} //prevents sites from erroring when unable to connect to api?
            }).catch( err => {
                this.status.error = err
            }).finally(() =>{
                this.status.loading = false
            })
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

        sort(field) {
            field = field.toLowerCase()

            if (!this.meta.sort.options.includes(field)) {
                return
            }

            this.input.sort = field

            this.newSearch()

        },

        selectPage(page) {
            this.input["page"] = page

            this.pushPayload()
        },

        pushPayload(payload = null) {
            payload = payload === null ? this.getCurrentPayload() : payload

            this.$router
                .push({
                    path: "/jobs",
                    query: payload,
                })
                .catch(err => {})
        },

        getCurrentPayload() {
            return omitBy(clone(this.input), (v, k) => {
                return blank(v)
            })
        },

        setInputFromQuery() {
            this.input = merge(this.getInputDefaults(), this.input, this.$route.query)
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
                this.inputDefaults(),
                defaultInput
            )
        },
        removeFilter(name) {
            this.removeInput(name)
            this.newSearch()
        },

        newSearch() {
            this.input.page = 1
            this.pushPayload()
        },

    }
}
