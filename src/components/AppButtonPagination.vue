<template>
    <nav v-if="totalPages > 1 && currentPage < totalPages">
        <button
            type="button"
            @click="loadMore"
        >
            More
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
    }
}
</script>
