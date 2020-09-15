<template>
    <section class="similar-jobs" v-if="hasSimilarJobs">
        <h3 class="similar-jobs__title">{{ header }}</h3>
        <div class="similar-jobs__grid">
            <AppJob
                :key="index"
                :source="meta.source"
                :job="similarJob"
                v-for="(similarJob, index) in similarJobs"
            >
                <template v-slot="jobData">
                    <section class="similar-jobs__grid-item"   v-if="job.guid != jobData.guid">
                        <g-link
                            :to="buildJobDetailUrl(
                                jobData.title,
                                jobData.location,
                                jobData.guid
                            )"
                        >
                            <slot :jobData="jobData">
                                <h4 class="similar-jobs__grid-item-title">
                                    {{ jobData.title }}
                                </h4>
                                <p class="similar-jobs__grid-item-location">
                                    {{ jobData.location }}
                                </p>
                            </slot>
                        </g-link>
                    </section>
                </template>
            </AppJob>
        </div>
    </section>
</template>

<script>
import { SearchService } from "../services/api/search"
import { buildJobDetailUrl } from "../services/helpers"
import AppJob from './AppJob'
export default {
    data() {
        return {
            meta: {},
            similarJobs: [],
        }
    },
    components:{
        AppJob
    },
    props: {
        job: {
            type: Object,
            required: true,
        },
        header: {
            type: String,
            required: false,
            default: "Other Jobs You Might Like",
        },
    },
    created() {
        this.getJobs()
    },
    computed: {
        hasSimilarJobs() {
            return this.similarJobs.length > 0
        },
    },
    methods: {
        buildJobDetailUrl(title, location, guid){
            return buildJobDetailUrl(title, location, guid)
        },
        async getJobs() {
            const response = await SearchService.get(
                {
                    num_items: 10,
                    q: this.job.title,
                    location: this.job.location_exact,
                },
                this.$siteConfig
            )

            const data = response.data

            const { jobs, meta } = data

            this.meta = meta

            this.similarJobs = jobs

        }
    },
}
</script>
