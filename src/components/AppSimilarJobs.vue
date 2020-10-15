<template>
    <section class="similar-jobs" v-if="hasSimilarJobs">
        <h2 class="similar-jobs__title">{{ header }}</h2>
        <div class="similar-jobs__grid">
            <AppJob
                :key="index"
                :source="meta.source"
                :job="similarJob"
                v-for="(similarJob, index) in similarJobs"
            >
                <template v-slot="jobData">
                    <section class="similar-jobs__grid-item">
                        <g-link
                            :to="buildJobDetailUrl(
                                jobData.title,
                                jobData.location,
                                jobData.guid
                            )"
                        >
                            <slot :jobData="jobData">
                                <h3 class="similar-jobs__grid-item-title">
                                    {{ jobData.title }}
                                </h3>
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
import { SearchService } from "../services/search"
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
        title: {
            type: String,
            required: true,
        },
        guid: {
            type: String,
            required: false,
            default: ""
        },
        location: {
            type: String,
            required: false,
            default: ""
        },
        siteConfig: {
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
                    q: this.title,
                    location: this.location,
                },
                this.siteConfig
            )

            const data = response.data

            const { jobs, meta } = data

            this.meta = meta

            this.similarJobs = jobs

            if(this.guid){
                this.similarJobs = this.similarJobs.filter((job)=>{
                    return job.guid != this.guid
                })
            }

        }
    },
}
</script>
