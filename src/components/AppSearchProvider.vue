<script>
import { blank } from "../services/helpers"
import { cleanLocation } from "../services/api/jobs"
import { omitBy, clone, merge, trim } from "lodash"

export default {
    props: {
        searchType: {
            type: String,
            default: "location",
            validator: (prop) => ["location", "commute"].includes(prop),
        },
        geoLocationInputText: {
            required: false,
            type: String,
            default: "Your Location",
        },
        submitUrl: {
            required: false,
            type: String,
            default: "/jobs",
        },
    },
    data() {
        return {
            jobs: [],
            supported: {
                geolocation: false,
            },
            input: {
                q: "",
                r: 25,
                location: "",
                coords: null,
                sort: "relevance",
                searchType: this.searchType,
                commuteMethod: "",
                travelDuration: "",
                roadTraffic: "",
                commuteLocation: "",
            },
        }
    },
    created() {
        this.syncInputFromParams()

        if(this.isResultsPage){

        }
    },
    mounted() {
        if (process.isClient) {
            this.supported["geolocation"] = "geolocation" in window.navigator
        }
    },
    computed:{
        isResultsPage(){
            let submitUrl = trim(this.submitUrl, '/');

            let current = trim(this.$route.path, '/');

            return `/${submitUrl}` == `/${current}`
        }
    },
    watch: {
        //any time query string changes, update component input.
        "$route.query"() {
            this.syncInputFromParams()
        },

        input: {
            handler(newIput, oldInput) {
                //clear coords when user changes location value.
                if (newIput.location != oldInput.location) {
                    newIput.coords = ""
                }

                this.$router.app.$emit("form.updated", newIput)
            },
            deep: true,
        },
    },
    methods: {
        hasInput(key) {
            return !blank(this.input[key])
        },

        getGeoLocation(done) {
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude.toFixed(6)

                let lon = position.coords.longitude.toFixed(6)

                let coords = lat + "," + lon

                if (typeof done == "function") {
                    done(coords)
                }
            })
        },

        getUserCoordinates() {
            this.getGeoLocation((coords) => {
                this.input.coords = coords
                this.input.location = this.geoLocationInputText
            })
        },

        syncInputFromParams() {
            this.input = merge(this.input, clone(this.$route.query))

            if (this.input.location) {
                this.input.location = cleanLocation(this.input.location)
            }
        },

        submitSearchForm() {
            this.input.page = 1
            this.input.searchType = "location"
            // this.input.commuteMethod = ""
            // this.input.travelDuration = ""
            // this.input.roadTraffic = ""
            // this.input.commuteLocation = ""

            this.$router
                .push({
                    path: this.submitUrl,
                    query: omitBy(this.input, blank),
                })
                .catch((err) => {})
        },
    },
    render() {
        return this.$scopedSlots.default({
            hasInput: this.hasInput,
            input: this.input,
            submitSearchForm: this.submitSearchForm,
            supported: this.supported,
            getUserCoordinates: this.getUserCoordinates,
        })
    },
}
</script>
