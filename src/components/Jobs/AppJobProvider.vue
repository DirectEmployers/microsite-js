<template>
    <component :is="jobComponent" v-bind="{...$attrs, ...$props}">
        <template v-slot="jobData">
            <slot v-bind="jobData"></slot>
        </template>
    </component>
</template>

<script>
import SolrJob from './AppSolrJob'
import GoogleTalentJob  from './AppGoogleTalentJob'
import {GOOGLE_TALENT, SOLR} from "../../services/search"

export default {
    props:{
        job:{
            type: Object,
            required: true,
        },
        source: {
            type: String,
            required: true,
        },
    },
    computed:{
        isSolr() {
            return this.source == SOLR
        },
        isGoogleTalent() {
            return this.source == GOOGLE_TALENT
        },
        jobComponent(){
            return this.isGoogleTalent ? GoogleTalentJob: SolrJob
        },
    }
}
</script>
