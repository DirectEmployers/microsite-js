<template>
    <div class="search__results">
        <h3 class="text-3xl font-bold">Search Results</h3>
        <div
            class="hover:bg-gray-300"
            :key="index"
            v-for="(job, index) in jobs"
        >
            <AppJobProvider
                :source="source"
                :job="job"
                :input="input"
                :site-config="{
                    source: $siteConfig.source,
                    project_id: $siteConfig.project_id,
                    tenant_uuid: $siteConfig.tenant_uuid,
                    company_uuids: $siteConfig.company_uuids,
                }"
            >
                <template
                    v-slot="{
                        location,
                        title,
                        reqId,
                        detailUrl,
                        commuteTime,
                        clickedViewJob,
                        hasCommuteInfo,
                    }"
                >
                    <g-link
                        @click.native.prevent="clickedViewJob"
                        :to="detailUrl"
                        class="mb-2"
                    >
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
            </AppJobProvider>
        </div>
    </div>
</template>

<script>
import AppJobProvider from "~/components/Jobs/AppJobProvider"

export default {
    props: {
        jobs: {
            type: Array,
            default: () => [],
            required: false,
        },
        input: {
            type: Object,
            required: false,
            default: () => {},
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
