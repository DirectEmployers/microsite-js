<template>
    <component :is="tag">
        <slot v-bind="slotData"></slot>
    </component>
</template>
<script>
import base from "./mixins/provider"
import {blank} from "../../../services/helpers"
import {searchService, commuteSearchService} from "../../../services/search"

export default {
    mixins: [base],
    data() {
        return {
            isCommuteSearch: false,
        }
    },
    computed: {
        service() {
            return this.isCommuteSearch ? commuteSearchService : searchService
        },
    },
    methods: {
        queryChanged() {
            this.isCommuteSearch = this.shouldDoCommuteSearch()
        },
        providerInputDefinition() {
            return {
                commuteMethod: {
                    default: "DRIVING",
                },
                travelDuration: {
                    default: "3600",
                },

                roadTraffic: {
                    default: "TRAFFIC_FREE",
                },
                commuteLocation: {
                    default: "",
                    clears: [
                        "travelDuration",
                        "roadTraffic",
                        "commuteMethod",
                        "coords",
                    ],
                },
            }
        },
        applyFilters() {
            if (!this.isSolr && this.isCommuteSearch) {
                return [
                    {
                        display: `Commute:${this.input.commuteLocation}`,
                        parameter: "commuteLocation",
                    }
                ]
            }
            return []
        },
        excludePayload() {
            let exclude = []
            if (!this.shouldDoCommuteSearch()) {
                exclude = Object.keys(this.providerInputDefinition())
            }
            return exclude
        },
        shouldDoCommuteSearch() {
            return !blank(this.input.coords) && !blank(this.input.commuteLocation)
        },
        beforeSearch() {
            if (this.isCommuteSearch = this.shouldDoCommuteSearch()) {
                this.input.location = ""
            }
        },
    },
}
</script>
