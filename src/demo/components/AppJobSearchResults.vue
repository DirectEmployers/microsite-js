<template>
    <div class="search__results">
        <h3 class="text-3xl font-bold">Search Results</h3>
        <div
            class="hover:bg-gray-300"
            :key="index"
            v-for="(job, index) in jobs"
        >
            <AppJob :site-config="$siteConfig" :source="source" :job="job" :input="input">
                <template v-slot="{ detailUrl, title, reqId, clickedViewJob, location, hasCommuteInfo, commuteTime }">

                    <g-link @click.native="clickedViewJob" :to="detailUrl" class="mb-2">
                        <h3 class="font-bold text-xl">
                            {{ title }}
                        </h3>
                        <h3 class="font-bold text-lg">
                            Requisition ID:
                            {{ reqId }}
                        </h3>
                        <h3 class="text-md">
                            {{ location }}
                        </h3>
                        <div
                            class="job-listing__commute-time"
                            v-if="hasCommuteInfo"
                        >
                            Estimated Travel:
                            {{ commuteTime }}
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
            required: false
        },
        input: {
            type: Object,
            required: false,
            default: () => {},
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
