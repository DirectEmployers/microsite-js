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

export default {
    props: {
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
        }
    },
    watch: {
        "$route.params.guid"() {
            this.$refs["fetch"].request()
        },
    },
    methods: {
        fetchJob() {
            let guid = this.$route.params?.guid
            return getJob(guid, this.s3Folder)
        },
        setJob(job, setStatus) {
            this.job = job
            setStatus({
                resolved: true,
            })
        },
        resolveJob(job, response, setStatus) {
            return this.setJob(job, setStatus)
        },
    },
}
</script>
