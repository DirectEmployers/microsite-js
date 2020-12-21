<template>
    <component :is="tag">
        <slot
            :jobs="displayedJobs"
            :sort="sort"
            :input="input"
            :status="status"
            :hasJobs="hasJobs"
            :loadMore="loadMore"
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
            :filteredInput="getCurrentPayload()"
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