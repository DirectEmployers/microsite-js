<template>
    <component :is="tag">
        <slot
            :jobs="jobs"
            :sort="sort"
            :input="input"
            :status="status"
            :hasJobs="hasJobs"
            :source="meta.source"
            :setFilter="setFilter"
            :newSearch="newSearch"
            :pagination="pagination"
            :selectPage="selectPage"
            :featuredJobs="featuredJobs"
            :removeFilter="removeFilter"
            :isGoogleTalent="isGoogleTalent"
            :appliedFilters="appliedFilters"
            :isCommuteSearch="isCommuteSearch"
            :getFilterOptions="getFilterOptions"
        >
        </slot>
    </component>
</template>

<script>

import base from './mixins/provider'

export default{
    mixins: [base],
    methods: {
        inputDefaults(){
            return {
                moc: ""
            }
        }
    }
}
</script>