import {get, omitBy, words, startCase} from "lodash"
import buildUrl from "axios/lib/helpers/buildURL"
import {GOOGLE_TALENT, SOLR} from "../../../services/search"
import {VS_KEY, UTM_KEY} from "../../../services/storage"
import {buildJobDetailUrl, blank} from "../../../services/helpers"

export default {
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
        siteConfig: {
            type: Object,
            required: true,
        },
        input: {
            type: Object,
            required: false,
            default: () => {},
        },
    },
    computed: {
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
            return this.jobInfo.city_exact
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
            return this.jobInfo.country_exact
        },
        detailUrl() {
            let url = buildJobDetailUrl(this.title, this.location, this.guid)

            return buildUrl(url, this.input)
        },
        applyLink() {
            let url = "https://rr.jobsyn.org/" + this.guid

            if (!process.isClient) {
                return url
            }

            let utm_params = {}
            try {
                utm_params = JSON.parse(sessionStorage.getItem(UTM_KEY))
            } catch {
                utm_params = {}
            }

            let params = {...this.$route.query, ...utm_params}
            params[VS_KEY] = sessionStorage.getItem(VS_KEY)

            return buildUrl(url, omitBy(params, blank))
        },
        description() {
            return this.jobInfo.html_description || this.jobInfo.description
        },
        state() {
            let state = this.jobInfo.city_slab_exact
            state = this.jobInfo.city_slab_exact.split("/")[1]

            if (blank(state) || state == "none") {
                return this.jobInfo.state_short_exact
            }
            return startCase(words(state).join(" "))
        },
        commuteTime() {
            return ""
        },
        hasCommuteInfo() {
            return false
        },
    },
    methods: {
        clickedApplyJob() {},
        clickedViewJob() {},
        getAttribute(name, defaultValue = "") {
            return get(this.jobInfo, name, defaultValue)
        },
        slotData() {
            return {
                reqId: this.reqId,
                title: this.title,
                location: this.location,
                detailUrl: this.detailUrl,
                guid: this.guid,
                city: this.city,
                state: this.state,
                country: this.country,
                company: this.company,
                hasCommuteInfo: this.hasCommuteInfo,
                commuteTime: this.commuteTime,
                description: this.description,
                dateAdded: this.dateAdded,
                applyLink: this.applyLink,
                clickedViewJob: this.clickedViewJob,
                clickedApplyJob: this.clickedApplyJob,
            }
        },
    },
}