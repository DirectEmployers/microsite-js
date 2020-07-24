<script>
import { blank } from "../services/helpers"
import { cleanLocation } from "../services/api/jobs"
import { omitBy, clone, merge } from "lodash"

export default {
    props: {
        browseLocationText: {
            required: false,
            type: String,
            default: "Your Location",
        },
    },
    data: () => ({
        params: {
            q: "",
            r: 25,
            location: "",
            coords: null,
            sort: "relevance",
            searchType: "location",
        },
        supportsGeoLocation: true,
        jobs: [],
    }),
    created() {
        this.updateParams()
    },
    mounted() {
        this.checkGeoLocation()
    },
    watch: {
        //do a search anytime router qs changes.
        "$route.query"() {
            this.updateParams()
        },
        params: {
            handler(newParams) {
                //clear coords when we change location value.
                if (newParams.location != this.browseLocationText) {
                    newParams.coords = ""
                }

                this.$router.app.$emit("params.updated", newParams)
            },
            deep: true,
        },
    },
    computed: {
        hasLocationInput() {
            //This will need to change for solr because coords is always required for solr to do a search
            return this.params.location || this.params.coords
        },
    },
    methods: {
        getGeoLocation(done) {
            navigator.geolocation.getCurrentPosition(position => {
                var lat = position.coords.latitude.toFixed(6)

                var lon = position.coords.longitude.toFixed(6)

                var coords = lat + "," + lon

                if (typeof done == "function") {
                    done(coords)
                }
            })
        },
        useUserLocation() {
            this.getGeoLocation(coords => {
                this.params.coords = coords
                this.params.location = this.browseLocationText
            })
        },
        updateParams() {
            this.params = merge(this.params, clone(this.$route.query))

            if (this.params.location) {
                this.params.location = cleanLocation(this.params.location)
            }
        },
        submitForm() {
            this.params.page = 1
            this.params.searchType = "location"
            this.params.commuteMethod = ""
            this.params.travelDuration = ""
            this.params.roadTraffic = ""
            this.params.commuteLocation = ""

            this.$router
                .push({
                    path: "/jobs",
                    query: omitBy(this.params, blank),
                })
                .catch(err => {})
        },
        checkGeoLocation() {
            if (process.isClient && typeof window !== "undefined") {
                this.supportsGeoLocation = "geolocation" in window.navigator
            } else {
                this.supportsGeoLocation = false
            }
        }
    },
    render() {
        return this.$scopedSlots.default({
            hasLocationInput: this.hasLocationInput,
            params: this.params,
            submitForm: this.submitForm,
            supportsGeoLocation: this.supportsGeoLocation,
            useUserLocation: this.useUserLocation,
        })
    },
}
</script>
