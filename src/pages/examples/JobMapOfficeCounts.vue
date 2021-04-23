<template>
    <GmapMap
        :zoom="4"
        ref="map"
        :site-config="$siteConfig"
        :center="{
            lat: 39.598888110432426,
            lng: -100.74267721459391,
        }"
        style="width: 100%; height:500px;"
        :options="{disableDefaultUI: true}"
    >
        <section :key="place.name" v-for="(place, placeIndex) in places">
            <GmapMarker
                :clickable="true"
                :position="place.position"
                @mouseout="currentActiveWindowIndex = null"
                @mouseover="currentActiveWindowIndex = placeIndex"
                icon="https://d12wqovxet6953.cloudfront.net/jobmap/images/sanford-health.png"
                @click="clickedPlace(place)"
            ></GmapMarker>
            <GmapInfoWindow
                :position="place.position"
                @click="clickedPlace(place)"
                :opened="currentActiveWindowIndex == placeIndex"
                :options="{
                    pixelOffset: {
                        width: 0,
                        height: -35,
                    },
                }"
            >
                <div
                    class="flex flex-col font-bold justify-center items-center"
                >
                    {{ place.name }}
                </div>
                <p>{{ place.location }}</p>
                <span class="font-bold" v-if="place.total_near_jobs">
                    {{ place.total_near_jobs }}
                </span>
            </GmapInfoWindow>
        </section>
    </GmapMap>
</template>
<script>
import {searchService} from "../../services/search"
import sanfordConfig from "~/configs/sanfordhealth"
export default {
    created() {
        this.places.forEach(place => {
            searchService(
                {
                    jobfunction: place.jobfunction,
                    location: `${place.position.lat},${place.position.lng}`,
                },
                sanfordConfig
            ).then(r => {
                let total = r.data.pagination.total
                if (total > 0) {
                    place.total_near_jobs = `Total Jobs: ${total}`
                }
            })
        })
    },
    data() {
        return {
            currentActiveWindowIndex: null,
            places: [
                {
                    jobfunction: "Nursing",
                    name: "Nursing Jobs",
                    position: {
                        lat: 42.7791745407101,
                        lng: -96.92934467394151,
                    },
                    location: "Vermillion, SD",
                },
                {
                    jobfunction: "Customer Support Services",
                    name: "Customer Support Services Jobs",
                    position: {
                        lat: 32.77556621844668,
                        lng: -96.80228425924868,
                    },
                    location: "Dallas, TX",
                },
                {
                    jobfunction: "Administrative Support",
                    name: "Administrative Support Jobs",
                    position: {
                        lat: 46.86456446736283,
                        lng: -96.72573763674964,
                    },
                    location: "Fargo, ND",
                },
            ],
        }
    },
    methods: {
        clickedPlace(place) {
            alert(
                `You clicked on custom place marker: ${place.name}:${place.address}`
            )
        },
    },
}
</script>
