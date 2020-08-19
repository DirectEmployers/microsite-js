<template>
    <Layout>
        <AppSearchProvider
            class="my-6"
            :site-config="$siteConfig"
            v-slot="{
                jobs,
                filters,
                input,
                sort,
                submitSearchForm,
                supported,
                getUserCoordinates,
                getFilterOptions,
                status,
                meta,
                pagination,
            }"
        >
            <Loader v-if="status.loading" />

            <section v-else>
                <div class="mx-4">
                    <SearchForm
                        :input="input"
                        :submitSearchForm="submitSearchForm"
                        :supported="supported"
                        :getUserCoordinates="getUserCoordinates"
                    />
                </div>
                <div class="flex flex-col lg:flex-row">
                    <div class="mx-4 w-full lg:w-1/2">
                        <h3 v-if="status.error">
                            Unable to load jobs...
                        </h3>
                        <section v-else-if="meta.hasJobs" class="jobs">
                            <h3 class="text-3xl font-bold">
                                Search Results
                            </h3>
                            <div
                                v-if="meta.hasJobs"
                                id="total-jobs"
                                class="text-2xl"
                            >
                                {{ pagination.total }} jobs found
                            </div>
                            <div
                                class="hover:bg-gray-300"
                                :key="index"
                                v-for="(job, index) in jobs"
                            >
                                <g-link :to="job.getDetailUrl()" class="mb-2">
                                    <h3 class="font-bold text-xl">
                                        {{ job.getTitle() }}
                                    </h3>

                                    <h3 class="font-bold text-lg">
                                        Requisition ID: {{ job.getReqId() }}
                                    </h3>

                                    <h3 class="text-md">
                                        {{ job.getLocation() }}
                                    </h3>
                                    <div
                                        class="job-listing__commute-time"
                                        v-if="job.hasCommuteInfo()"
                                    >
                                        Estimated Travel:
                                        {{ job.getCommuteTime() }} minutes.
                                    </div>
                                    <hr />
                                </g-link>
                            </div>
                            <AppPagination
                                v-if="!status.loading"
                                :current-page="pagination.page"
                                :total-records="pagination.total"
                                :total-pages="pagination.total_pages"
                            />
                        </section>

                        <h3 class="font-bold text-lg" v-else-if="!meta.hasJobs">
                            No results found...
                        </h3>
                    </div>
                    <div class="lg:ml-4 w-full lg:w-2/5">
                        <h3 class="font-bold text-4xl">Search Filters:</h3>

                        <div class="m-2" v-if="meta.selectedFilters.length">
                            <h3 class="font-bold text-xl">
                                Current Search Criteria
                            </h3>

                            <AppSearchFilterChip
                                v-for="(filter, index) in meta.selectedFilters"
                                :key="index"
                                :display="filter.display"
                                :parameter="filter.parameter"
                            ></AppSearchFilterChip>

                            <AppSearchFilterChip
                                display="Clear All"
                                parameter="*"
                            ></AppSearchFilterChip>
                        </div>

                        <AppAccordion>
                            <template v-slot:header>
                                <h3 class="font-bold text-xl">
                                    Sorted By
                                    <strong>
                                        {{ titleCase(meta.sort.active) }}
                                    </strong>
                                </h3>
                            </template>

                            <ul>
                                <li
                                    class="cursor-pointer"
                                    @click="sort(option)"
                                    v-for="(option, index) in meta.sort.options"
                                    :key="index"
                                >
                                    <span v-if="shouldShowSortOption(option, input)">{{ titleCase(option) }}</span>
                                </li>
                            </ul>
                        </AppAccordion>

                        <AppSearchFilter
                            :key="index"
                            :config-filter="configFilter"
                            :input="input"
                            v-for="(configFilter, index) in $siteConfig.filters"
                            :options="getFilterOptions(configFilter)"
                        >
                            <template v-slot:display="{ isOpen }">
                                <h3
                                    class="search__filter-display"
                                    :class="{
                                        'search__filter-display--active': isOpen,
                                    }"
                                >
                                    Filter By
                                    <strong>{{ configFilter.display }}</strong>
                                </h3>
                            </template>
                            <template v-slot:option="{ option }">
                                <span class="text-xl">
                                    {{ option.display }} ({{ option.value }})
                                </span>
                            </template>
                        </AppSearchFilter>

                        <CommuteSearchForm
                            :input="input"
                            v-if="meta.source != 'solr'"
                            :submitSearchForm="submitSearchForm"
                            :getUserCoordinates="getUserCoordinates"
                        />
                    </div>
                </div>
            </section>
        </AppSearchProvider>
    </Layout>
</template>
<script>
import AppSearchProvider from "~/components/Search/AppSearchProvider"
import { blank } from "~/services/helpers"
import AppPagination from "~/components/AppPagination"
import AppAccordion from "~/components/AppAccordion"
import CommuteSearchForm from "~/demo/components/CommuteSearchForm"
import SearchForm from "~/demo/components/SearchForm"
import Loader from "~/demo/components/Loader"
import AppSearchFilter from "~/components/Search/AppSearchFilter"
import AppSearchFilterChip from "~/components/Search/AppSearchFilterChip"
import { toLower, startCase } from "lodash"

export default {
    components: {
        AppSearchProvider,
        AppPagination,
        CommuteSearchForm,
        AppAccordion,
        AppSearchFilterChip,
        SearchForm,
        AppSearchFilter,
        Loader,
    },
    methods: {
        titleCase(str) {
            return startCase(toLower(str))
        },
        shouldShowSortOption(option, input){
            const hasLocation = input.location || input.coords;

            if(option == 'distance' && !hasLocation){
                return false;
            }

            return true;
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
}
</script>