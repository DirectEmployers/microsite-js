<template>
    <div class="bg-gray-100 rounded py-3 px-2" v-if="featuredJobs.length > 0">
        <h3 class="font-bold text-4xl">Featured Jobs:</h3>
        <div
            class="hover:bg-gray-300"
            :key="index"
            v-for="(job, index) in featuredJobs"
        >
            <AppJobProvider
                :source="source"
                :job="job"
                :site-config="{
                    source: $siteConfig.source,
                    project_id: $siteConfig.project_id,
                    tenant_uuid: $siteConfig.tenant_uuid,
                    company_uuids: $siteConfig.company_uuids,
                }"
            >
                <template v-slot="jobData">
                    <g-link :to="jobData.detailUrl" class="mb-2">
                        <h3 class="font-bold text-xl">
                            {{ jobData.title }}
                        </h3>
                        <h3 class="font-bold text-lg">
                            Requisition ID:
                            {{ jobData.reqId }}
                        </h3>
                        <h3 class="text-md">
                            {{ jobData.city + ", " + jobData.state }}
                        </h3>
                        <div
                            class="job-listing__commute-time"
                            v-if="jobData.hasCommuteInfo"
                        >
                            Estimated Travel:
                            {{ jobData.commuteTime }} minutes.
                        </div>
                    </g-link>
                </template>
            </AppJobProvider>
        </div>
    </div>
</template>

<script>
import AppJobProvider from "~/components/Jobs/AppJobProvider"

export default {
    props: {
        featuredJobs: {
            type: Array,
            required: false,
            default: () => [],
        },
        source: {
            required: true,
            type: String,
        },
    },
    components: {
        AppJobProvider,
    },
}
</script>
