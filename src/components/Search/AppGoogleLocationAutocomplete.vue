<template>
    <input
        v-bind="$attrs"
        type="text"
        ref="autocompleteInput"
        :value="value"
        @input="$emit('input', $event.target.value)"
    />
</template>

<script>
import {get} from "lodash"
import {retry} from "../../services/helpers"
export default {
    props: {
        apiKey: {
            type: String,
            required: true,
        },
        value: String,
    },
    created() {
        if (!this.placesApiLoaded) {
            this.appendPlacesScript()
        }
    },
    mounted() {
        retry(this.initAutocomplete)
    },
    computed: {
        apiScriptUrl() {
            let key = this.apiKey

            return `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`
        },
        placesApiLoaded() {
            return typeof get(window, "google.maps.places") == "object"
        },
    },
    methods: {
        appendPlacesScript() {
            let script = document.createElement("script")

            script.setAttribute("src", this.apiScriptUrl)

            document.head.appendChild(script)
        },
        initAutocomplete() {
            const placeAutoComplete = new google.maps.places.Autocomplete(
                this.$refs.autocompleteInput
            )
            placeAutoComplete.addListener("place_changed", () => {
                const place = placeAutoComplete.getPlace()

                const geo = place.geometry

                if (geo) {
                    const lat = geo.location.lat()

                    const lon = geo.location.lng()

                    this.$emit(
                        "locationSelected",
                        place.formatted_address,
                        lat + "," + lon
                    )
                }
            })
        },
    },
}
</script>
