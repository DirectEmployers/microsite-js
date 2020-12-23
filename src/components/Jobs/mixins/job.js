import { get } from "lodash"
import buildUrl from "axios/lib/helpers/buildURL"
import {GOOGLE_TALENT, SOLR} from "../../../services/search"
import { buildJobApplyLink } from '../../../services/storage'
import { buildJobDetailUrl } from '../../../services/helpers'

export default{
    props: {
        job: {
            type: Object,
            required: true,
        },
        source: {
            type: String,
            required: true,
        },
        tag: {
            type: String,
            required: false,
            default: "div",
        },
        input: {
            type: Object,
            required: false,
            default: () => {},
        },
    },
    computed:{
        jobInfo() {
            return this.job
        },
        commuteInfo() {
            return {}
        },
        isSolr() {
            return this.source == SOLR
        },
        isGoogleTalent() {
            return this.source == GOOGLE_TALENT
        },
        city() {
            return this.jobData.city_exact
        },
        company() {
            return this.jobInfo.company_exact
        },
        reqId() {
            return this.getAttribute("reqid")
        },
        guid() {
            return this.jobInfo.guid
        },
        title() {
            return this.getAttribute("title_exact")
        },
        location() {
            return this.getAttribute("location_exact")
        },
        country() {
            // return this.jobInfo.country_short_exact
        },
        detailUrl() {
            let url = buildJobDetailUrl(this.title, this.location, this.guid)

            return buildUrl(url, this.input)
        },
        applyLink() {
            return buildJobApplyLink(this.guid, this.$route.query)
        },
        description() {
            return this.jobInfo.html_description
        },
        state() {
            // TODO
            // let state = this.jobData.state_short_exact
            // //handle missing state data
            // if (blank(state)) {
                //     state = this.location.split(",")[1]
                // }
                // return fullState(state)
        },
        commuteTime(){
            return ""
        },
        hasCommuteInfo() {
            return false
        },
        slotData(){
            return {}
        },
    },
    methods: {
        clickedApplyJob() {},
        clickedViewJob() {},
        getAttribute(name, defaultValue = ''){
            return get(this.jobInfo, name, defaultValue)
        },
    }
}