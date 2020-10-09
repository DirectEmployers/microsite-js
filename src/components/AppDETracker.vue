<script>
import {trim, endsWith} from "lodash"
import {isDevelopment} from "../services/helpers"
export default {
    props: {
        canEngageWithJobs: {
            type: Boolean,
            default: false,
            required: false,
        },
    },

    created() {
        if (process.isClient) {
            this.appendTracker()
        }
    },

    methods: {
        appendTracker() {
            // everytime vue rerenders the script,
            // make sure we are always using a single instance
            // of the tracker. In 1.0 we do a fresh page load
            // on every page so we never had to worry about
            // having more than one instance,
            // but since this is SPA, we are ending up with several
            // instances of the tracker on every SPA update, so clear out
            // the instances so we can "simulate" a page change.
            if (typeof de_track == "object") {
                de_track.instances = []
            }

            document.querySelectorAll("[id*='detrack']").forEach(el=>el.remove())

            const script = document.createElement('script')

            script.setAttribute('src', this.scriptSrc)

            script.setAttribute('id', 'detrack')
            script.setAttribute('defer', true)

            document.body.appendChild(script)
        },
    },
    computed: {
        cleanPathName() {
            return trim(location.pathname, "/")
        },
        isJobDetail() {
            return endsWith(this.cleanPathName, "job")
        },
        isJobListing() {
            return endsWith(this.cleanPathName, "jobs")
        },
        scriptSrc() {
            const url = "https://d2e48ltfsb5exy.cloudfront.net/p/t.js?i="
            return url + this.scriptParams
        },
        scriptParams() {
            // default params is to assume we are on a page with no jobs/maps
            let params = "0,6"

            if (this.canEngageWithJobs) {
                // static or pages with job data/maps: 0,2,6
                params = "0,2,6"
            }

            if (this.isJobDetail) {
                params = "0,1,6"
            }

            if (this.isJobListing) {
                params = "0,3,6"
            }

            return params
        },
    },
    render() {
        return this.$slots.default
    },
}
</script>
