<template>
    <form @submit.prevent="search">
        <div class="search-form__wrapper">
            <div class="search-form__section">
                <AppAutocompleteInput
                    ref="q"
                    v-model="form.q"
                    label="Search by keyword"
                    placeholder="Enter keywords"
                    aria-label="Search by keyword"
                    autocapitalize="off"
                    :query="TitleCompleteService"
                    :queryConfig="{
                        source: $siteConfig.source,
                        buids: $siteConfig.buids,
                        project_id: $siteConfig.project_id,
                        tenant_uuid: $siteConfig.tenant_uuid,
                        company_uuids: $siteConfig.company_uuids,
                    }"
                    @setResult="search"
                />
            </div>
            <div class="search-form__section">
                <div class="search-form__location-autocomplete">
                    <AppAutocompleteInput
                        ref="location"
                        v-model="form.location"
                        @input="typedLocation"
                        label="Where"
                        placeholder="Type city or state"
                        aria-label="Type city or state"
                        autocapitalize="off"
                        :query="LocationCompleteService"
                        @setResult="search"
                    />
                    <div class="form__input-group">
                        <AppGeoLocation
                            class="form__input-addon"
                            @getCoords="setLocationFromGeo"
                        />
                    </div>
                </div>
                <div
                    v-if="shouldShowRadiusInput"
                    class="search-form__location-input"
                >
                    <label for="r" class="search-form__miles form__label">
                        Miles:
                    </label>
                    <select
                        id="r"
                        name="r"
                        v-model="form.r"
                        class="search-form__radius form__input"
                        :disabled="!shouldShowRadiusInput"
                    >
                        <option
                            :key="option.value"
                            :value="option.value"
                            v-for="option in [
                                {display: 'Exact Location Only', value: ''},
                                {display: 'Within 25 miles', value: 25},
                                {display: 'Within 35 miles', value: 35},
                                {display: 'Within 50 miles', value: 50},
                                {display: 'Within 100 miles', value: 100},
                            ]"
                        >
                            {{ option.display }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="search-form__section" v-if="source == 'solr'">
                <AppAutocompleteInput
                    v-model="form.moc"
                    ref="moc"
                    label="Search by MOC code"
                    placeholder="Enter MOC code"
                    aria-label="Search by MOC code"
                    autocapitalize="off"
                    :query="MOCV2CompleteService"
                    @setResult="search"
                />
            </div>
            <div class="search-form__button-wrapper">
                <button class="button">Find Jobs</button>
            </div>
        </div>
    </form>
</template>

<script>
import AppAutocompleteInput from "~/components/Form/AppAutocompleteInput"
import AppGeoLocation from "~/components/Search/AppGeoLocation"
import {
    TitleCompleteService,
    MOCV2CompleteService,
    LocationCompleteService,
} from "~/services/search"

export default {
    name: "AppSearchForm",
    components: {
        AppAutocompleteInput,
        AppGeoLocation,
    },
    props: {
        input: {
            type: Object,
            required: false,
            default: () => {
                return {}
            },
        },
        isCommuteSearch: {
            required: false,
            default: false,
            type: Boolean,
        },
        source: {
            type: String,
            required: true,
        },
    },
    computed: {
        shouldShowRadiusInput() {
            if (this.isCommuteSearch) {
                return false
            }
            return this.form.coords || this.form.location
        },
    },
    methods: {
        search() {
            this.$emit("search", this.form)
        },
        typedLocation() {
            if (this.input.location) {
                this.input.coords = ""
            }
        },
        setLocationFromGeo(coords) {
            this.form.location = "Your Location"
            this.form.coords = coords
        },
        googleAutocompleteSelected(location, coords) {
            this.form.commuteLocation = location
            this.form.coords = coords
            this.search()
        },
    },
    data: function () {
        return {
            TitleCompleteService,
            MOCV2CompleteService,
            LocationCompleteService,
            apiKey: process.env.GRIDSOME_GOOGLE_MAPS_API_KEY,
            form: {
                q: this.input.q,
                r: this.input.r,
                moc: this.input.moc,
                cords: this.input.cords,
                location: this.input.location,
            },
        }
    },
}
</script>