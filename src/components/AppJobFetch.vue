<script>
import { kebabCase } from "lodash"
import { getJob } from "../services/cdn/job"
import SolrJob from "../services/api/drivers/job/solr"

export default {
    data() {
        return {
            job: null,
            error: null,
            pending: true,
            resolved: null,
        }
    },
    created() {
        this.fetchJob()
    },
    methods: {
        async fetchJob() {
            this.status({ error: false, pending: true })

            let { location, title, guid } = this.$route.params

            try {
                const { data } = await getJob(guid)
                const locationSlug = kebabCase(data.location)

                // check if this is the proper url for the job
                if (locationSlug !== location || data.title_slug !== title) {
                    window.location.replace(
                        `/${locationSlug}/${data.title_slug}/${guid}/job`
                    )
                } else {
                    this.job = new SolrJob(data)
                    this.status({ resolved: true })
                }
            } catch (error) {
                this.status({
                    error,
                    resolved: false,
                })
            }
        },
        status({ error = null, pending = false, resolved = null }) {
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
    render() {
        return this.$scopedSlots.default({
            status: {
                error: this.error,
                pending: this.pending,
                resolved: this.resolved,
            },
            job: this.job,
        })
    },
}
</script>
