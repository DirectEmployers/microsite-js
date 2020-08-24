<template>
    <div class="mx-4" v-if="hasSimilarJobs">
        <h3 class="similar-jobs__title">Other Jobs You Might Like</h3>
        <div class="similar-jobs__grid">
            <g-link
                v-for="(similarJob, index) in similarJobs"
                :key="index"
                :to="similarJob.getDetailUrl()"
                class="similar-jobs__grid-item"
            >
                <h4 class="similar-jobs__grid-item-title">
                    {{ similarJob.getTitle() }}
                </h4>
                <p class="similar-jobs__grid-item-location">
                    {{ job.getLocation() }}
                </p>
            </g-link>
        </div>
    </div>
</template>

<script>
import { SearchService } from "~/services/api/search"

export default {
    data() {
        return {
            similarJobs: [],
        }
    },
    props: ["job"],
    mounted() {
        this.getJobs()
    },
    computed: {
        hasSimilarJobs() {
            return this.similarJobs.length > 0
        },
    },
    methods: {
        async getJobs() {
            const response = await SearchService.get(
                {
                    num_items: 10,
                    q: this.job.getTitle(),
                    location: this.job.getLocation(),
                },
                this.$siteConfig
            )

            const { jobs } = response.data
            this.similarJobs = jobs

            this.similarJobs.filter(job => {
                return job.getGuid() !== this.job.getGuid()
            })
        },
    },
}
</script>
