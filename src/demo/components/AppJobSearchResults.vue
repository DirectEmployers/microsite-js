<template>
    <div class="search__results">
        <h3 class="text-3xl font-bold">Search Results</h3>
        <div
            class="hover:bg-gray-300"
            :key="index"
            v-for="(job, index) in jobs"
        >
            <AppJob :source="source" :job="job">
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
            </AppJob>
        </div>
    </div>
</template>

<script>
import AppJob from "~/components/AppJob"
export default {
    props: {
        jobs: {
            type: Array,
            default: () => [],
        },
        source:{
            required: true,
            type: String
        }
    },
    components: {
        AppJob,
    },
}
</script>
