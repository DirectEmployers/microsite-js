<template>
    <ul class="filter__items">
        <li
            class="filter__item"
            :key="index"
            v-for="(filter, index) in paginatedData"
        >
            <button
                class="filter__item-button"
                @click="selectItem(filter.display)"
            >
                {{ filter.display }}
                ({{ filter.value }})
            </button>
        </li>
        <li class="filter__limiter" v-if="shouldShowLess || hasMoreItems">
            <button
                class="filter__limiter-more"
                @click="showMore()"
                v-if="hasMoreItems"
                aria-label="Show more filters"
                rel="nofollow"
            >
                More
            </button>
            <button
                v-if="shouldShowLess"
                @click="showLess()"
                aria-label="Show less filters"
                class="filter__limiter-less"
                rel="nofollow"
            >
                Less
            </button>
        </li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            paginatedData: this.filterData.slice(0, 10),
        }
    },
    props: {
        configFilter: {
            type: Object,
            required: true,
        },
        filterData: {
            type: Array,
            required: true,
        },
        wrapperClass: {
            type: String,
            required: false,
            default: "border-b border-solid p-2 ml-2",
        },
    },
    computed: {
        shouldShowLess() {
            const numberOfItemsToAdd = 10

            const totalItemsShown = this.paginatedData.length

            const hasItemsAdded = totalItemsShown > numberOfItemsToAdd

            if (hasItemsAdded) {
                return true
            }

            return false
        },

        hasMoreItems() {
            if (this.paginatedData.length < this.filterData.length) {
                return true
            }

            return false
        },
    },
    methods: {
        selectItem(display) {
            const filtersQuery = {
                [this.configFilter["query_param"]]: display,
                page: 1,
            }

            this.$emit("selected-filter-result", filtersQuery)
        },

        getCleanDisplay(display) {
            return this.cleaned[display] || this.cleanDisplay(display)
        },

        showMore() {
            const numberOfItemsToAdd = 10

            const currentTotalShown = this.paginatedData.length

            this.paginatedData = this.filterData.slice(
                0,
                currentTotalShown + numberOfItemsToAdd
            )
        },

        showLess() {
            const numberOfItemsToAdd = 10

            const currentTotalShown = this.paginatedData.length

            this.paginatedData = this.filterData.slice(
                0,
                currentTotalShown - numberOfItemsToAdd
            )
        }

    },
}
</script>
