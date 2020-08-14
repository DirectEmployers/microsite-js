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
                    @setResult="submitSearchForm('location')"
                />
            </div>
            <div class="search-form__section">
                <label for="location" class="form__label">
                    Search by location
                </label>
                <div :class="{ 'form__input-group': supported['geolocation'] }">
                    <input
                        id="location"
                        name="location"
                        type="text"
                        @keyup.enter="submitSearchForm"
                        v-model="input.location"
                        placeholder="Type city or state"
                        class="form__input"
                    />
                    <button
                        @click="getUserCoordinates"
                        v-show="supported['geolocation']"
                        type="button"
                        aria-label="Your location"
                        style="background-color: black"
                        class="search-form__user-location form__input-addon"
                        :class="{
                            hidden: !supported['geolocation'],
                        }"
                    >
                        <img
                            width="18px"
                            src="https://dn9tckvz2rpxv.cloudfront.net/img/radius-search2.svg"
                            alt="Radius Icon"
                            :class="{ hidden: !supported['geolocation'] }"
                        />
                    </button>
                </div>

                <div
                    v-if="hasLocationInput"
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
                        :disabled="!hasLocationInput"
                    >
                        <option
                            :key="option.value"
                            :value="option.value"
                            v-for="option in [
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
            <div
                class="search-form__button-wrapper"
            >
                <button class="button">
                    Find Jobs
                </button>
            </div>
        </div>
    </form>
</template>

<script>
import AppAutocompleteInput from "~/components/Form/AppAutocompleteInput"
import { TitleCompleteService } from "~/services/api/search"
export default {
    name: "SearchForm",
    components: {
        AppAutocompleteInput,
    },
    props: [
        "submitSearchForm",
        "input",
        "supported",
        "getUserCoordinates",
    ],
    computed: {
        hasLocationInput() {
            return this.input.coords || this.input.location
        },
    },
    data: () => ({
        TitleCompleteService,
    }),
}
</script>
