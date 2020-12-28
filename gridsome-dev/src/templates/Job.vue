<template>
    <Layout>
        <AppJobFetch s3-folder="sanfordhealth-jobs">
            <template v-slot="{job, status: {error, pending, resolved}}">
                <AppLoader v-if="pending" />
                <App404 v-else-if="error && !resolved" />
                <!-- <AppJobExpired v-else-if="isExpired(job)" :job="job" /> -->
                <AppJob v-else-if="job" :job="job" />
            </template>
        </AppJobFetch>
    </Layout>
</template>

<script>
import App404 from "~/components/App404"
import AppJob from "~/components/AppJob"
import AppJobExpired from "~/components/AppJobExpired"
import AppLoader from "~/components/AppLoader"
import AppJobFetch from "~/components/AppJobFetch"
// import {blank} from "~/services/helpers"

export default {
    components: {
        App404,
        AppLoader,
        AppJob,
        AppJobExpired,
        AppJobFetch,
    },
    methods: {
        // isExpired(job) {
        //     return job && !blank(job.deleted_at)
        // },
    },
}
</script>
