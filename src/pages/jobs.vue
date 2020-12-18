<template>
    <Layout>
        <AppGoogleTalentSearchProvider :site-config="$siteConfig">
            <template v-slot="{
                jobs,
                sort,
                input,
                source,
                status,
                hasJobs,
                setFilter,
                newSearch,
                selectPage,
                pagination,
                filteredInput,
                featuredJobs,
                removeFilter,
                appliedFilters,
                isGoogleTalent,
                isCommuteSearch,
                getFilterOptions,
            }">
                <AppLoader v-if="status.loading"/>
                <section v-else>
                    <div class="mx-4">
                        <AppSearchForm
                            :input="input"
                            :source="source"
                            @search="newSearch"
                            :isCommuteSearch="isCommuteSearch"
                        />
                    </div>
                    <section class="flex flex-col lg:flex-row">
                        <div class="mx-4 w-full lg:w-1/2">
                            <h3 v-if="status.error && !hasJobs">Unable to load jobs...</h3>
                            <AppFeaturedJobs
                                :featured-jobs="featuredJobs"
                                :source="source"
                            />
                            <section v-if="jobs.length">
                                <AppJobSearchResults
                                    :jobs="jobs"
                                    :input="filteredInput"
                                    :source="source"
                                />
                                <div class="text-2xl">
                                    {{ pagination.total }} jobs found
                                </div>
                                <AppPagination
                                    @pageSelected="selectPage"
                                    :current-page="pagination.page"
                                    :total-records="pagination.total"
                                    :total-pages="pagination.total_pages"
                                />
                            </section>
                            <h3
                                class="font-bold text-lg"
                                v-else-if="!status.error && !hasJobs"
                            >
                                No results found...
                            </h3>
                        </div>
                        <section class="lg:ml-4 w-full lg:w-2/5">
                            <div v-if="appliedFilters.length">
                                <h3 class="font-bold text-xl">
                                    Current Search Criteria
                                </h3>
                                <AppChip
                                    v-for="(filter, index) in appliedFilters"
                                    :key="index"
                                    :name="filter.parameter"
                                    @chipClicked="removeFilter"
                                    class="cursor-pointer"
                                >
                                    <AppXIcon class="w-2 inline" />
                                    {{ filter.display }}
                                </AppChip>

                                <AppChip
                                    name="*"
                                    class="cursor-pointer"
                                    text="Clear All"
                                    @chipClicked="removeFilter"
                                ></AppChip>
                            </div>
                            <AppAccordion
                                :open="true"
                                v-if="sort.options.length"
                            >
                                <template v-slot:display>
                                    <h3 class="font-bold text-xl">
                                        Sorted By
                                        <strong>
                                            {{ sort.by }}
                                        </strong>
                                    </h3>
                                </template>
                                <ul>
                                    <li
                                        @click="sort.sortField(option)"
                                        class="cursor-pointer"
                                        :key="index"
                                        v-for="(option, index) in sort.options"
                                    >
                                        {{ option }}
                                    </li>
                                </ul>
                            </AppAccordion>

                            <AppSearchFilter
                                :key="index"
                                :input="filteredInput"
                                :name="configFilter.name"
                                @selectedFilter="setFilter"
                                :key-name="configFilter.key"
                                :visible="configFilter.visible"
                                :options="getFilterOptions(configFilter)"
                                v-for="(configFilter, index) in $siteConfig.filters"
                            >
                                <template
                                    v-slot="{
                                        displayedFilters,
                                        shouldShowLess,
                                        shouldShowMore,
                                        showLess,
                                        showMore,
                                    }"
                                >
                                    <AppAccordion
                                        :display="`Filter By ${configFilter.display}`"
                                    >

                                        <ul class="search-filter-options">
                                            <li
                                                :key="index"
                                                class="search-filter-options-item"
                                                v-for="(filter, index) in displayedFilters"
                                            >
                                                <g-link :to="filter.href">
                                                    {{ filter.display }}
                                                    <span v-if="filter.value">
                                                        ({{ filter.value }})
                                                    </span>
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
                                    </AppAccordion>
                                </template>
                            </AppSearchFilter>
                            <div class="container">
                                <button
                                    @click="toggleCommuteModal()"
                                    class="button"
                                    v-if="isGoogleTalent"
                                >
                                    Commute Search
                                </button>
                            </div>
                            <AppModal
                                id="commute-modal"
                                v-if="isGoogleTalent"
                                ref="commute-modal"
                                title="Commute Search"
                            >
                                <AppCommuteSearchForm
                                    :input="input"
                                    @search="newSearch"
                                />
                            </AppModal>
                        </section>
                    </section>
                </section>
            </template>
        </AppGoogleTalentSearchProvider>
    </Layout>
</template>
<script>
import {blank} from "~/services/helpers"
import AppPagination from "~/components/AppPagination"
import AppAccordion from "~/components/AppAccordion"
import AppModal from "~/components/AppModal"
import AppSearchForm from "~/demo/components/AppSearchForm"
import AppCommuteSearchForm from "~/demo/components/AppCommuteSearchForm"
import AppLoader from "~/demo/components/AppLoader"
import AppSearchFilter from "~/components/Search/AppSearchFilter"
import AppChip from "~/components/AppChip"
import AppFeaturedJobs from "~/demo/components/AppFeaturedJobs"
import AppJobSearchResults from "~/demo/components/AppJobSearchResults"
import AppXIcon from "~/components/Icons/AppXIcon"
import AppGoogleTalentSearchProvider from "~/components/Search/Providers/AppGoogleTalentSearchProvider"
export default {
    components: {
        AppAccordion,
        AppPagination,
        AppSearchFilter,
        AppJobSearchResults,
        AppXIcon,
        AppModal,
        AppChip,
        AppLoader,
        AppFeaturedJobs,
        AppSearchForm,
        AppCommuteSearchForm,
        AppGoogleTalentSearchProvider,
    },
    data() {
        return {
            AppAccordion,
        }
    },
    metaInfo: {
        title: "Jobs",
        meta: [
            {
                key: "description",
                name: "description",
                content: "only the best jobs",
            },
        ],
    },
    methods: {
        toggleCommuteModal() {
            this.$refs["commute-modal"].toggle()
        },
    },
}
</script>
