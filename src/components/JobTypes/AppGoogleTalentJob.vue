<template>
    <component :is="tag">
        <slot
            :reqId="reqId"
            :title="title"
            :location="location"
            :detailUrl="detailUrl"
            :guid="guid"
            :city="city"
            :state="state"
            :country="country"
            :company="company"
            :hasCommuteInfo="hasCommuteInfo"
            :commuteTime="commuteTime"
            :htmlDescription="htmlDescription"
            :cleanHtmlDescription="cleanHtmlDescription"
            :description="description"
            :dateAdded="dateAdded"
            :deletedAt="deletedAt"
        ></slot>
    </component>
</template>

<script>
import { buildJobDetailUrl, blank } from "../../services/helpers"
import { fullState, removeCountry, removeState } from "../../services/api/location"
import { get, isArray } from "lodash"

export default {
    props: {
        job: {
            type: Object,
            required: true,
        },
        tag: {
            type: String,
            required: false,
            default: "section",
        },
    },
    methods: {
        getAttribute(attribute, defaultValue = null) {
            const customAttr = `customAttributes.${attribute}.stringValues`

            const value = get(this.job.job, customAttr, defaultValue)

            return isArray(value) ? value.join(" ") : value
        },
    },
    computed: {
        reqId() {
            return this.getAttribute('reqid')
        },
        title() {
            return this.job.job.title
        },
        location() {
            return removeCountry(this.getAttribute("city_admin1_country"))
        },
        detailUrl() {
            return buildJobDetailUrl(this.title, this.location, this.guid)
        },
        guid() {
            return this.job.job.requisitionId
        },
        city() {
            let location = this.location

            return removeState(removeCountry(location))
        },
        state() {
            let location = this.location

            location = location.split(",")

            return fullState(location[1])
        },
        country() {
            return this.getAttribute("country")
        },
        company() {
            return this.job.job.companyDisplayName
        },
        hasCommuteInfo() {
            if (blank(this.job.commuteInfo)) {
                return false
            }

            if (!Object.prototype.hasOwnProperty.call(this.job.commuteInfo, "travelDuration")) {
                return false
            }
            return true
        },
        commuteTime() {
            if (!this.hasCommuteInfo) {
                return ""
            }

            const seconds = parseInt(
                this.job.commuteInfo.travelDuration.replace("s", "")
            )

            const hours = Math.floor(seconds / 60 / 60)

            const minutes = Math.floor(seconds / 60) - hours * 60

            return minutes
        },
        cleanHtmlDescription() {
            // html description is not available on job detail pages?
            if (!this.htmlDescription) {
                return ""
            }
            return this.htmlDescription.replace(/(\r\n|\n|\r)/gm, "")
        },
        description() {
            return this.job.job.description
        },
        htmlDescription() {
            return this.job.job.description
        },
        dateAdded() {
            return this.job.job.postingCreateTime
        },
        deletedAt() {
            return null
        },
    },
}
</script>
