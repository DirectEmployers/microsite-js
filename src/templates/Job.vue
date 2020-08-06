<template>
    <Layout>
        <AppJobFetch>
            <template v-slot="{ job, status: { error, pending, resolved } }">
                <Loader v-if="pending" />
                <App404 v-else-if="error && resolved" />
                <AppJobExpired v-else-if="isExpired(job)" :job=job />
                <AppJob v-else-if="job" :job=job />
            </template>
        </AppJobFetch>
    </Layout>
</template>

<script>
import App404 from "~/demo/components/App404"
import AppJob from "~/demo/components/AppJob"
import AppJobExpired from "~/demo/components/AppJobExpired"
import Loader from "~/demo/components/Loader"
import AppJobFetch from "~/components/AppJobFetch"
import { blank } from "~/services/helpers";

export default {
    components: {
        App404,
        Loader,
        AppJob,
        AppJobExpired,
        AppJobFetch,
    },
    methods:{
        isExpired(job){
            return job && !blank(job.getDeletedAt())
        }
    }
}
</script>
