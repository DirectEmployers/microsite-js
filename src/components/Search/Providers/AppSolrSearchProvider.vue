<template>
    <component :is="tag">
        <slot
            :jobs="jobs"
            :input="input"
            :status="status"
            :hasJobs="hasJobs"
            :source="meta.source"
            :pagination="pagination"
            :selectPage="selectPage"
            :featuredJobs="featuredJobs"
            :appliedFilters="appliedFilters"
            :removeFilter="removeFilter"
            :newSearch="newSearch"
            :getFilterOptions="getFilterOptions"
        >
        </slot>
    </component>
</template>

<script>
import { blank } from "../../../services/helpers"
import {omitBy, clone, merge} from "lodash"
import { searchService } from '../../../services/search'
export default {
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
        hasJobs(){
            return this.jobs.length > 0 && this.featuredJobs.length > 0
        },
        configFilters() {
            return this.siteConfig.filters || []
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
    created(){
        this.setInputFromQuery()

        if(this.searchOnLoad) {
            this.search()
        }
    },
    methods:{
        search() {
            this.status.loading = true
            searchService(this.input, this.siteConfig).then(resp=>{
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
            this.input = merge(this.getInputDefaults(), this.$route.query)
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
        removeFilter(name) {

            if (name == "*") {
                return this.pushPayload({})
            }

            if(!Array.isArray(name)){
                name = [name]
            }

            const defaultInput = this.getInputDefaults()

            name.forEach(key => {
                this.input[key] = defaultInput[name] || ""
            })

            if (["location"].includes(name)) {
                this.input.coords = ""
            }


            this.newSearch()
        },

        newSearch() {
            this.input.page = 1
            this.pushPayload()
        },

    }
}
</script>