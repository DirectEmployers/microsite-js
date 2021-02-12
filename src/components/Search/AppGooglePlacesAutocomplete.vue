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
    updated() {
        this.initAutocomplete()
    },
    computed: {
        apiScriptUrl() {
            return `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=places`
        },
        placesApiLoaded() {
            return !!window?.google?.maps?.places
        },
    },
    methods: {
        appendPlacesScript() {
            if (process.isClient) {
                let script = document.createElement("script")
                script.setAttribute("src", this.apiScriptUrl)
                script.onload = this.initAutocomplete //setAttribute & addEventListener don't work for this... God only knows why
                document.head.appendChild(script)
            }
        },
        initAutocomplete() {
            const placeAutoComplete = new google.maps.places.Autocomplete(
                this.$refs.autocompleteInput
            )
            placeAutoComplete.addListener("place_changed", () => {
                const place = placeAutoComplete.getPlace()

                const lat = place?.geometry?.location.lat()
                const lon = place?.geometry?.location.lng()

                if (lat && lon) {
                    this.$emit(
                        "locationSelected",
                        place.formatted_address,
                        `${lat},${lon}`
                    )
                }
            })
        },
    },
}
</script>
