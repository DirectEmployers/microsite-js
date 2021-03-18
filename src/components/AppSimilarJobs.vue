<template>
    <section class="similar-jobs" v-if="hasSimilarJobs">
        <h2 class="similar-jobs__title">{{ header }}</h2>
        <div class="similar-jobs__grid">
            <AppSolrJob
                :key="index"
                :source="meta.source"
                :job="similarJob"
                v-for="(similarJob, index) in similarJobs"
            >
                <template v-slot="jobData">
                    <section class="similar-jobs__grid-item">
                        <g-link :to="jobData.detailUrl">
                            <slot :jobData="jobData">
                                <h3 class="similar-jobs__grid-item-title">
                                    {{ jobData.title }}
                                </h3>
                                <p class="similar-jobs__grid-item-location">
                                    {{ jobData.city }}, {{ jobData.state }}
                                </p>
                            </slot>
                        </g-link>
                    </section>
                </template>
            </AppSolrJob>
        </div>
    </section>
</template>

<script>
import { SOLR } from '../services/search'
import AppSolrJob from "./Jobs/AppSolrJob"
import {searchService} from "../services/search"
export default {
    data() {
        return {
            meta: {},
            similarJobs: [],
        }
    },
    components: {
        AppSolrJob,
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        guid: {
            type: String,
            required: false,
            default: "",
        },
        buids: {
            type: Array,
            required: false,
            default: ()=> []
        },
        location: {
            type: String,
            required: false,
            default: "",
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
        getJobs() {
            searchService(
                {
                    num_items: 10,
                    q: `-guid:${this.guid} AND ${this.title}`,
                    location: this.location,
                },
                { source: SOLR, buids: this.buids, filters: [] }
            ).then((response) => {
                const data = response.data
                const {jobs, meta} = data
                this.meta = meta
                this.similarJobs = jobs
            })
        },
    },
}
</script>
