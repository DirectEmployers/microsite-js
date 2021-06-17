<template>
    <GmapMap
        :zoom="4"
        ref="map"
        :site-config="$siteConfig"
        :center="{lat: 35, lng: -94}"
        style="width: 100%; height:500px;"
        :options="{disableDefaultUI: true}"
    >
        <section v-if="loaded">
            <section :key="baseIndex" v-for="(base, baseIndex) in bases">
                <GmapMarker
                    :clickable="true"
                    :position="{lat: base.centroid[0], lng: base.centroid[1]}"
                    @mouseout="currentActiveWindowIndex = null"
                    @mouseover="currentActiveWindowIndex = baseIndex"
                    :icon="{
                        url: getBranchLogoSrc(base.branch),
                        scaledSize: new google.maps.Size(45,45),
                    }"
                    @click="clickedBase(base)"


                ></GmapMarker>
                <GmapInfoWindow
                    :position="{lat: base.centroid[0], lng: base.centroid[1]}"
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
                        class="flex flex-col font-bold justify-center items-center"
                    >
                        {{ base.name }}
                    </div>
                </GmapInfoWindow>
            </section>
        </section>
    </GmapMap>
</template>
<script>
import {searchService} from "../../services/search"

export default {
    async created() {
        await this.$gmapApiPromiseLazy()

        this.loaded = true;
    },
    data() {
        return {
            loaded: false,
            currentActiveWindowIndex: null,
            bases: [
                {
                    "id": 76,
                    "name": "NG Bergstrom - (Abia)",
                    "country": "United States",
                    "state": "Texas",
                    "radius": 10,
                    "coords": [30.1763, -97.6721],
                    "centroid": [30.17532, -97.67164],
                    "branch": "Army Guard",
                },
                {
                    "id": 271,
                    "name": "NG Rio Rancho TS",
                    "country": "United States",
                    "state": "New Mexico",
                    "radius": 10,
                    "coords": [35.37306, -106.65191],
                    "centroid": [35.37235, -106.65263],
                    "branch": "Army Guard",
                },
                {
                    "id": 185,
                    "name": "NG Helena Aviation RC- AASF- C12",
                    "country": "United States",
                    "state": "Montana",
                    "radius": 10,
                    "coords": [46.60847, -111.97104],
                    "centroid": [46.6089, -111.97189],
                    "branch": "Army Guard",
                },
                {
                    "id": 766,
                    "name": "Holston Army Ammunition Plant",
                    "country": "United States",
                    "state": "Tennessee",
                    "radius": 10,
                    "coords": [36.52388, -82.65755],
                    "centroid": [36.52906, -82.62839],
                    "branch": "Army",
                },
                {
                    "id": 277,
                    "name": "Runkle Stagefield AL",
                    "country": "United States",
                    "state": "Alabama",
                    "radius": 10,
                    "coords": [31.33983, -86.09164],
                    "centroid": [31.33915, -86.09155],
                    "branch": "Army",
                },
                {
                    "id": 437,
                    "name": "Des Moines IAP",
                    "country": "United States",
                    "state": "Iowa",
                    "radius": 10,
                    "coords": [41.54436, -93.66607],
                    "centroid": [41.54527, -93.66506],
                    "branch": "Air Force",
                },
                {
                    "id": 435,
                    "name": "Forbes Field ANG",
                    "country": "United States",
                    "state": "Kansas",
                    "radius": 10,
                    "coords": [38.96152, -95.68096],
                    "centroid": [38.95989, -95.68219],
                    "branch": "Air Force",
                },
                {
                    "id": 454,
                    "name": "Volk ANGB",
                    "country": "United States",
                    "state": "Wisconsin",
                    "radius": 10,
                    "coords": [43.93591, -90.25158],
                    "centroid": [43.93039, -90.25785],
                    "branch": "Air Force",
                },
                {
                    "id": 700,
                    "name": "Marine Corps Air Station Beaufort",
                    "country": "United States",
                    "state": "South Carolina",
                    "radius": 10,
                    "coords": [32.49172, -80.72306],
                    "centroid": [32.49944, -80.70182],
                    "branch": "Marine Corps",
                },
                {
                    "id": 674,
                    "name": "Syracuse MCRC",
                    "country": "United States",
                    "state": "New York",
                    "radius": 10,
                    "coords": [43.10005, -76.1238],
                    "centroid": [43.09945, -76.12034],
                    "branch": "Marine Corps",
                },
                {
                    "id": 511,
                    "name": "NAVPMOSSP Magna Utah",
                    "country": "United States",
                    "state": "Utah",
                    "radius": 10,
                    "coords": [40.67839, -112.0733],
                    "centroid": [40.68011, -112.06336],
                    "branch": "Navy",
                },
                {
                    "id": 507,
                    "name": "Holtville Carrier LS",
                    "country": "United States",
                    "state": "California",
                    "radius": 10,
                    "coords": [32.83964, -115.27181],
                    "centroid": [32.83816, -115.26943],
                    "branch": "Navy",
                },
                {
                    "id": 767,
                    "name": "Naval Base Kitsap – Keyport",
                    "country": "United States",
                    "state": "Washington",
                    "radius": 10,
                    "coords": [47.69744, -122.62125],
                    "centroid": [47.69725, -122.62165],
                    "branch": "Navy",
                },
            ],
        }
    },
    computed: {
        google(){
            return google
        }
    },
    methods: {
        getBranchLogoSrc(branch){
            switch(branch){
                case 'Army Guard':
                    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Seal_of_the_United_States_Army_National_Guard.svg/220px-Seal_of_the_United_States_Army_National_Guard.svg.png'
                case 'Army':
                    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Mark_of_the_United_States_Army.svg/600px-Mark_of_the_United_States_Army.svg.png'
                case 'Air Force':
                    return "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Mark_of_the_United_States_Air_Force.svg/1024px-Mark_of_the_United_States_Air_Force.svg.png"
                case 'Marine Corps':
                    return "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Seal_of_the_United_States_Marine_Corps.svg/1024px-Seal_of_the_United_States_Marine_Corps.svg.png"
                case 'Navy':
                    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Emblem_of_the_United_States_Navy.svg/1200px-Emblem_of_the_United_States_Navy.svg.png'
            }
        },
        clickedBase(base) {
            this.$router.push({
                path: '/jobs',
                query: {
                    location: base.state
                }
            })
        },
    },
}
</script>
