<template>
    <nav>
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
