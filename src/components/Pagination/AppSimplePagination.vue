<template>
    <nav aria-label="pagination" class="simple-pagination">
        <button
            class="simple-pagination-button"
            v-if="currentPage > 1"
            @click.prevent="selectPage(previousPage)"
        >
            <slot name="back">Back</slot>
        </button>
        <slot></slot>
        <button
            class="simple-pagination-button"
            v-if="currentPage < totalPages"
            @click.prevent="selectPage(nextPage)"
        >
            <slot name="next">Next</slot>
        </button>
    </nav>
</template>

<script>
export default {
    props: {
        totalPages: {required: true, type: Number},
        pageLimit: {required: false, type: Number, default: 5},
        currentPage: {required: false, type: Number, default: 1},
    },
    data() {
        return {
            current: this.currentPage,
        }
    },
    computed: {
        nextPage() {
            const next = this.current + 1

            return next <= this.totalPages ? next : false
        },

        previousPage() {
            const previous = this.current - 1
            return previous >= 1 ? previous : false
        },
    },
    methods: {
        selectPage(page) {
            if (!page || isNaN(page)) {
                return
            }
            this.current = page

            this.$emit("pageSelected", {page})
        },
    },
}
</script>
