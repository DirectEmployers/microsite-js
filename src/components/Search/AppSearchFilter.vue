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
                    v-if="display"
                    class="search-filter-display"
                    :class="{'search-filter-display--active': isActive}"
                >
                    Filter By {{ display }}
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
                    {{ option.display }}
                    <span v-if="option.value">({{ option.value }})</span>
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
import {blank, strAfter} from "../../services/helpers"
import {removeCountry, fullState} from "../../services/location"
import {omitBy, truncate, trim} from "lodash"
import buildUrl from 'axios/lib/helpers/buildURL'
export default {
    props: {
        display: {
            required: false,
            type: String,
        },
        keyName: {
            required: false,
            default() {
                return this._uid
            },
        },
        name: {
            required: true,
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
            return this.visible !== false
        },

        shouldShowLess() {

            const totalItemsShown = this.displayedOptions.length

            const hasItemsAdded = totalItemsShown > this.limit

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

            params["page"] = 1

            params[this.name] = option.submitValue

            return buildUrl('jobs', params)
        },

        isExistingFilter(value) {
            let inputValue = this.input[this.name]

            let isExisting = inputValue == value

            return isExisting
        },
        formatOption(option) {
            let display = option.display
            let submitValue = option.display

            if (Object.prototype.hasOwnProperty.call(option, "submitValue")) {
                submitValue = option.submitValue
            }
            // TODO - Rework this component because its sloppy and because formatting is fragile
            // Either:
            // consider moving all formatting back to the back end as data varies between sources
            // or implement a reliable formatting standard that will parse data regardless of source.
            // perhaps a format prop :format="some_state_formatting_function" ?
            if(this.keyName == 'state'){
                let parsed = strAfter(option.display, "::")
                if(parsed){
                    display = parsed
                    submitValue = parsed
                }
            }
            if (['city', 'state'].includes(this.keyName)) {
                display = fullState(removeCountry(display))
                submitValue = display
            } else if (this.name == "moc") {
                display = display.split("::")[1]
                submitValue = display
                display = truncate(display, {length: 32})
            }

            option.display = display
            option.submitValue = submitValue
            option.href = this.buildFilterHref(option)

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
            const numberOfItemsToAdd = this.limit

            const currentTotalShown = this.displayedOptions.length

            this.displayedOptions = this.filteredOptions.slice(
                0,
                currentTotalShown + numberOfItemsToAdd
            )
        },

        showLess() {
            const limit = this.limit

            const currentTotalShown = this.displayedOptions.length

            let less = currentTotalShown - limit

            if(less < limit){
                less = currentTotalShown - less
            }

            this.displayedOptions = this.filteredOptions.slice(
                0,
                less
            )
        },
    },
}
</script>
