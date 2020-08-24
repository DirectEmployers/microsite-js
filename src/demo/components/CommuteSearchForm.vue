<template>
    <form @submit.prevent="submitSearchForm('commute')">
        <div class="commute-search">
            <h2 class="commute-search__header">Commute Options</h2>
            <div class="form__input-group form__input-group--stacked">
                <label for="commuteLocation" class="form__label">
                    Commute From
                </label>
                <input
                    id="commuteLocation"
                    class="form__input"
                    type="text"
                    ref="commuteLocationInput"
                    v-model="input.commuteLocation"
                />
            </div>
            <div class="form__input-group form__input-group--stacked">
                <label for="commuteMethod" class="form__label">
                    Transportation Type:
                </label>
                <select
                    id="commuteMethod"
                    v-model="input.commuteMethod"
                    class="form__input"
                >
                    <option value="DRIVING">Driving</option>
                    <option value="TRANSIT">Transit</option>
                    <option value="WALKING">Walking</option>
                </select>
                <div class="form__down-arrow">
                    ▼
                </div>
            </div>
            <div class="form__input-group form__input-group--stacked">
                <label for="travelDuration" class="form__label">
                    Max Travel Duration:
                </label>
                <select
                    id="travelDuration"
                    v-model="input.travelDuration"
                    class="form__input"
                >
                    <option value="900">15 minutes</option>
                    <option value="1800">30 minutes</option>
                    <option value="2700">45 minutes</option>
                    <option value="3600">1 hour</option>
                </select>
                <div class="form__down-arrow">
                    ▼
                </div>
            </div>
            <div class="form__input-group form__input-group--stacked">
                <label for="roadTraffic" class="form__label">
                    Traffic Density:
                </label>
                <select
                    id="roadTraffic"
                    v-model="input.roadTraffic"
                    class="form__input"
                >
                    <option value="TRAFFIC_FREE">Traffic Free</option>
                    <option value="BUSY_HOUR">Busy Hour</option>
                </select>
                <div class="form__down-arrow">
                    ▼
                </div>
            </div>
            <button
                :class="{
                    'button--disabled': !input.coords,
                }"
                :disabled="!input.coords"
                aria-label="Submit Commute Search"
                class="button"
            >
                Search
            </button>
        </div>
    </form>
</template>

<script>
import {  retry } from '~/services/helpers'
export default {
    name: "CommuteSearchForm",
    props: ["submitSearchForm", "input"],
    mounted() {
        retry(this.initAutocomplete)
    },
    methods: {
        initAutocomplete() {
            const placeAutoComplete = new google.maps.places.Autocomplete(
                this.$refs.commuteLocationInput
            )
            placeAutoComplete.addListener("place_changed", () => {
                const place = placeAutoComplete.getPlace()

                const geo = place.geometry

                if (geo) {
                    const lat = geo.location.lat()

                    const lon = geo.location.lng()

                    this.input.coords = lat + "," + lon

                    this.input.commuteLocation = place.formatted_address

                }
            })
        },
    },
}
</script>
