<template>
    <GmapMap
        :zoom="4"
        ref="map"
        :site-config="$siteConfig"
        :center="{lat: 35, lng: -94}"
        style="width: 100%; height: 500px"
        :options="{styles: styles}"
    >
        <section v-if="loaded">
            <section :key="baseIndex" v-for="(base, baseIndex) in bases">
                <GmapMarker
                    :clickable="true"
                    :position="{lat: base.coords[0], lng: base.coords[1]}"
                    @mouseout="currentActiveWindowIndex = null"
                    @mouseover="currentActiveWindowIndex = baseIndex"
                    :icon="{
                        url: getBranchLogoSrc(base.branch),
                        scaledSize: new google.maps.Size(25, 25),
                    }"
                    @click="clickedBase(base)"
                ></GmapMarker>
                <GmapInfoWindow
                    :position="{lat: base.coords[0], lng: base.coords[1]}"
                    @click="clickedBase(base)"
                    :opened="currentActiveWindowIndex == baseIndex"
                    :options="{
                        pixelOffset: {
                            width: 0,
                            height: -35,
                        },
                    }"
                >
                    <div
                        class="flex flex-col items-center justify-center py-4 font-bold "
                    >
                        {{ base.display }} ({{ base.value }} Jobs)
                    </div>
                </GmapInfoWindow>
            </section>
        </section>
    </GmapMap>
</template>

<script>
import {militaryMapService} from "../../services/search"
import militaryExampleConfig from "~/configs/militaryExample"

export default {
    async mounted() {
        await this.$gmapApiPromiseLazy()

        militaryMapService({}, militaryExampleConfig).then((r) => {
            this.bases = r.data
            this.loaded = true
        })
    },
    data() {
        return {
            loaded: false,
            currentActiveWindowIndex: null,
            bases: [],
            styles: [
                {
                    featureType: "administrative",
                    elementType: "labels.text.fill",
                    stylers: [{color: "#c6c6c6"}],
                },
                {
                    featureType: "landscape",
                    elementType: "all",
                    stylers: [{color: "#f2f2f2"}],
                },
                {
                    featureType: "poi",
                    elementType: "all",
                    stylers: [{visibility: "off"}],
                },
                {
                    featureType: "road",
                    elementType: "all",
                    stylers: [{saturation: -100}, {lightness: 55}],
                },
                {
                    featureType: "road.highway",
                    elementType: "all",
                    stylers: [{visibility: "simplified"}],
                },
                {
                    featureType: "road.highway",
                    elementType: "geometry.fill",
                    stylers: [{color: "#ffffff"}],
                },
                {
                    featureType: "road.arterial",
                    elementType: "labels.icon",
                    stylers: [{visibility: "off"}],
                },
                {
                    featureType: "transit",
                    elementType: "all",
                    stylers: [{visibility: "off"}],
                },
                {
                    featureType: "water",
                    elementType: "all",
                    stylers: [{color: "#dde6e8"}, {visibility: "on"}],
                },
            ],
        }
    },
    computed: {
        google() {
            return google
        },
    },
    methods: {
        getBranchLogoSrc(branch) {
            switch (branch) {
                case "Army Guard":
                    return "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Seal_of_the_United_States_Army_National_Guard.svg/220px-Seal_of_the_United_States_Army_National_Guard.svg.png"
                case "Army":
                    return "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Mark_of_the_United_States_Army.svg/600px-Mark_of_the_United_States_Army.svg.png"
                case "Air Force":
                    return "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Mark_of_the_United_States_Air_Force.svg/1024px-Mark_of_the_United_States_Air_Force.svg.png"
                case "Marine Corps":
                    return "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Seal_of_the_United_States_Marine_Corps.svg/1024px-Seal_of_the_United_States_Marine_Corps.svg.png"
                case "Navy":
                    return "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Emblem_of_the_United_States_Navy.svg/1200px-Emblem_of_the_United_States_Navy.svg.png"
            }
        },
        clickedBase(base) {
            this.$router.push({
                path: base.link,
            })
        },
    },
}
</script>
