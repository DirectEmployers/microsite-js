<template>
    <nav v-if="totalPages > 1 && currentPage < totalPages" class="load-more">
        <button
            type="button"
            @click="loadMore"
        >
            Load More Jobs
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
    computed: {
        nextPage() {
            const next = this.currentPage + 1
            return next <= this.totalPages ? next : false
        },
    },
    methods: {
        loadMore() {
            this.$emit("loadMore", this.nextPage)
        },
    }
}
</script>
