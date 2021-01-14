<template>
    <component :is="tag">
        <slot v-bind="slotData"></slot>
    </component>
</template>
<script>
import {
    searchService,
    GOOGLE_TALENT,
    commuteSearchService,
} from "../../../services/search"
import base from "./mixins/provider"
import {blank} from "../../../services/helpers"
import {googleTalentEventService} from "../../../services/events"
import provider from './mixins/provider'
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
        searchCompleted(data) {
            if (process.isClient && this.isGoogleTalent) {
                let event = {
                    eventType: "impression",
                    jobs: this.jobs.map(details => details.job.name),
                    requestId: (data.meta || {}).request_id,
                }

                googleTalentEventService(event, {
                    client_events: this.siteConfig.client_events,
                    project_id: this.siteConfig.project_id,
                    tenant_uuid: this.siteConfig.tenant_uuid,
                    company_uuids: this.siteConfig.company_uuids,
                }).then(response => {
                    // update the request id to what is returned from google.
                    event.requestId = (response.data || {}).request_id
                    sessionStorage.setItem(
                        GOOGLE_TALENT,
                        JSON.stringify({
                            event: event,
                        })
                    )
                }).catch(()=>{})
            }
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
                        parameter: ["commuteLocation"]
                        .concat(this.providerInputDefinition().commuteLocation.clears),
                    },
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
            return (
                !blank(this.input.coords) && !blank(this.input.commuteLocation)
            )
        },
        beforeSearch() {
            if ((this.isCommuteSearch = this.shouldDoCommuteSearch())) {
                this.input.location = ""
            }
        },
    },
}
</script>
