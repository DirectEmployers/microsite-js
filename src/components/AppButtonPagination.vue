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
    data() {
        return {
            current : this.currentPage
        }
    },
    computed: {
        nextPage() {
            const next = this.current + 1

            return next <= this.totalPages ? next : false
        },
        jobList() {
            return this.jobs
        }
    }
}
</script>
