<template>
    <ul class="filters">
        <li class="filters__criteria" v-if="hasSearchCriteria">
            <h2 class="filters__criteria-header">
                Current Search Criteria:
            </h2>
            <ul class="filters__criteria-items">
                <li
                    class="filters__criteria-item"
                    v-for="(value, param) in $route.query"
                    :key="param"
                >
                    <button
                        class="filters__criteria-button"
                        v-if="shouldBeCriteria(param)"
                        @click="removeSearchCriteria(param)"
                        :aria-label="`Remove ${value} from search`"
                    >
                        {{ cleanDisplay(param, value) }}
                    </button>
                </li>
                <li class="filters__criteria-item">
                    <button
                        class="filters__criteria-button"
                        type="button"
                        @click="clearSearchCriteria"
                        aria-label="Clear current search criteria"
                    >
                        Clear All
                    </button>
                </li>
            </ul>
        </li>
        <AppAccordion
            :open="sortedBy"
            key="sort-accordion"
            name="sort-accordion"
            class="filter"
            tag="li"
        >
            <template v-slot:header>
                <h2 class="filter__header">
                    Sorted By
                    <strong class="filter__header-name">
                        {{ titleCase(sortedBy) }}
                    </strong>
                    <span class="filter__header-icon"></span>
                </h2>
            </template>
            <ul class="filter__items">
                <li
                    class="filter__item"
                    v-for="option in [
                        { value: 'relevance', display: 'Relevance' },
                        { value: 'title', display: 'Job Title' },
                        { value: 'distance', display: 'Distance' },
                        { value: 'date', display: 'Date' },
                    ]"
                    :key="option.value"
                >
                    <button
                        class="filter__item-button"
                        @click.prevent="sort(option.value)"
                        v-if="shouldShowSort(option.value)"
                    >
                        {{ option.display }}
                    </button>
                </li>
            </ul>
        </AppAccordion>
        <li v-for="(results, key) in filteredResults" :key="key">
            <AppAccordion
                class="filter"
                v-if="results.length > 0 && filterIsVisible(keyedConfig[key])"
                :key="`${key}-accordion`"
                :name="`${key}-accordion`"
                :open="toggledfilters[key]"
            >
                <template v-slot:header>
                    <h2 class="filter__header">
                        Filter By
                        <strong class="filter__header-text">
                            {{ keyedConfig[key].display }}
                        </strong>
                        <span class="filter__header-icon"></span>
                    </h2>
                </template>

                <AppFormFilter
                    :ref="key"
                    :config-filter="keyedConfig[key]"
                    :filter-data="results"
                    @selected-filter-result="selectedfilter"
                ></AppFormFilter>
            </AppAccordion>
        </li>
    </ul>
</template>
<script>
import AppFormFilter from "./AppFormFilter"
import AppAccordion from "../AppAccordion.vue"
import { cleanLocation } from "../../services/api/location"
import { toLower, startCase } from "lodash"

export default {
    data() {
        return {
            showDistanceSort: false,
            keyedConfig: {},
            filteredResults: {},
            toggledfilters: [],
        }
    },
    props: {
        filterData: {
            type: Object,
            required: true,
        },
        siteConfig: {
            type: Object,
            required: true,
        }
    },
    components: {
        AppFormFilter,
        AppAccordion,
    },
    computed: {
        sortedBy() {
            return this.$route.query.sort || "relevance"
        },
        configFilters() {
            return this.siteConfig.filters.filter((filter) => {
                if (!filter.hasOwnProperty("force_filters")) {
                    return filter
                }
            })
        },
        currentCriteriaParams(){
            const query = { ...this.$route.query }

            return Object.keys(query).filter(param => {
                return this.shouldBeCriteria(param)
            })
        },
        hasSearchCriteria() {

            return this.currentCriteriaParams.length > 0
        },
        paramsList() {
            return this.configFilters.map((filter) => {
                return filter.query_param
            })
        },
    },
    created() {
        this.$router.app.$on("params.updated", this.paramsChanged)
        // this.$router.app.$on("search.completed", this.paramsChanged)

        this.filterResults()
    },
    methods: {
        filterIsVisible(filter){
            return filter.visible !== false
        },
        paramsChanged(params) {
            if (!params.location) {
                this.showDistanceSort = false
                return
            }
            this.showDistanceSort =
                params.location?.length > 0
        },

        shouldShowSort(by) {
            let show = true
            if (by == "distance") {
                show = this.showDistanceSort
            }
            return by != this.sortedBy && show
        },

        cleanDisplay(param, display) {
            if (param == "location") {
                return cleanLocation(display)
            }

            return display
        },

        shouldBeCriteria(key) {
            return this.paramsList.includes(key)
        },

        sort(by) {
            this.$router.push({
                path: this.$route.path,
                query: {
                    ...this.$route.query,
                    ...{ sort: by },
                },
            })
        },

        titleCase(str) {
            return startCase(toLower(str))
        },

        filterResults() {
            this.configFilters.forEach(configFilter => {
                this.keyedConfig[configFilter.key] = configFilter
                this.filterResponseData(configFilter)
            })
        },

        filterResponseData(configFilter) {
            let cleanDisplay = null
            const key = configFilter.key
            const queryParam = configFilter.query_param
            this.filteredResults[key] = []

            this.toggledfilters[key] = false

            this.filterData[key].forEach(result => {
                cleanDisplay = this.cleanDisplay(queryParam, result.display)

                if (this.$route.query[queryParam] != cleanDisplay) {
                    result.display = cleanDisplay

                    this.filteredResults[key].push(result)
                } else {
                    this.toggledfilters[key] = true
                }
            })

            return this.filteredResults[key].length > 0
        },

        selectedfilter(selectedfilter) {
            const newQuery = {
                ...this.$route.query,
                ...selectedfilter,
            }

            this.$router.push({ path: this.$route.path, query: newQuery })
        },

        removeSearchCriteria(key) {
            const query = { ...this.$route.query }

            delete query[key]

            this.$router.replace({ query })
        },

        clearSearchCriteria() {
            const query = { ...this.$route.query }

            this.currentCriteriaParams.forEach((param)=>{
                delete query[param]

            })

            this.$router.replace({ query })
        },
    },
}
</script>
