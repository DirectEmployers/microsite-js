<template>
    <nav v-if="totalPages > 1 && currentPage < totalPages" class='load-more-pagination'>
        <button class="load-more-pagination-button" type="button" @click="loadMore">
            <slot>
                Load More
            </slot>
        </button>
    </nav>
</template>

<script>
export default {
    props: {
        currentPage: {
            required: false,
            type: Number,
            default: 1,
        },
        totalPages: {
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
