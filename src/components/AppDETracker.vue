<script>
import {trim, endsWith } from "lodash"
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
            // this.appendTrackerScript()
        }
    },
    metaInfo() {
        if (!process.isClient) {
            return {}
        }
        // TODO, figure out how to disable auto increment on id?
        return {
            script: [
                {
                    id: "detrack",
                    defer: true,
                    src: this.scriptSrc,
                },
            ],
        }
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
    methods: {
        appendTrackerScript() {
            let script = document.createElement("scipt")

            script.setAttribute("defer", true)

            script.setAttribute("id", "detrack") // required for script to work

            script.setAttribute("src", src)
            console.log(script)
            document.body.appendChild(script)
        },
    },
}
</script>
