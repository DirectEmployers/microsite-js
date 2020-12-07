<template>
    <component :is="tag">
        <slot
            :jobs="jobs"
            :sort="sort"
            :input="input"
            :status="status"
            :hasJobs="hasJobs"
            :sortedBy="sortedBy"
            :source="meta.source"
            :newSearch="newSearch"
            :pagination="pagination"
            :selectPage="selectPage"
            :sortOptions="sortOptions"
            :featuredJobs="featuredJobs"
            :removeFilter="removeFilter"
            :appliedFilters="appliedFilters"
            :getFilterOptions="getFilterOptions"
            :filteredInput="getCurrentPayload()"
        >
        </slot>
    </component>
</template>

<script>

import base from './mixins/provider'

export default{
    mixins: [base]
}
</script>