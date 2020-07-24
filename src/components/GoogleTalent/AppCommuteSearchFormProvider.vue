<script>
import { isEmpty, omitBy, clone, merge } from "lodash"
import { cleanLocation } from "../../services/api/jobs"

export default {
    props: {
        commuteMethodDefault: {
            type: String,
            default: "DRIVING"
        },
        travelDurationDefault: {
            type: String,
            default: "900"
        },
        roadTrafficDefault: {
            type: String,
            default: "TRAFFIC_FREE"
        },
    },
    data() {
        return {
            jobs: [],
            coords: null,
            params: {
                searchType: "commute",
                commuteLocation: "",
                coords: null,
                commuteMethod: this.commuteMethodDefault,
                travelDuration: this.travelDurationDefault,
                roadTraffic: this.roadTrafficDefault,
            },
            inputOptions: {
                commuteMethods: [
                    { display: "Driving", value: "DRIVING" },
                    { display: "Transit", value: "TRANSIT" },
                    { display: "Walking", value: "WALKING" },
                ],
                travelDurations: [
                    { display: "15 minutes", value: "900" },
                    { display: "30 minutes", value: "1800" },
                    { display: "45 minutes", value: "2700" },
                    { display: "1 hour", value: "3600" },
                ],
                trafficDensities: [
                    { display: "Traffic Free", value: "TRAFFIC_FREE" },
                    { display: "Busy Hour", value: "BUSY_HOUR" },
                ],
            },
        }
    },
    created() {
        this.updateParams()
    },
    watch: {
        //do a search anytime router qs changes.
        "$route.query"() {
            this.updateParams()
        },
        params: {
            handler(newParams) {
                this.$router.app.$emit("params.updated", newParams)
            },
            deep: true,
        },
    },
    mounted() {
        this.addGoogleAutocomplete()
    },
    methods: {
        updateParams() {
            this.params = merge(this.params, clone(this.$route.query))

            if (this.params.commuteLocation) {
                this.params.commuteLocation = cleanLocation(
                    this.params.commuteLocation
                )
            }
        },
        submitForm() {
            this.params.page = 1
            this.params.searchType = "commute"
            this.params.location = ""
            this.params.sort = ""

            if (this.params.coords) {
                this.$router
                    .push({
                        path: "/jobs",
                        query: omitBy(this.params, isEmpty),
                    })
                    .catch(err => {})
            }
        },
        addGoogleAutocomplete() {
            const placeAutoComplete = new google.maps.places.Autocomplete(
                this.$parent.$refs.searchInput
            )
            placeAutoComplete.addListener("place_changed", () => {
                const place = placeAutoComplete.getPlace()
                const geo = place.geometry
                if (geo) {
                    const lat = geo.location.lat()
                    const lon = geo.location.lng()
                    const coords = lat + "," + lon
                    this.params.coords = coords
                    this.params.commuteLocation = place.formatted_address
                }
            })
        },
    },
    render() {
        return this.$scopedSlots.default({
            params: this.params,
            submitForm: this.submitForm,
            inputOptions: this.inputOptions,
            addGoogleAutocomplete: this.addGoogleAutocomplete,
            getCommuteTime: this.getCommuteTime,
        })
    },
}
</script>
