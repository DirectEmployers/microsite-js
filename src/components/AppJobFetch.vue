<template>
    <ClientOnly>
        <section>
            <slot
                :status="{
                    error: error,
                    pending: pending,
                    resolved: resolved,
                }"
                :job="job"
            ></slot>
        </section>
    </ClientOnly>
</template>
<script>
import {kebabCase} from "lodash"
import {getJob} from "../services/cdn/job"
import {blank} from "../services/helpers"
import buildUrl from "axios/lib/helpers/buildURL"

export default {
    props: {
        guid: {
            type: String,
            required: false,
            default: null,
        },
        s3Folder: {
            required: true,
            type: String,
        },
    },
    data() {
        return {
            job: null,
            error: null,
            pending: true,
            resolved: null,
        }
    },
    created() {
        //if a guid was specified, fetch that
        if (this.guid) {
            this.fetchByGuid(this.guid)
            //otherwise assume we are on the job detail.
        } else {
            this.fetchJob()
        }
    },
    methods: {
        async fetchByGuid(guid) {
            this.status({error: false, pending: true})
            try {
                const {data} = await getJob(guid, this.s3Folder)
                this.job = data
                this.status({resolved: true})
            } catch (error) {
                this.status({
                    error,
                    resolved: false,
                })
            }
        },
        async fetchJob() {
            this.status({error: false, pending: true})

            let {location, title, guid} = this.$route.params

            try {
                const {data} = await getJob(guid, this.s3Folder)

                const locationSlug = kebabCase(data.location)
                const titleSlug = kebabCase(data.title_exact)

                // check if this is the proper url for the job
                if (locationSlug !== location || titleSlug !== title) {
                    let redirect = `/${locationSlug}/${data.title_slug}/${guid}/job`

                    if (!blank(this.$route.query)) {
                        redirect = buildUrl(redirect, this.$route.query)
                    }

                    window.location.replace(redirect)
                } else {
                    this.job = data
                    this.status({resolved: true})
                }
            } catch (error) {
                this.status({
                    error,
                    resolved: false,
                })
            }
        },
        status({error = null, pending = false, resolved = null}) {
            this.error = error
            this.pending = pending
            this.resolved = resolved
        },
    },
    watch: {
        "$route.params.guid"() {
            this.fetchJob()
        },
    },
}
</script>
