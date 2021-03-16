import {
    get,
    omitBy,
    words,
    startCase
} from "lodash"
import buildUrl from "axios/lib/helpers/buildURL"
import {VS_KEY, UTM_KEY} from "../../../services/storage"
import {buildJobDetailUrl, blank} from "../../../services/helpers"

export default {
    props: {
        job: {
            type: Object,
            required: true,
        },
        tag: {
            type: String,
            required: false,
            default: "div",
        },
        siteConfig: {
            type: Object,
            required: false,
        },
        guidViewSource:{
            required: false,
            default: 10
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
        applyUrl() {
            let url = `https://rr.jobsyn.org/${this.guid}`
            if (!process.isClient) {
                return url
            }
            var params = {}
            try {
                let utm_params = {}
                try {
                    utm_params = JSON.parse(sessionStorage.getItem(UTM_KEY))
                } catch {
                    utm_params = {}
                }
                params = {
                    ...this.$route.query,
                    ...utm_params
                }
                params[VS_KEY] = sessionStorage.getItem(VS_KEY)
            } catch (e) {
                console.error(e);
            }

            if(this.guidViewSource !== false){
                url = url + this.guidViewSource
            }

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
        executeCallback(callback, args = []) {
            if (typeof callback == 'function') {
                callback(...args)
            }
        },
        clickedApplyJob(callback) {
            this.executeCallback(callback, [this.jobInfo])
            let nw = window.open(this.applyUrl, '_blank')
            nw.focus()
        },
        clickedViewJob(callback) {
            this.executeCallback(callback, [this.jobInfo])
            this.$router
                .push({
                    path: this.detailUrl,
                })
                .catch(err => {})
        },
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
                applyUrl: this.applyUrl,
                clickedViewJob: this.clickedViewJob,
                clickedApplyJob: this.clickedApplyJob,
            }
        },
    },
}