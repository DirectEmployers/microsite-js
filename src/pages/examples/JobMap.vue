<template>
    <AppJobMap
        :zoom="10"
        ref="map"
        :site-config="$siteConfig"
        :center="{
            lat: 39.890871125921926,
            lng: -86.26573238518627,
        }"
        map-styles="width: 100%; height:500px;"
    >
        <template>
            <section :key="index" v-for="(place, index) in places">
                <GmapMarker
                    :clickable="true"
                    :position="place.position"
                    @mouseout="currentActiveWindowIndex = null"
                    @mouseover="currentActiveWindowIndex = index"
                    @click="clickedPlace(place)"
                ></GmapMarker>
                <GmapInfoWindow
                    :position="place.position"
                    @click="clickedPlace(place)"
                    :opened="currentActiveWindowIndex == index"
                    :options="{
                        pixelOffset: {
                            width: 0,
                            height: -35,
                        },
                    }"
                >
                    <div class="flex flex-col justify-center items-center">
                        <img
                            :src="place.image"
                            width="100px"
                            height="100px"
                            :alt="place.name"
                        />
                        {{ place.name }}
                    </div>
                </GmapInfoWindow>
            </section>
        </template>
        <template v-slot:footer="{done, error}">
            <div v-if="done && error" class="bg-gray-300 text-center p-64">
                Failed To Load Job Map.
            </div>
        </template>
    </AppJobMap>
</template>
<script>
import AppJobMap from "~/components/Search/AppJobMap"

export default {
    components: {
        AppJobMap,
    },
    data() {
        return {
            currentActiveWindowIndex: null,
            places: [
                {
                    name: "Direct Employers",
                    image:
                        "https://directemployers.org/wp-content/uploads/brand-DE-500x200@2x.png",
                    position: {
                        lat: 39.890871125921926,
                        lng: -86.26573238518627,
                    },
                },
                {
                    name: "Eat Thai",
                    image:
                        "https://www.eatthai.co/uploads/b/b6b99070-6985-11ea-bbe9-ed36a03b21c7/logo.jpg",
                    position: {
                        lat: 39.91221210835374,
                        lng: -86.26157934368676,
                    },
                },
            ],
        }
    },
    methods: {
        clickedPlace(place) {
            alert(`You clicked on custom place marker: ${place.name}`)
        },
    },
}
</script>
