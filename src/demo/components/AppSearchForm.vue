<template>
    <form @submit.prevent="submitSearchForm">
        <div class="search-form__wrapper">
            <div class="search-form__section">
                <AppAutocompleteInput
                    ref="q"
                    v-model="input.q"
                    :site-config="$siteConfig"
                    label="Search by keyword"
                    placeholder="Enter keywords"
                    aria-label="Search by keyword"
                    autocapitalize="off"
                    :query="TitleCompleteService"
                    @setResult="submitSearchForm"
                />
            </div>
            <div class="search-form__section">
                <div class="search-form__location-autocomplete">
                    <AppAutocompleteInput
                        ref="location"
                        v-model="input.location"
                        @input="input.coords=''"
                        label="Where"
                        placeholder="Type city or state"
                        aria-label="Type city or state"
                        autocapitalize="off"
                        :query="LocationCompleteService"
                        @setResult="submitSearchForm"
                    />
                    <div class="form__input-group">
                        <AppGeoLocation class="form__input-addon" @getCoords="setLocationFromGeo"/>
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
                        v-model="input.r"
                        class="search-form__radius form__input"
                        :disabled="!shouldShowRadiusInput"
                    >
                        <option
                            :key="option.value"
                            :value="option.value"
                            v-for="option in [
                                { display: 'Exact Location Only', value: '' },
                                { display: 'Within 25 miles', value: 25 },
                                { display: 'Within 35 miles', value: 35 },
                                { display: 'Within 50 miles', value: 50 },
                                { display: 'Within 100 miles', value: 100 },
                            ]"
                        >
                            {{ option.display }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="search-form__section" v-if="source == 'solr'">
                <AppAutocompleteInput
                    v-model="input.moc"
                    ref="moc"
                    label="Search by MOC code"
                    placeholder="Enter MOC code"
                    aria-label="Search by MOC code"
                    autocapitalize="off"
                    :query="MOCCompleteService"
                    @setResult="submitSearchForm"
                />
            </div>
            <div class="search-form__button-wrapper">
                <button class="button">
                    Find Jobs
                </button>
            </div>
        </div>
    </form>
</template>

<script>
import AppAutocompleteInput from "~/components/Form/AppAutocompleteInput"
import AppSearchProvider from "~/components/Search/AppSearchProvider"
import AppGeoLocation from "~/components/Search/AppGeoLocation"
import {
    TitleCompleteService,
    MOCCompleteService,
    LocationCompleteService,
} from "~/services/search"

export default {
    name: "SearchForm",
    components: {
        AppAutocompleteInput,
        AppGeoLocation
    },
    props:{
        input: {
            type: Object,
            required: false,
            default: ()=>{ return {} }
        },
        source:{
            type: String,
            required: true
        }, 
        submitSearchForm: {
            type: Function,
            required: true
        }
    },
    computed: {
        shouldShowRadiusInput() {
            return this.input.coords || this.input.location
        },
    },
    methods:{
        setLocationFromGeo(coords){
            this.input.location = "Your Location"
            this.input.coords = coords
        }
    },
    data: () => ({
        TitleCompleteService,
        MOCCompleteService,
        LocationCompleteService,
    }),
}
</script>