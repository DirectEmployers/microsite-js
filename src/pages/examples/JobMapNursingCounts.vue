<template>
    <GmapMap
        :zoom="6"
        ref="map"
        :site-config="$siteConfig"
        :center="{
            lat: 44.70875801239996,
            lng: -96.27652374771256,
        }"
        style="width: 100%; height:500px;"
        :options="{disableDefaultUI: true}"
    >
        <section :key="placeIndex" v-for="(place, placeIndex) in places">
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
                    jobfunction: "Nursing",
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
                    name: "Nursing Jobs",
                    position: {
                        lat: 42.7791745407101,
                        lng: -96.92934467394151,
                    },
                    location: "Vermillion, SD",
                },
                {
                    name: "Nursing Jobs",
                    position: {
                        lat: 43.545205221236564,
                        lng: -96.7365618362979,
                    },
                    location: "Sioux Falls, SD",
                },
                {
                    jobfunction: "Nursing",
                    name: "Nursing Jobs",
                    position: {
                        lat: 46.86456446736283,
                        lng: -96.72573763674964,
                    },
                    location: "Fargo, ND",
                },
                {
                    jobfunction: "Nursing",
                    name: "Nursing Jobs",
                    position: {
                        lat: 44.70875801239996,
                        lng: -96.27652374771256,
                    },
                    location: "Canby, MN",
                },
                {
                    jobfunction: "Nursing",
                    name: "Nursing Jobs",
                    position: {
                        lat: 43.18160603394354,
                        lng: -95.85598582016961,
                    },
                    location: "Sheldon, IA",
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
