<template>
    <component :is="tag">
        <slot v-bind="slotData()"></slot>
    </component>
</template>

<script>
import {get} from "lodash"
import base from "./mixins/job"
import SolrJob from "./AppSolrJob"
import {GOOGLE_TALENT} from "../../services/search"
import {googleTalentEventService} from "../../services/events"

export default {
    mixins: [base],
    computed: {
        jobInfo() {
            return this.job.job
        },
        commuteInfo() {
            return this.job.commuteInfo
        },
        guid() {
            return this.jobInfo.requisitionId
        },
        company() {
            return this.jobInfo.companyDisplayName
        },
        description() {
            return this.jobInfo.description
        },
        reqId() {
            return this.getAttribute("reqid")
        },
        title() {
            return this.getAttribute("title")
        },
        location() {
            return this.getAttribute("city_admin1_country")
        },
        city() {
            return get(
                this.jobInfo,
                "derivedInfo.locations[0].postalAddress.locality",
                ""
            )
        },
        country() {
            return this.getAttribute("country")
        },
        state() {
            return this.getAttribute("state")
        },
        hasCommuteInfo() {
            return Object.prototype.hasOwnProperty.call(
                this.commuteInfo,
                "travelDuration"
            )
        },
        commuteTime() {
            if (!this.hasCommuteInfo) {
                return ""
            }
            const seconds = parseInt(
                this.commuteInfo.travelDuration.replace("s", "")
            )
            const hours = Math.floor(seconds / 60 / 60)

            const minutes = Math.floor(seconds / 60) - hours * 60

            return minutes == 0 ? "< 1 minute" : minutes + " minutes"
        },
    },
    methods: {
        getAttribute(name, defaultValue = "") {
            const value = get(
                this.jobInfo,
                `customAttributes.${name}.stringValues`,
                defaultValue
            )
            return Array.isArray(value) ? value.join(" ") : value
        },
        clickedApplyJob() {
            return this.tryClientEvent('redirect')
        },
        clickedViewJob() {
            return this.tryClientEvent('view')
        },
        tryClientEvent(type){
            if (this.isGoogleTalent && process.isClient) {
                var lastEvent = null;
                var currentEvent = {
                    eventType: type,
                    jobs: [this.jobInfo.name],
                }
                try{
                    //try to get the saved request id from the previous event (impression or view depending on what event is calling this method).
                    //the service call will do nothing if we werent able to.
                    lastEvent = JSON.parse(sessionStorage.getItem(GOOGLE_TALENT)).event
                    currentEvent.requestId = lastEvent.requestId
                }catch(e){
                    return
                }
                googleTalentEventService(
                    currentEvent,
                    {
                        client_events: this.siteConfig.client_events,
                        project_id: this.siteConfig.project_id,
                        tenant_uuid: this.siteConfig.tenant_uuid,
                        company_uuids: this.siteConfig.company_uuids,
                    }
                ).then(response => {
                    currentEvent.requestId = (response.data || {}).request_id
                    sessionStorage.setItem(
                        GOOGLE_TALENT,
                        JSON.stringify({
                            event: currentEvent,
                        })
                    )
                }).catch(()=>{})
            }
        },
    },
}
</script>
