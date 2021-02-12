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
                Back to Job Listings
            </span>
        </g-link>

        <div class="bg-gray-300 mt-6 mb-8 mx-2 p-12">
            <div class="mx-w-sm mx-auto text-center">
                <h1 class="font-bold text-4xl text-black">
                    {{ job.title }} has expired.
                </h1>

                <div class="text-black text-base font-bold mb-2">
                    {{ job.location_exact }}
                </div>
            </div>
        </div>
        <div
            class="min-h-screen text-center max-w-screen-md mb-8 mx-4 md:mx-auto job-details-content"
        >
            <AppSimilarJobs
                :siteConfig="$siteConfig"
                :guid="job.guid"
                :title="job.title"
                :location="job.location_exact"
            />
        </div>
        <script type="application/ld+json">
            {{ jsonLd }}
        </script>
    </div>
</template>

<script>
import AppSimilarJobs from "~/components/AppSimilarJobs"

export default {
    name: "AppJobExpired",
    components: {
        AppSimilarJobs,
    },
    metaInfo() {
        return {
            title: this.job ? this.job.title : null,
            meta: [
                {name: "description", content: "only the best jobs"},
                {rel: "preconnect", href: "https://microsites.dejobs.org/"},
            ],
        }
    },
    props: {
        job: {
            type: Object,
            required: true,
        },
    },
    computed: {
        jsonLd() {
            return JSON.stringify({
                "@context": "http://schema.org",
                "@type": "JobPosting",
                "employmentType": "Paid Work",
                "title": this.job.title,
                "datePosted": this.job.date_added,
                "description": this.job.company_exact,
                "identifier": {
                    "@type": "PropertyValue",
                    "name": this.job.company_exact,
                    "value": this.job.reqId,
                },
                "hiringOrganization": {
                    "@type": "Organization",
                    "name": this.job.company_exact,
                },
                "jobLocation": {
                    "@type": "Place",
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": this.job.city,
                        "addressRegion": this.job.state,
                        "addressCountry": {
                            "@type": "Country",
                            "name": this.job.country_short_exact,
                        },
                    },
                },
                "validThrough": this.job.deleted_at,
            })
        },
    },
}
</script>
