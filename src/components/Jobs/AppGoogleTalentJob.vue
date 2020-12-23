<template>
    <component :is="tag">
        <slot v-bind="slotData"></slot>
    </component>
</template>

<script>
import {get} from "lodash"
import base from "./mixins/job"

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
    },
}
</script>
