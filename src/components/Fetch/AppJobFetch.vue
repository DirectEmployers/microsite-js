<template>
    <AppFetch :endpoint="fetchJob" ref="fetch" :tag="tag" :on-resolve="resolveJob">
        <template v-slot="{ status }">
            <slot
                :status="status"
                :job="job"
            ></slot>
        </template>
    </AppFetch>
</template>
<script>
import {kebabCase} from "lodash"
import AppFetch from './AppFetch'
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
        tag:{
            required: false,
            default: "div"
        }
    },
    components:{
        AppFetch
    },
    data() {
        return {
            job: null,
            fromRouteParam: false
        }
    },
    watch: {
        "$route.params.guid"() {
            this.$refs['fetch'].request()
        },
    },
    created() {
        if (this.guid == null) {
            this.fromRouteParam = true
        }
    },
    methods: {
        fetchJob(){
            let guid = this.guid
            if(this.fromRouteParam){
                guid = this.$route.params.guid
            }
            return getJob(guid, this.s3Folder)
        },
        setJob(job, setStatus){
            this.job = job
            setStatus({
                resolved: true
            })
        },
        resolveJob(job, respone, setStatus) {
            //correct url only if we loaded from route param.
            if(!this.fromRouteParam){
                return this.setJob(job, setStatus)
            }

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
                return this.setJob(job, setStatus)
            }
        },
    },
}
</script>
