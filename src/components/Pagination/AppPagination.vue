<template>
    <nav aria-label="pagination">
        <ul class="pagination" v-if="totalPages > 1">
            <li class="pagination__item">
                <g-link
                    aria-label="Previous Page"
                    class="pagination__link"
                    :class="{
                        'pagination__link--hidden': !previousPage,
                    }"
                    :to="link(previousPage)"
                >
                    <slot name="previous-text">&laquo;</slot>
                </g-link>
            </li>
            <li
                class="pagination__item"
                v-for="(page, key) in pages"
                :key="key"
            >
                <g-link
                    class="pagination__link"
                    :class="{
                        'pagination__link--active': page == current,
                        'pagination__link--disabled': disablePage(page),
                        'cursor-not-allowed': disablePage(page),
                    }"
                    :aria-label="ariaPageTitle(page)"
                    :aria-current="page == current"
                    :aria-disabled="disablePage(page)"
                    :disabled="disablePage(page)"
                    :to="link(page)"
                >
                    {{ page }}
                </g-link>
            </li>
            <li></li>
            <li class="pagination__item">
                <g-link
                    :to="link(nextPage)"
                    class="pagination__link"
                    aria-label="Next Page"
                    :class="{
                        'pagination__link--hidden': !nextPage,
                    }"
                >
                    <slot name="next-text">&raquo;</slot>
                </g-link>
            </li>
        </ul>
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
        pages: function () {
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
        pageIsInRange: function () {
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

        link(page){
            if(typeof(page) !== 'number'){
                return ""
            }
            let regex = /(\?page=)(\d+)|(&page=)(\d+)/
            if(!regex.test(this.$route.fullPath)){
                return this.$route.fullPath.includes('?') ? `${this.$route.fullPath}&page=${page}` : `${this.$route.fullPath}?page=${page}`
            }
            return this.$route.fullPath.replace(regex, `$1$3${page}`)
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
        range(start, end) {
            let i
            let range = []
            for (i = start; i <= end; i++) {
                range.push(i)
            }
            return range
        },
        disablePage(page) {
            if (page === this.current) {
                return true
            }
            if (page === "...") {
                return true
            }
            return false
        },
        ariaPageTitle(page) {
            if (page === this.current) {
                return "Current Page"
            }
            if (page === "...") {
                return "Page Number Break"
            }
            return `Page ${page}`
        },
    },
}
</script>
