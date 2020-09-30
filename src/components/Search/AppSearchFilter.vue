<template>
    <AppAccordion
        v-if="displayedOptions.length && isVisible"
        :open="isActive"
        class="search-filter"
        :key="`${keyName}-accordion`"
        :name="`${keyName}-accordion`"
    >
        <template v-slot:header="{isOpen}">
            <slot name="display" :isOpen="isOpen">
                <h3
                    v-if="configFilter.display"
                    class="search-filter-display"
                    :class="{'search-filter-display--active': isActive}"
                >
                    {{ configFilter.display }}
                </h3>
            </slot>
        </template>

        <ul class="search-filter-options">
            <li
                class="search-filter-options-item"
                :key="index"
                v-for="(option, index) in displayedOptions"
            >
                <g-link :to="option.href">
                    {{ option.display }} ({{ option.value }})
                </g-link>
            </li>
        </ul>
        <section
            class="search-filter-limiter"
            v-if="shouldShowLess || hasMoreItems"
        >
            <button
                class="search-filter-limiter-more"
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
                class="search-filter-limiter-less"
                rel="nofollow"
            >
                Less
            </button>
        </section>
    </AppAccordion>
</template>
<script>
import AppAccordion from "../AppAccordion"
import {blank} from "../../services/helpers"
import {fullState, removeCountry} from "../../services/location"
import {omitBy, truncate, trim} from "lodash"
export default {
    props: {
        configFilter: {
            required: true,
            type: Object,
        },
        options: {
            required: false,
            type: Array,
            default: () => [],
        },
        input: {
            required: true,
            type: Object,
        },
        limit: {
            required: false,
            type: Number,
            default: 10,
        },
    },
    components: {
        AppAccordion,
    },
    data() {
        return {
            isActive: false,
            filteredOptions: [],
            displayedOptions: [],
        }
    },
    created() {
        this.filteredOptions = this.filterOptions(this.options)

        this.displayedOptions = this.filteredOptions.slice(0, this.limit)
    },
    computed: {
        isVisible() {
            return this.configFilter.visible !== false
        },

        queryParamName() {
            return this.configFilter.name
        },

        keyName() {
            return this.configFilter.key
        },

        shouldShowLess() {
            const numberOfItemsToAdd = 10

            const totalItemsShown = this.displayedOptions.length

            const hasItemsAdded = totalItemsShown > numberOfItemsToAdd

            if (hasItemsAdded) {
                return true
            }

            return false
        },

        hasMoreItems() {
            if (this.displayedOptions.length < this.filteredOptions.length) {
                return true
            }

            return false
        },
        cleanedInput() {
            return omitBy({...this.input}, blank)
        },
    },
    methods: {
        buildFilterHref(option) {
            let params = this.cleanedInput

            params[this.queryParamName] = option.submitValue
            params['page'] = 1

            let qs = []

            let value = null

            Object.keys(params).forEach(key => {
                value = encodeURIComponent(params[key])

                qs.push(`${key}=${value}`)
            })

            return "/jobs?" + qs.join("&")
        },

        isExistingFilter(value) {
            let inputValue = this.input[this.queryParamName]

            let isExisting = inputValue == value

            return isExisting
        },
        formatOption(option) {
            let display = option.display
            let submitValue = option.display

            if (this.queryParamName == "location") {
                display = fullState(removeCountry(option.display))
                submitValue = display
            } else if (this.keyName == "moc") {
                display = truncate(option.display, {length: 32})
                submitValue = trim(option.display.split("-")[0])
            }
            
            option.display = display
            option.submitValue = submitValue
            option.href =  this.buildFilterHref(option)

            return option
        },
        filterOptions(options) {
            let filtered = []
            let display = null

            options.forEach(option => {
                option = this.formatOption(option)

                if (!this.isExistingFilter(option.submitValue)) {
                    filtered.push(option)
                } else {
                    this.isActive = true
                }
            })

            return filtered
        },

        showMore() {
            const numberOfItemsToAdd = 10

            const currentTotalShown = this.displayedOptions.length

            this.displayedOptions = this.filteredOptions.slice(
                0,
                currentTotalShown + numberOfItemsToAdd
            )
        },

        showLess() {
            const numberOfItemsToAdd = 10

            const currentTotalShown = this.displayedOptions.length

            this.displayedOptions = this.filteredOptions.slice(
                0,
                currentTotalShown - numberOfItemsToAdd
            )
        },
    },
}
</script>
