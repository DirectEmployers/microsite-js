<template>
    <AppFetch
        :endpoint="fetchJob"
        ref="fetch"
        :tag="tag"
        :on-resolve="resolveJob"
    >
        <template v-slot="{status}">
            <slot :status="status" :job="job"></slot>
        </template>
    </AppFetch>
</template>

<script>
import AppFetch from "./AppFetch"
import {getJob} from "../../services/cdn/job"
import buildUrl from "axios/lib/helpers/buildURL"
import {buildJobDetailUrl, blank} from "../../services/helpers"

export default {
    props: {
        guid: {
            type: String,
            required: false,
            default: null,
        },
        s3Folder: {
            required: true,
            type: String,
        },
        tag: {
            required: false,
            default: "div",
        },
    },
    components: {
        AppFetch,
    },
    data() {
        return {
            job: null,
            fromRouteParam: false,
        }
    },
    watch: {
        "$route.params.guid"() {
            this.$refs["fetch"].request()
        },
    },
    created() {
        if (this.guid == null) {
            this.fromRouteParam = true
        }
    },
    methods: {
        fetchJob() {
            let guid = this.guid

            if (this.fromRouteParam) {
                guid = this.$route.params.guid
                this.redirectGuidWithViewSources(guid)
            }

            return getJob(guid, this.s3Folder)
        },
        redirectGuidWithViewSources(guid) {
            // rss feed urls are /guid+vs, redirect to job detail.
            if (guid.length > 32) {
                let guidOnly = guid.substring(0, 32)
                let viewSource = guid.split(guidOnly)[1]

                window.location.replace(
                    buildUrl(`/t/l/${guidOnly}/job`, {
                        ...this.$route.query,
                        ...{vs: viewSource},
                    })
                )
            }
        },
        setJob(job, setStatus) {
            this.job = job
            setStatus({
                resolved: true,
            })
        },
        resolveJob(job, response, setStatus) {
            //correct url only if we loaded from route param.
            if (!this.fromRouteParam) {
                return this.setJob(job, setStatus)
            }
            let routePath = this.$route.path.endsWith("/")
                ? this.$route.path
                : `${this.$route.path}/`
            let url = buildJobDetailUrl(
                job.title_slug,
                job.location_exact,
                job.guid
            )
            // check if this is the proper url for the job
            if (url !== routePath) {
                window.location.replace(buildUrl(url, this.$route.query))
            } else {
                return this.setJob(job, setStatus)
            }
        },
    },
}
</script>
