import {blank, displayLocationFromSlug} from "../../../../services/helpers"
import {omitBy, clone, merge, startCase} from "lodash"
import {searchService, SOLR, GOOGLE_TALENT} from '../../../../services/search'

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
    data() {
        return {
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
            appliedFilters: [],
            isCommuteSearch: false,
            input: this.getInputDefaults(),
        }
    },
    computed:{
        service() {
            return searchService
        },
        isGoogleTalent() {
            return this.meta.source == GOOGLE_TALENT
        },
        //unused
        isSolr() {
            return this.meta.source == SOLR
        },
        hasJobs() {
            return this.jobs.length > 0 || this.featuredJobs.length > 0
        },
        configFilters() {
            return this.siteConfig.filters || []
        },
        sort() {
            let sort = {}
            let sortMeta = clone(this.meta.sort || {})
            if (blank(sortMeta)) {
                return sort
            }
            sort.sortField = (field) => {
                this.input.sort = field.toLowerCase()
                this.newSearch()
            }
            sort.by = blank(sortMeta) ? "" : startCase(sortMeta.active)
            sort.options = sortMeta.options.map(o => startCase(o))
            return sort
        },
    },
    watch: {
        //any time query string changes, update component input and search.
        "$route.query"() {
            this.input = this.mergeWithDefaultInput(this.$route.query)
            this.queryChanged()
            this.search()
        },
    },
    created(){
        this.input = this.mergeWithDefaultInput({
            ...this.$route.query,
            ...this.$route.params
        })

        if(!blank(this.$route.params.location)){
            input.location =  displayLocationFromSlug(input.location)
        }

        if(this.searchOnLoad) {
            this.search()
        }
    },
    methods:{
        queryChanged(){},
        applyFilters(){
            return []
        },
        mergeWithDefaultInput(from = {}) {
            return {
                ...this.getInputDefaults(),
                ...from
            }
        },
        removeFilter(name){
            const defaultInput = this.getInputDefaults()

            if (name == "*") {
                return this.pushPayload({})
            }
            if(!Array.isArray(name)){
                name = [name]
            }

            name.forEach(key => {
                this.input[key] = defaultInput[name] || ""
            })

            this.newSearch()

        },
        getAppliedFilters(){
            let filters = []
            let added = []
            const input = this.input
            this.configFilters.forEach(filter => {
                let params = [filter.name]

                if (!blank(input[filter.name]) && !added.includes(filter.name)) {
                    if(filter.name == 'location') {
                        params.push('coords')
                        params.push('r')
                    }

                    filters.push({
                        display: input[filter.name],
                        parameter: params,
                    })
                    added.push(filter.name)
                }
            })
            return filters.concat(this.applyFilters())
        },
        search() {
            this.status.loading = true
            this.service(this.input, this.siteConfig).then(resp=>{
                const data = resp.data || {}
                this.featuredJobs = data.featured_jobs || []
                this.pagination = data.pagination || {}
                this.filters = data.filters || {}
                this.jobs = data.jobs || []
                this.meta = data.meta || {'source': SOLR} //prevents sites from erroring when unable to connect to api?
                this.appliedFilters = this.getAppliedFilters()
                this.$emit('searchCompleted', this.meta.source)
            }).catch( err => {
                this.status.error = err
            }).finally(() =>{
                this.status.loading = false
            })

        },
        getFilterOptions(filter) {
            let key = blank(filter.key) ? filter.name : filter.key
            return this.filters[key] || []
        },

        setFilter(key, value){
            this.input[key] = value
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
            return omitBy(this.input, (v, k) => {
                return blank(v)
            })
        },
        filterEmpty(data, callback) {
            return omitBy(data, (v, k) => {
                return blank(v) || callback(k, v)
            })
        },
        getInputDefaults() {
            let defaultInput = clone(this.defaultInput)
            return {
                ...{
                    q: "",
                    r: "",
                    location: "",
                    coords: null,
                    page: 1,
                    sort: "relevance",
                },
                ...this.inputDefaults(),
                ...defaultInput
            }
        },
        newSearch() {
            this.input.page = 1
            this.pushPayload()
        },

    }
}

