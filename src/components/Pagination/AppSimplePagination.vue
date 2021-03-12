<template>
    <nav aria-label="pagination" class="simple-pagination">
        <g-link
            class="simple-pagination-button"
            v-if="currentPage > 1"
            :to="link(previousPage)"
        >
            <slot name="back">Back</slot>
        </g-link>
        <slot></slot>
        <g-link
            class="simple-pagination-button"
            v-if="currentPage < totalPages"
            :to="link(nextPage)"
        >
            <slot name="next">Next</slot>
        </g-link>
    </nav>
</template>

<script>
import buildURL from "axios/lib/helpers/buildURL"

export default {
    props: {
        totalPages: {required: true, type: Number},
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
        link(page){
            if(isNaN(page)){
                return ""
            }
            let query = this.$route.query
            query.page = page

            return buildURL(this.$route.path, query)
        },
    },
}
</script>
