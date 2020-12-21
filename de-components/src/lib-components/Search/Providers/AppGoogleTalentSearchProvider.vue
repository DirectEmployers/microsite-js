<template>
    <component :is="tag">
        <slot
            :jobs="jobs"
            :sort="sort"
            :input="input"
            :status="status"
            :hasJobs="hasJobs"
            :source="meta.source"
            :setFilter="setFilter"
            :newSearch="newSearch"
            :pagination="pagination"
            :selectPage="selectPage"
            :featuredJobs="featuredJobs"
            :removeFilter="removeFilter"
            :isGoogleTalent="isGoogleTalent"
            :appliedFilters="appliedFilters"
            :isCommuteSearch="isCommuteSearch"
            :getFilterOptions="getFilterOptions"
            :filteredInput="getCurrentPayload()"
        ></slot>
    </component>
</template>
<script>
import {
    searchService,
    commuteSearchService,
} from "../../../services/search"
import base from "./mixins/provider"
import {blank} from "../../../services/helpers"
export default {
    mixins: [base],
    data() {
        return {
            isCommuteSearch: this.checkIsCommuteSearch()
        }
    },

    computed: {
        service() {
            return this.isCommuteSearch ? commuteSearchService : searchService
        },
    },
    methods: {
        queryChanged(){
            this.isCommuteSearch = this.checkIsCommuteSearch()
        },
        inputDefaults() {
            return {
                commuteMethod: "DRIVING",
                travelDuration: "3600",
                commuteLocation: "",
                roadTraffic: "TRAFFIC_FREE",
            }
        },
        applyFilters() {
            let filters = []
            if (!this.isSolr && this.isCommuteSearch) {
                let commuteLocation = this.$route.query.commuteLocation
                filters.push({
                    display: `Commute:${commuteLocation}`,
                    parameter: Object.keys(this.inputDefaults()).concat(['coords']),
                })
            }
            return filters
        },
        checkIsCommuteSearch(){
            if(this.isSolr){
                return false
            }
            return !blank(this.$route.query.coords) && !blank(this.$route.query.commuteLocation)
        },
        getCurrentPayload() {
            let exclude = []
            if (!this.isCommuteSearch) {
                exclude = Object.keys(this.inputDefaults())
            }
            return this.filterEmpty(this.input, (k)=>{
                return exclude.includes(k)
            })
        },
        newSearch() {
            this.input.page = 1
            this.isCommuteSearch = !this.isSolr && (this.input.coords && this.input.commuteLocation)
            if(this.isCommuteSearch){
                this.input.location = ""
            }
            this.pushPayload()
        },
    },
}
</script>
