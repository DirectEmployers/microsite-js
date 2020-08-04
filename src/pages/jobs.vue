<template>
    <Layout>
        <AppSearchProvider
            class="mb-6"
            :site-config="$siteConfig"
            v-slot="{
                jobs,
                filters,
                input,
                submitSearchForm,
                supported,
                getUserCoordinates,
                status,
                meta,
                blank,
                pagination
            }"
        >
            <div class="mx-4">
                <SearchForm
                    :input="input"
                    :submitSearchForm="submitSearchForm"
                    :supported="supported"
                    :getUserCoordinates="getUserCoordinates"

                />
            </div>
            <div class="flex">
                <div class="mx-4 mt-16 w-full lg:w-1/2">
                    <Loader v-if="status.loading" />
                    <h3
                        v-else-if="status.error"
                    >
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
                                <h3 class="font-bold text-xl">{{ job.getTitle() }}</h3>

                                <h3 class="font-bold text-lg">Requistion ID: {{ job.getReqId() }}</h3>

                                <h3 class="text-md">{{ job.getLocation() }}</h3>
                                <div class="job-listing__commute-time" v-if="job.hasCommuteInfo()">
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

                    <h3
                        class="font-bold text-lg"
                        v-else-if="!meta.hasJobs"
                    >
                        No results found...
                    </h3>
                </div>
                <div class="lg:ml-4 w-full lg:w-2/5">
                    <AppFormFilters
                        v-if="!blank(filters)"
                        :site-config="$siteConfig"
                        :filter-data="filters"
                    />
                    <CommuteSearchForm
                        :input="input"
                        :submitSearchForm="submitSearchForm"
                        :getUserCoordinates="getUserCoordinates"
                    />
                </div>

            </div>
        </AppSearchProvider>
    </Layout>
</template>
<script>
import AppSearchProvider from "~/components/AppSearchProvider"
import { blank } from "~/services/helpers"
import AppPagination from "~/components/AppPagination"
import CommuteSearchForm from "~/demo/components/CommuteSearchForm"
import SearchForm from "~/demo/components/SearchForm"
import Loader from "~/demo/components/Loader"
import AppFormFilters from "~/components/GoogleTalent/AppFormFilters"

export default {
    components:{
        AppSearchProvider,
        AppPagination,
        CommuteSearchForm,
        SearchForm,
        AppFormFilters,
        Loader,
    },
    metaInfo: {
        title: "Jobs",
        meta: [
            {
                key: "description",
                name: "description",
                content: "only the best jobs"
            }
        ]
    }
}
</script>
