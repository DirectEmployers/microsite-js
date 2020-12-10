<template>
    <component :is="tag">
        <slot
            :jobs="jobs"
            :sort="sort"
            :input="input"
            :status="status"
            :isSolr="isSolr"
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
    },
    methods: {
        applyFilters(){
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

            const defaultInput = this.inputDefaults()

            if (name.includes('commuteLocation')) {
                this.isCommuteSearch = false
                Object.keys(this.inputDefaults()).forEach(key => {
                    this.input[key] = defaultInput[name] || ""
                })
            }

            this.newSearch()
        },

    },
}
</script>
