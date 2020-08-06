<template>
    <div class="max-w-screen-xl mx-auto w-full pt-4 lg:px-6">
        <g-link to="/jobs" class="pb-2">
            <svg
                class="inline"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                width="36"
            >
                <path
                    d="M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z"
                />
            </svg>
            <span class="uppercase text-m font-bold align-middle">
                Back to Job Search
            </span>
        </g-link>

        <div class="bg-gray-300 mt-6 mb-8 mx-2 p-12">
            <div class="mx-w-sm mx-auto text-center">
                <h1 class="montserrat text-4xl text-black font-bold">
                    {{ job.getTitle() }}
                </h1>

                <div class="text-black text-base font-bold mb-2">
                    {{ job.getLocation() }}
                </div>
            </div>
        </div>

        <div class="min-h-screen max-w-screen-md mb-8 mx-4 md:mx-auto job-details-content">
            <AppJobDescription
                :html="job.getHtmlDescription()"
                :lookupClass="'job-description-amp-qualifications'"
            >
            </AppJobDescription>
        </div>

        <AppSimilarJobs :job="job" />

        <script type="application/ld+json">{{ jsonLd }}</script>
    </div>
</template>
<style lang="scss">
    .job-detail-link {
        @apply uppercase font-bold border-b border-gold;
    }
</style>
<script>
import AppYoutube from "~/components/AppYoutube"
import AppJobDescription from "~/components/AppJobDescription"
import AppSimilarJobs from "~/demo/components/AppSimilarJobs"

export default {
    name: "AppJob",
    metaInfo() {
        return {
            title: this.job ? this.job.getTitle() : null,
            meta: [
                { name: "description", content: "only the best jobs" },
                { rel: "preconnect", href: "https://microsites.dejobs.org/" }
            ],
        }
    },
    props: {
        job: {
            type: Object,
            required: true,
        },
    },
    components: {
        AppJobDescription,
        AppYoutube,
        AppSimilarJobs,
    },
    computed:{
        jsonLd(){
            return JSON.stringify(this.job.jsonLd())
        }
    }
}
</script>
