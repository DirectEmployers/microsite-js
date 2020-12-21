import {blank, displayLocationFromSlug} from "../../../../services/helpers"
import {omitBy, clone, startCase} from "lodash"
import {searchService, SOLR, GOOGLE_TALENT} from '../../../../services/search'

export default  {
    props:{
        siteConfig: {
            required: true,
            type: Object,
        },
        isLoadMore: {
            required: false,
            type: Boolean,
            default: false
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
            default: () => { return {} },
        },
    },
    data() {
        return {
            meta: {
                source: this.siteConfig.source
            },
            status: {
                loading: false,
                error: false,
            },
            jobs: [],
            filters: [],
            tmpData: {},
            pagination: {},
            featuredJobs: [],
            displayedJobs: [],
            isFirstLoad: true,
            appliedFilters: [],
            num_items: this.siteConfig.num_items ? this.siteConfig.num_items : 15,
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
            let sort = {
                options: [],
                sortField: ()=>{},
                by: null
            }

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
            this.input.page = parseInt(this.input.page)
            this.$route.query.page = parseInt(this.$route.query.page)

            let isLessThanMaxPage = this.input.page < this.tmpData.page
            let isNextPage = this.tmpData.lastPage < this.input.page

            if(isLessThanMaxPage && isNextPage){
                this.displayedJobs = this.displayedJobs.concat(this.tmpData.nextPage.splice(0, this.num_items))
                this.pagination.page = this.input.page
            } else if(isLessThanMaxPage && this.isNotNewQuery()) {
                let offset = this.num_items
                offset = this.displayedJobs.length - offset
                this.pagination.page = this.input.page
                this.tmpData.lastPage = this.input.page
                let removedJobs = this.displayedJobs.splice(offset)
                this.tmpData.nextPage = removedJobs.concat(this.tmpData.nextPage)
            } else {
                if(!this.isNotNewQuery()){
                    this.tmpData.nextPage = []
                    this.displayedJobs = []
                    this.isFirstLoad = true
                }
                this.updateTmpData()
                this.search().then( () => {
                    if(this.isLoadingMore){
                        this.isLoadingMore = false
                    }
                })
            }
        },
    },
    created(){
        this.input = this.mergeWithDefaultInput({
            ...this.$route.query,
            ...this.$route.params
        })

        this.updateTmpData()

        if(!blank(this.$route.params.location)){
            this.input.location =  displayLocationFromSlug(this.input.location)
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

        isNotNewQuery(){
            let allowed = ["location", "travelDuration", "roadTraffic", "title", "shift"]
            for(let key in this.input){
                if(allowed.includes(key)){
                    if(!(this.tmpData.query[key] === this.input[key])){
                        return false
                    }
                }
            }
            return true
        },
        updateTmpData(){
            this.tmpData.query = {
                location: this.input.location,
                travelDuration: this.input.travelDuration,
                roadTraffic: this.input.roadTraffic,
                title: this.input.title,
                shift: this.input.shift,
            }
        },
        loadMore(page) {
            if(page){
                this.isLoadingMore = true
                this.input.page = page
                this.pushPayload()
            } else {
                this.displayedJobs = this.displayedJobs.concat(this.tmpData.nextPage)
                this.tmpData.nextPage = []
            }
        },
        mergeWithDefaultInput(from = {}) {
            return {
                ...this.getInputDefaults(),
                ...from
            }
        },
        removeFilter(params){
            const defaultInput = this.getInputDefaults()
            if (params == "*") {
                return this.pushPayload({})
            }
            if(!Array.isArray(params)){
                params = [params]
            }

            params.forEach(key => {
                this.input[key] = defaultInput[key] || ""
            })

            if(params.includes('location')){
                this.input['coords'] = defaultInput['coords']
                this.input['r'] = defaultInput['r']
            }
            this.newSearch()
        },
        getAppliedFilters(){
            let filters = []
            let added = []
            const input = this.input
            this.configFilters.forEach(filter => {
                let params = [filter.name]
                if (!blank(input[filter.name]) && !added.includes(filter.name)) {
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
            if(!this.isLoadingMore){
                this.status.loading = true
            }
            if(this.input.offset){
                delete this.input.offset
            }

            //load pages n - n-5 on first load.
            if(this.isFirstLoad && this.isLoadMore){
                this.tmpData.page = parseInt(this.input.page)

                this.tmpData.num_items = this.num_items
                this.input.num_items = this.tmpData.num_items * this.input.page + this.tmpData.num_items
                if(this.input.num_items > 90){
                    this.input.offset = this.input.num_items - 90
                    this.input.num_items = 90
                }
                this.input.page = 1
            } else if(this.isLoadMore) {
                this.tmpData.lastPage = this.$route.query.page
                this.displayedJobs = this.displayedJobs.concat(this.tmpData.nextPage)
            }

            return this.service(this.input, this.siteConfig).then(resp=>{
                const data = resp.data || {}
                this.featuredJobs = data.featured_jobs || []
                this.pagination = data.pagination || {}
                this.filters = data.filters || {}
                this.jobs = data.jobs || []
                this.meta = data.meta || {'source': SOLR} //prevents sites from erroring when unable to connect to api
                this.appliedFilters = this.getAppliedFilters()
            }).catch( err => {
                this.status.error = err
            }).finally(() =>{
                this.status.loading = false
                if(!this.isFirstLoad && this.isLoadMore){
                    this.tmpData.page = this.input.page > this.tmpData.page ? this.input.page : this.tmpData.page
                    this.tmpData.nextPage = this.jobs
                }

                if(this.isFirstLoad){
                    this.isFirstLoad = false

                    if(this.isLoadMore){
                        this.input.num_items = this.tmpData.num_items
                        if(this.jobs.length >= 30){
                            this.tmpData.nextPage = this.jobs.splice(this.jobs.length - this.num_items)
                        } else if(this.jobs.length < 30){
                            this.tmpData.nextPage = this.jobs.splice(15)
                        }
                        this.displayedJobs = this.jobs
                        this.pagination.page = this.tmpData.page
                        this.input.page = this.tmpData.page
                        //this line keep the load more button from disappearing when first load is large
                        //eg page loaded is 8, but pagination returns 3 total due to large num_items
                        this.pagination.total_pages = Math.ceil(parseInt(this.pagination.total) / this.num_items)
                    }
                }
            })
        },
        getFilterOptions(filter) {
            let key = blank(filter.key) ? filter.name : filter.key
            return (blank(this.filters[key]) || !Array.isArray(this.filters[key])) ? [] : this.filters[key]
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
                    name: "jobs",
                    path: "/jobs",
                    query: payload,
                    params: {savePos: true}
                })
                .catch(err => {})
        },
        getCurrentPayload() {
            return this.filterEmpty(this.input)
        },
        filterEmpty(data, callback = null) {
            if(callback === null){
                callback =  () => false
            }
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

