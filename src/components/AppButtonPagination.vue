<template>
    <nav>
        <button
            type="button"
            @click
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
        }
    },
    created() {
        this.jobList = this.jobs
    },
    data() {
        return {
            current : this.currentPage,
            jobList : this.jobList
        }
    },
    computed: {
        nextPage() {
            const next = this.current + 1

            return next <= this.totalPages ? next : false
        },
    },
    methods: {
        loadMore() {
            return null
        }
    }
}
</script>
