<template>
    <nav aria-label="pagination" class="simple-pagination">
        <button
            class="simple-pagination-button"
            v-if="currentPage > 1"
            @click.prevent="selectPage(previousPage)"
        >
            Back
        </button>
        page {{currentPage}}
        <button
            class="simple-pagination-button"
            v-if="currentPage < totalPages"
            @click.prevent="selectPage(nextPage)"
        >
            Next
        </button>
    </nav>
</template>

<script>

export default {
    props: {
        totalPages: { required: true, type: Number },
        pageLimit: { required: false, type: Number, default: 5 },
        currentPage: { required: false, type: Number, default: 1 },
    },
    data(){
        return {
            current: this.currentPage
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

        pages: function() {
            let pages = this.getPageRange()

            if (pages.length < this.pageLimit) {
                let start = Math.max(
                    1,
                    this.current - Math.abs(this.pageLimit - pages.length)
                )

                pages = this.range(start, this.totalPages)
            }

            pages = this.prefixPages(pages)

            return this.suffixPages(pages)
        },

        pageIsInRange: function() {
            const page = this.current

            return page >= 1 && page <= this.totalPages
        },
    },
    methods: {
        getPageRange() {
            let pages = []

            const pageLimit = this.pageLimit - 1

            const isLimitTotal = this.totalPages == pageLimit

            if (isLimitTotal || !this.pageIsInRange) {
                return this.range(1, pageLimit)
            }

            return this.range(
                this.current,
                Math.min(this.current + pageLimit, this.totalPages)
            )
        },

        prefixPages(pages) {
            if (!pages.includes(1)) {
                const fromOne = Math.abs(pages[0] - 1)
                pages = (fromOne >= 2 ? [1, "..."] : [1]).concat(pages)
            }
            return pages
        },

        suffixPages(pages) {
            if (!pages.includes(this.totalPages)) {
                const fromLast = Math.abs(
                    this.totalPages - pages[pages.length - 1]
                )
                pages = pages.concat(
                    fromLast >= 2 ? ["...", this.totalPages] : [this.totalPages]
                )
            }
            return pages
        },

        selectPage(page) {
            if (!page || isNaN(page)) {
                return
            }

            this.current = page

            this.$emit("pageSelected", {page})

        },

        range(start, end) {
            let i
            let range = []
            for (i = start; i <= end; i++) {
                range.push(i)
            }
            return range
        },
    },
}
</script>
