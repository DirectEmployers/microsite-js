<template>
    <component :is="component" v-bind="$props">
        <slot
            :jobs="jobs"
            :sort="sort"
            :input="input"
            :status="status"
            :isSolr="isSolr"
            :hasJobs="hasJobs"
            :sortedBy="sortedBy"
            :source="meta.source"
            :newSearch="newSearch"
            :pagination="pagination"
            :selectPage="selectPage"
            :sortOptions="sortOptions"
            :featuredJobs="featuredJobs"
            :removeFilter="removeFilter"
            :isGoogleTalent="isGoogleTalent"
            :appliedFilters="appliedFilters"
            :isCommuteSearch="isCommuteSearch"
            :getFilterOptions="getFilterOptions"
            :filteredInput="getCurrentPayload()"
        >
        </slot>
    </component>
</template>
<script>

import base from './mixins/provider'
import AppSolrSearchProvider from './AppSolrSearchProvider'
import { SOLR, searchService, commuteSearchService } from '../../../services/search'

import { blank } from "../../../services/helpers"
import {omitBy, clone, merge, startCase } from "lodash"


export default {
    mixins: [base],
    data(){
        return {
            isCommuteSearch : !blank(this.$route.query.coords) && !blank(this.$route.query.commuteLocation),
        }
    },
    computed:{
        service(){
            return this.isCommuteSearch ? commuteSearchService : searchService
        },
        component(){
            if(this.meta.source == SOLR){
                return AppSolrSearchProvider
            }
            return this.tag
        },
        appliedFilters(){
            let filters = this.getAppliedFiltersBase()

            if (this.isCommuteSearch) {
                let commuteLocation = this.$route.query.commuteLocation
                filters.push({
                    display: `Commute:${commuteLocation}`,
                    parameter: "commuteLocation",
                })
            }
            return filters
        }
    },
    methods: {
        getCommuteDefaults(){
            return {
                commuteMethod: "DRIVING",
                travelDuration: "3600",
                commuteLocation: "",
                roadTraffic: "TRAFFIC_FREE",
            }
        },
        inputDefaults() {
            return this.getCommuteDefaults()
        },
        getCurrentPayload() {
            let exclude = []

            if (!this.isCommuteSearch) {
                exclude = Object.keys(this.getCommuteDefaults())
            }

            return omitBy(clone(this.input), (v, k) => {
                return blank(v) || exclude.includes(k)
            })
        },

        newSearch() {
            this.input.page = 1

            if (this.input.coords && this.input.commuteLocation) {
                this.isCommuteSearch = true
                this.input.location = ""
            }

            this.pushPayload()
        },

        removeFilter(name) {
            this.removeInput(name)

            if (["location", "commuteLocation"].includes(name)) {
                this.input.coords = ""
            }

            const defaultInput = this.getCommuteDefaults()

            if (name.includes('commuteLocation')) {
                this.isCommuteSearch = false
                Object.keys(this.getCommuteDefaults()).forEach(key => {
                    this.input[key] = defaultInput[name] || ""
                })
            }

            this.newSearch()
        },

    },
}
</script>
