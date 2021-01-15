<template>
    <nav v-if="totalJobs > 1 && currentJobs < totalJobs" class='load-more-pagination'>
        <button class="load-more-pagination__button" type="button" @click="loadMore">
            <slot>
                Load More
            </slot>
        </button>
    </nav>
</template>

<script>
export default {
    props: {
        currentJobs: {
            required: false,
            type: Number,
            default: 1,
        },
        totalJobs: {
            required: true,
            type: Number,
        },
    },

    methods: {
        loadMore() {
            this.$emit("loadMore")
        },
    },
}
</script>
