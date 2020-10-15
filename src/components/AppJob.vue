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
import { buildJobDetailUrl, blank, toQueryString } from "../services/helpers"
import { fullState, removeCountry, removeState } from "../services/location"
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
        input: {
            type: Object,
            required: false,
            default: () => {},
        },
        source: {
            type: String,
            required: true,
            validator: (value) => {
                return ["solr", "google_talent"].includes(value)
            },
        },
    },
    methods: {
        getAttribute(attribute, defaultValue = null) {
            if (this.isSolr) {
                return get(this.job, attribute, defaultValue)
            }

            const customAttr = `customAttributes.${attribute}.stringValues`

            const value = get(this.job.job, customAttr, defaultValue)

            return isArray(value) ? value.join(" ") : value
        },
    },
    computed: {
        jobData() {
            if (this.isSolr) {
                return this.job
            }
            return this.job.job
        },
        commuteData() {
            if (this.isSolr) {
                return {}
            }
            return this.job.commuteInfo
        },
        isSolr() {
            return this.source == "solr"
        },
        isGoogleTalent() {
            return this.source == "google_talent"
        },

        reqId() {
            if (this.isGoogleTalent) {
                return this.getAttribute("reqid")
            }
            return this.jobData.reqid
        },

        title() {
            if (this.isGoogleTalent) {
                return this.jobData.title
            }
            return this.jobData.title_exact
        },
        location() {
            if (this.isGoogleTalent) {
                return removeCountry(this.getAttribute("city_admin1_country"))
            }
            return this.jobData.location_exact
        },
        detailUrl() {
            let url = buildJobDetailUrl(this.title, this.location, this.guid)

            if(!blank(this.input)){
                url = url + "?"+ toQueryString(this.input)
            }
            return url
        },
        guid() {
            if (this.isGoogleTalent) {
                return this.jobData.requisitionId
            }
            return this.jobData.guid
        },
        city() {
            if (this.isGoogleTalent) {
                return get(
                    this.jobData,
                    "derivedInfo.locations[0].postalAddress.locality"
                )
            }
            return this.jobData.city_exact
        },
        state() {
            if (this.isGoogleTalent) {
                let loc = get(
                    this.jobData,
                    "derivedInfo.locations[0].postalAddress.administrativeArea"
                )

                return fullState(loc)
            }
            let state = this.jobData.state_short_exact
            //handle missing state data
            if (blank(state)) {
                state = this.location.split(",")[1]
            }
            return fullState(state)
        },
        country() {
            if (this.isGoogleTalent) {
                return this.getAttribute("country")
            }
            return this.jobData.country_short_exact
        },
        company() {
            if (this.isGoogleTalent) {
                return this.jobData.companyDisplayName
            }
            return this.jobData.company_exact
        },
        hasCommuteInfo() {
            if (this.isSolr) {
                return false
            }
            if (blank(this.commuteData)) {
                return false
            }

            if (
                !Object.prototype.hasOwnProperty.call(
                    this.commuteData,
                    "travelDuration"
                )
            ) {
                return false
            }

            return true
        },
        commuteTime() {
            if (blank(this.commuteData)) {
                return null
            }

            const seconds = parseInt(
                this.commuteData.travelDuration.replace("s", "")
            )

            const hours = Math.floor(seconds / 60 / 60)

            const minutes = Math.floor(seconds / 60) - hours * 60

            return minutes == 0 ? "< 1 minute" : minutes + "minutes"
        },
        htmlDescription() {
            if (this.isGoogleTalent) {
                return this.jobData.description
            }
            return this.jobData.html_description
        },
        cleanHtmlDescription() {
            // html description is not available on job detail pages?
            if (!this.htmlDescription) {
                return ""
            }
            return this.htmlDescription.replace(/(\r\n|\n|\r)/gm, "")
        },
        description() {
            return this.jobData.description
        },
        dateAdded() {
            if (this.isGoogleTalent) {
                return this.jobData.postingCreateTime
            }

            return this.jobData.date_added
        },
        deletedAt() {
            if (this.isGoogleTalent) {
                return null
            }
            return this.jobData.deleted_at
        },
    },
}
</script>
