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
        ></slot>
    </component>
</template>
<script>
import base from "./mixins/provider"
import AppSolrSearchProvider from "./AppSolrSearchProvider"
import {
    searchService,
    commuteSearchService,
} from "../../../services/search"

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
        checkIsCommuteSearch(){
            return !blank(this.$route.query.coords) && !blank(this.$route.query.commuteLocation)
        },
        applyFilters() {
            let filters = []
            if (this.isCommuteSearch) {
                let commuteLocation = this.$route.query.commuteLocation
                filters.push({
                    display: `Commute:${commuteLocation}`,
                    parameter: "commuteLocation",
                })
            }
            return filters
        },
        inputDefaults() {
            return {
                commuteMethod: "DRIVING",
                travelDuration: "3600",
                commuteLocation: "",
                roadTraffic: "TRAFFIC_FREE",
            }
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

        queryChanged(){
            this.isCommuteSearch = this.checkIsCommuteSearch()
        },

    },
}
</script>
