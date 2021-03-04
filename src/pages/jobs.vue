<template>
    <Layout>
        <AppGoogleTalentSearchProvider
            :site-config="$siteConfig"
            :is-load-more="$static.metadata.paginationType == 'load'"
        >
            <template
                v-slot="{
                    jobs,
                    sort,
                    input,
                    source,
                    status,
                    hasJobs,
                    loadMore,
                    setInput,
                    setFilter,
                    newSearch,
                    pagination,
                    filteredInput,
                    featuredJobs,
                    appliedFilters,
                    isGoogleTalent,
                    isCommuteSearch,
                    getFilterOptions,
                }"
            >
                <AppLoader v-if="status.loading && !jobs.length" />
                <section v-else-if="status.error && status.error.response && status.error.response.status == 404">
                    <App404 />
                </section>
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
                        <div class="mb-6 mx-4 w-full lg:w-1/2">
                            <h3 v-if="status.error && !hasJobs">
                                Unable to load jobs...
                            </h3>
                            <AppFeaturedJobs
                                :featured-jobs="featuredJobs"
                                :source="source"
                            />
                            <section v-if="jobs.length">
                                <AppJobSearchResults
                                    class="mb-4"
                                    :jobs="jobs"
                                    :input="filteredInput"
                                    :source="source"
                                />

                                <AppLoadMore
                                    v-if="
                                        $static.metadata.paginationType ==
                                        'load'
                                    "
                                    :totalJobs="pagination.total"
                                    :currentJobs="jobs.length"
                                    @loadMore="loadMore"
                                />
                                <AppSimplePagination
                                    v-else-if="
                                        $static.metadata.paginationType ==
                                        'simple'
                                    "
                                    @pageSelected="setInput"
                                    :current-page="pagination.page"
                                    :total-records="pagination.total"
                                    :total-pages="pagination.total_pages"
                                />
                                <AppPagination
                                    v-else
                                    @pageSelected="setInput"
                                    :current-page="pagination.page"
                                    :total-records="pagination.total"
                                    :total-pages="pagination.total_pages"
                                />
                                <div
                                    class="text-sm"
                                    v-if="
                                        $static.metadata.paginationType ==
                                        'load'
                                    "
                                >
                                    Showing {{ jobs.length }} of
                                    {{ pagination.total }}
                                    {{ jobs.length == 1 ? "job" : "jobs" }}
                                </div>
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
                                <AppSearchFilterChip
                                    v-for="(filter, index) in appliedFilters"
                                    :key="index"
                                    :url="filter.link"
                                    :text="filter.display"
                                    class="cursor-pointer"
                                >
                                    <AppXIcon class="w-2 inline" />
                                    {{ filter.display }}
                                </AppSearchFilterChip>

                                <AppSearchFilterChip
                                    url="/jobs"
                                    text="Clear All"
                                    class="cursor-pointer"
                                ></AppSearchFilterChip>
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
                                v-for="(
                                    configFilter, index
                                ) in $siteConfig.filters"
                                :key="index"
                                :input="filteredInput"
                                :name="configFilter.name"
                                :key-name="configFilter.key"
                                :visible="configFilter.visible"
                                :options="getFilterOptions(configFilter)"
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
                                                v-for="(
                                                    filter, index
                                                ) in displayedFilters"
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
                                            v-if="
                                                shouldShowLess || shouldShowMore
                                            "
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
import AppModal from "~/components/AppModal"
import App404 from "~/demo/components/App404"
import AppXIcon from "~/components/Icons/AppXIcon"
import AppLoader from "~/demo/components/AppLoader"
import AppAccordion from "~/components/AppAccordion"
import AppSearchForm from "~/demo/components/AppSearchForm"
import AppFeaturedJobs from "~/demo/components/AppFeaturedJobs"
import AppSearchFilter from "~/components/Search/AppSearchFilter"
import AppSearchFilterChip from "~/components/Search/AppSearchFilterChip"
import AppJobSearchResults from "~/demo/components/AppJobSearchResults"
import AppCommuteSearchForm from "~/demo/components/AppCommuteSearchForm"
import AppGoogleTalentSearchProvider from "~/components/Search/Providers/AppGoogleTalentSearchProvider"

export default {
    components: {
        App404,
        AppXIcon,
        AppModal,
        AppLoader,
        AppAccordion,
        AppSearchForm,
        AppSearchFilter,
        AppFeaturedJobs,
        AppJobSearchResults,
        AppSearchFilterChip,
        AppCommuteSearchForm,
        AppGoogleTalentSearchProvider,
        AppLoadMore: () => import("~/components/Pagination/AppLoadMore"),
        AppPagination: () => import("~/components/Pagination/AppPagination"),
        AppSimplePagination: () =>
            import("~/components/Pagination/AppSimplePagination"),
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

<static-query>
query {
    metadata {
        paginationType,
        siteName,
    }
}
</static-query>
