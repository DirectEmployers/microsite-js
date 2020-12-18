<template>
    <ClientOnly>
        <section>
            <slot
                :status="{
                    error: error,
                    pending: pending,
                    resolved: resolved,
                }"
                :job="job"
            ></slot>
        </section>
    </ClientOnly>
</template>
<script>
import {kebabCase} from "lodash"
import {getJob} from "../services/cdn/job"
import buildUrl from "axios/lib/helpers/buildURL"
import {buildJobDetailUrl, blank} from "../services/helpers"
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
    },
    data() {
        return {
            job: null,
            error: null,
            pending: true,
            resolved: null,
        }
    },
    watch: {
        "$route.params.guid"() {
            this.fetchJob(
                this.$route.params.guid,
                this.correctJobRouteUrl
            )
        },
    },
    created() {
        if (this.guid !== null) {
            this.fetchJob(this.guid)
        } else {
            this.fetchJob(
                this.$route.params.guid,
                this.correctJobRouteUrl
            )
        }
    },
    methods: {
        async fetchJob(guid, onResolve = null) {
            this.status({error: false, pending: true})
            try {
                let {data} = await getJob(guid, this.s3Folder)

                if(typeof onResolve == 'function'){
                    onResolve(data)
                }else{
                    this.setJob(data)
                }
            } catch (error) {
                this.status({
                    error,
                    resolved: false,
                })
            }
        },
        setJob(job){
            this.job = job
            this.status({resolved: true})
        },
        correctJobRouteUrl(job) {
            let routePath = this.$route.path.endsWith("/") ? this.$route.path: `${this.$route.path}/`
            let url = buildJobDetailUrl(
                job.title_slug,
                job.location_exact,
                job.guid
            )
            // check if this is the proper url for the job
            if (url !== routePath) {
                window.location.replace(buildUrl(url, this.$route.query))
            }else{
                this.setJob(job)
            }
        },
        status({error = null, pending = false, resolved = null}) {
            this.error = error
            this.pending = pending
            this.resolved = resolved
        },
    },
}
</script>
