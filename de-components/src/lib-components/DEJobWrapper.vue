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
            :applyLink="applyLink"
            :clickedViewJob="clickedViewJob"
            :clickedApplyJob="clickedApplyJob"
        ></slot>
    </component>
</template>

<script>
import buildUrl from "axios/lib/helpers/buildURL"
import {GOOGLE_TALENT, SOLR} from "../services/search"
import {GoogleTalentClientEvent} from "../services/events"
import {VS_KEY, UTM_KEY} from "../services/storage"
import {buildJobDetailUrl, blank} from "../services/helpers"
import {fullState, removeCountry, removeState} from "../services/location"
import {get, isArray} from "lodash"

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
        siteConfig: {
            type: Object,
            required: true,
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
                return [GOOGLE_TALENT, SOLR].includes(value)
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
        clickedApplyJob() {
            if (this.siteConfig.source == SOLR) {
                return
            }

            let talentData = GoogleTalentClientEvent.getSavedTalentData()
            // only if the stored event type is view do we post
            // this means they are viewing this job directly from site instead
            // of navigating directly to job detail.
            if (talentData.eventType === "view") {
                GoogleTalentClientEvent.post(
                    {
                        eventType: "redirect",
                        jobs: talentData.jobs,
                        requestId: talentData.requestId,
                    },
                    this.siteConfig
                ).catch((e) => {
                    console.error(e)
                    //fail silently from google talent errors.
                })
            }
        },
        clickedViewJob() {
            if (this.siteConfig.source == SOLR) {
                return
            }

            if (this.isGoogleTalent) {
                let requestId = GoogleTalentClientEvent.getSavedTalentData()
                    .requestId

                GoogleTalentClientEvent.post(
                    {
                        eventType: "view",
                        jobs: [this.jobData.name],
                        requestId: requestId,
                    },
                    this.siteConfig
                ).catch((e) => {
                    console.error(e)
                    //fail silently from google talent errors.
                })
            }
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
            return this.source == SOLR
        },
        isGoogleTalent() {
            return this.source == GOOGLE_TALENT
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
        applyLink() {
            let url = "https://rr.jobsyn.org/" + this.guid

            if (!process.isClient) {
                return url
            }
            // add vs & utm parameters
            const vs = sessionStorage.getItem(VS_KEY)

            const utm = sessionStorage.getItem(UTM_KEY)

            let utm_params = {}

            if (!blank(utm)) {
                try {
                    utm_params = JSON.parse(utm)
                } catch {
                    utm_params = {}
                }
            }

            let params = {}

            params = {...this.$route.query, ...params, ...utm_params}

            if (!blank(vs)) {
                params[VS_KEY] = vs
            }
            return buildUrl(url, params)
        },
        detailUrl() {
            let loc = this.location

            //fall back to state if location is blank
            if (blank(loc)) {
                loc = this.state
            }

            let url = buildJobDetailUrl(this.title, loc, this.guid)

            if (!blank(this.input)) {
                return buildUrl(url, this.input)
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
                    "derivedInfo.locations[0].postalAddress.locality",
                    ""
                )
            }
            return this.jobData.city_exact
        },
        state() {
            // if (this.isGoogleTalent) {
            //     let loc = get(
            //         this.jobData,
            //         "derivedInfo.locations[0].postalAddress.administrativeArea",
            //         ""
            //     )

            //     return fullState(loc)
            // }
            // let state = this.jobData.state_short_exact
            // //handle missing state data
            // if (blank(state)) {

            //     state = this.location.split(",")[1]
            // }
            return fullState("IN")
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

            return minutes == 0 ? "< 1 minute" : minutes + " minutes"
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
