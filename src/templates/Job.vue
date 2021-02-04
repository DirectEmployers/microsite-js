<template>
    <Layout>
        <AppJobFetch s3-folder="sanfordhealth-jobs">
            <template v-slot="{job, status: {error, pending, resolved}}">
                <AppLoader v-if="pending" />
                <App404 v-else-if="error && !resolved" />
                <AppJobExpired v-else-if="isExpired(job)" :job="job" />
                <AppJobDetail v-else-if="job" :job="job" />
            </template>
        </AppJobFetch>
    </Layout>
</template>

<script>
import {blank} from "~/services/helpers"
import App404 from "~/demo/components/App404"
import AppJobFetch from "~/components/Fetch/AppJobFetch"
import AppLoader from "~/demo/components/AppLoader"
import AppJobDetail from "~/demo/components/AppJobDetail"
import AppJobExpired from "~/demo/components/AppJobExpired"
export default {
    components: {
        App404,
        AppLoader,
        AppJobDetail,
        AppJobExpired,
        AppJobFetch,
    },
    methods: {
        isExpired(job) {
            return job && !blank(job.deleted_at)
        },
    },
}
</script>
