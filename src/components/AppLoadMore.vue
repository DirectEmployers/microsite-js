<template>
    <nav 
    class='load-more-pagination'
    :class="{hidden:!isVisible}"
    >
        <button class="load-more-pagination__button" type="button" @click="loadMore">
            <slot>
                Load More
            </slot>
        </button>
    </nav>
</template>

<script>
export default {
    props: {
        currentJobs: {
            required: false,
            type: Number,
            default: 1,
        },
        totalJobs: {
            required: true,
            type: Number,
        },
    },
    computed: {
        isVisible(){
            return this.totalJobs > 1 && this.currentJobs < this.totalJobs
        }
    },

    methods: {
        loadMore() {
            this.$emit("loadMore")
        },
    },
}
</script>
