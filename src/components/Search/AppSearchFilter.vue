<template>
    <AppAccordion
        v-if="!blank(filteredOptions) && isVisible"
        :open="isActive"
        class="search__filter"
        :key="`${keyName}-accordion`"
        :name="`${keyName}-accordion`"
    >
        <template v-slot:header="{ isOpen }">
            <slot name="display" :isOpen="isOpen">
                <h3
                    v-if="configFilter.display"
                    class="search__filter-display"
                    :class="{ 'search__filter-display--active': isActive }"
                >
                    {{ configFilter.display }}
                </h3>
            </slot>
        </template>

        <ul class="search__filter-options">
            <li
                @click="selectOption(option)"
                class="search__filter-options-item"
                :key="index"
                v-for="(option, index) in displayedOptions"
            >
                <slot name="option" :option="option">
                    {{ option.display }} ({{ option.value }})
                </slot>
            </li>
        </ul>
        <section
            class="search__filter-limiter"
            v-if="shouldShowLess || hasMoreItems"
        >
            <button
                class="search__filter-limiter-more"
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
                class="search__filter-limiter-less"
                rel="nofollow"
            >
                Less
            </button>
        </section>
    </AppAccordion>
</template>
<script>
import AppAccordion from "../AppAccordion"
import { blank } from "../../services/helpers"
import { removeCountry, fullState } from "../../services/api/location"

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
            type: Object
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
    },
    methods: {
        selectOption(option) {

            this.$router.push({
                path: this.$route.path,
                query: {
                    ...this.$route.query,
                    [this.queryParamName]: option.display,
                },
            })

            this.$emit("searchFilterSelected", option)
        },

        isExistingFilter(display) {
            return this.input[this.queryParamName] != display
        },

        filterOptions(options) {
            let filtered = []
            let display = null

            options.forEach((option) => {
                display = this.formatDisplay(option.display)

                if (this.isExistingFilter(display)) {
                    filtered.push({
                        display: display,
                        value: option.value,
                    })
                } else {
                    this.isActive = true
                }
            })

            return filtered
        },

        formatDisplay(display) {
            if (this.queryParamName == "location") {
                //strip off countries
                display = removeCountry(display)
                //and try to expand to a full value
                display = fullState(display)

            }

            return display
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

        blank(value) {
            return blank(value)
        },
    },
}
</script>
