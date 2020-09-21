<script>
import { kebabCase } from "lodash"
import { getJob } from "../services/cdn/job"

export default {
    props:{
        guid: {
            type: String,
            required: false,
            default: null
        }
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
        if(this.guid){
            this.fetchByGuid(this.guid)
        //otherwise assume we are on the job detail.
        }else{
            this.fetchJob()
        }
    },
    methods: {
        async fetchByGuid(guid){
            this.status({ error: false, pending: true })
            try {
                const { data } = await getJob(guid)
                this.job = data
                this.status({ resolved: true })
            } catch (error) {
                this.status({
                    error,
                    resolved: false,
                })
            }

        },
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
                    this.job = data
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
