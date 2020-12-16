<template>
    <component
        class="search-filter"
        :is="tag"
        v-if="isVisible && hasOptions"
        v-bind="$attrs"
    >
        <h3
            v-if="display"
            class="search-filter-display"
        >
            Filter By {{ display }}
        </h3>
        <slot
            :showLess="showLess"
            :showMore="showMore"
            :shouldShowLess="shouldShowLess"
            :shouldShowMore="shouldShowMore"
            :displayedFilters="displayedFilters"
        >
            <ul class="search-filter-options">
                <li
                    :key="index"
                    class="search-filter-options-item"
                    v-for="(option, index) in displayedFilters"
                >
                    <g-link :to="option.href">">
                        {{ option.display }}
                        <span v-if="option.value">({{ option.value }})</span>
                    </g-link>
                </li>
            </ul>
            <section
                class="search-filter-limiter"
                v-if="shouldShowLess || shouldShowMore"
            >
                <button
                    class="search-filter-limiter-more"
                    @click="showMore()"
                    v-if="shouldShowMore"
                    aria-label="Show more filters"
                    rel="nofollow"
                >
                    More
                </button>
                <button
                    v-if="shouldShowLess"
                    @click="showLess()"
                    aria-label="Show less filters"
                    class="search-filter-limiter-less"
                    rel="nofollow"
                >
                    Less
                </button>
            </section>
        </slot>
    </component>
</template>
<script>
import {clone} from "lodash"
import buildUrl from "axios/lib/helpers/buildURL"

export default {
    props: {
        keyName: {
            required: false,
            default() {
                return this._uid
            },
        },
        tag: {
            type: [String, Object],
            required: false,
            default: "section",
        },
        name: {
            required: true,
            type: String,
        },
        display: {
            required: false,
            default: "",
            type: String,
        },
        visibile: {
            type: Boolean,
            default: true,
        },
        options: {
            required: false,
            type: Array,
            default: () => [],
        },
        input: {
            required: false,
            type: Object,
            default: () => { return {} },
        },
        limit: {
            required: false,
            type: Number,
            default: 10,
        },
    },
    data() {
        return {
            givenOptions: clone(this.options),
            displayedFilters: {},
        }
    },
    created() {

        let filteredOptions = []
        this.givenOptions.forEach(option => {
            if(this.input[this.name] != option.display){
                filteredOptions.push(
                    this.buildFilterHref(option)
                )
            }
        })

        this.displayedFilters = filteredOptions.slice(0, this.limit)
    },
    computed: {
        hasOptions() {
            return this.displayedFilters.length > 0
        },

        isVisible() {
            return this.visible !== false
        },

        shouldShowLess() {
            return this.displayedFilters.length > this.limit
        },

        shouldShowMore() {
            return this.displayedFilters.length < this.givenOptions.length
        },
    },
    methods: {
        buildFilterHref(option) {
            let currentParams = {}
            for(let param in this.input){
                if(this.input[param]){
                    currentParams[param] = this.input[param]
                }
            }
            let params = {
                page: 1,
                [this.name]: option.display,
            }
            option.href = buildUrl("jobs", {...currentParams, ...params})
            return option
        },

        showMore() {
            const numberOfItemsToAdd = this.limit

            const currentTotalShown = this.displayedFilters.length

            this.displayedFilters = this.givenOptions.slice(
                0,
                currentTotalShown + numberOfItemsToAdd
            )
        },

        showLess() {
            const limit = this.limit

            const currentTotalShown = this.displayedFilters.length

            let less = currentTotalShown - limit

            if (less < limit) {
                less = currentTotalShown - less
            }

            this.displayedFilters = this.givenOptions.slice(0, less)
        },
    },
}
</script>
