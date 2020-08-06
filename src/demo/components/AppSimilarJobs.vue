<template>
    <AppSearchProvider
        ref="provider"
        :search-on-load="false"
        :site-config="$siteConfig"
        v-slot="{
            jobs,
            meta,
        }"
        class="similar-jobs container mx-auto"
    >
        <div class="mx-4" v-if="meta.hasJobs">
            <h3 class="similar-jobs__title">Other Jobs You Might Like</h3>
            <div class="similar-jobs__grid">
                <g-link
                    class="similar-jobs__grid-item"
                    v-for="( similarJob , index) in jobs"
                    :key="index"
                     v-if="similarJob.getGuid() != job.getGuid()"
                    :to="similarJob.getDetailUrl()"
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
    </AppSearchProvider>
</template>

<script>
import AppSearchProvider from "~/components/Search/AppSearchProvider"

export default {
    props: ["job"],
    components: {
        AppSearchProvider,
    },
    mounted() {
        this.getJobs()
    },
    methods: {
        async getJobs() {
            await this.$refs["provider"].search({
                num_items: 10,
                q: this.job.getTitle(),
                location: this.job.getLocation(),
            })
        },
    },
}
</script>
