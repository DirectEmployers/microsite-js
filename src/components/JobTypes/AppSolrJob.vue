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
import { buildJobDetailUrl } from "../../services/helpers"
import { fullState } from "../../services/api/location"

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
    computed: {
        reqId() {
            return this.job.reqid
        },
        title() {
            return this.job.title_exact
        },
        location() {
            return this.job.location_exact
        },
        detailUrl() {
            return buildJobDetailUrl(this.title, this.location, this.guid)
        },
        guid() {
            return this.job.guid
        },
        city() {
            return this.job.city_exact
        },
        state() {
            return fullState(this.job.state_short_exact)
        },
        country() {
            return this.job.country_short_exact
        },
        company() {
            return this.job.company_exact
        },
        hasCommuteInfo() {
            return false
        },
        commuteTime() {
            return null
        },
        htmlDescription() {
            return this.job.html_description
        },
        cleanHtmlDescription() {
            // html description is not available on job detail pages?
            if(!this.htmlDescription){
                return ''
            }
            return this.htmlDescription.replace(/(\r\n|\n|\r)/gm, "")
        },
        description() {
            return this.job.description
        },
        dateAdded() {
            return this.job.date_added
        },
        deletedAt() {
            return this.job.deleted_at
        }
    },
}
</script>
