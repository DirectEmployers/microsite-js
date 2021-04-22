<template>
    <GmapMap
        :zoom="4"
        ref="map"
        :site-config="queryConfig"
        :center="{
            lat:39.598888110432426,
            lng:-100.74267721459391
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
                icon="https://d12wqovxet6953.cloudfront.net/jobmap/images/csc.png"
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
                <div class="flex flex-col font-bold justify-center items-center">
                    {{ place.name }}
                </div>
                <p v-html="place.address"></p>
                <span class="font-bold" v-if="place.total_near_jobs">{{ place.total_near_jobs }}</span>
            </GmapInfoWindow>
        </section>
    </GmapMap>
</template>
<script>
import {searchService} from '../../services/search'
export default {
    created(){
        this.places.forEach((place)=>{
            searchService({ location: place.locationExact }, this.queryConfig).then((r)=>{
                let total = r.data.pagination.total
                if(total > 0){
                    place.total_near_jobs = `Total Jobs: ${total}`
                }
            })
        })
    },
    data() {
        return {
            queryConfig: {...this.$siteConfig, ...{buids: [41179]}},
            currentActiveWindowIndex: null,
            places: [
                {
                    name: "CSC Corporate Office",
                    position: {
                        lat:32.91196909880771,
                        lng:-96.98847555951528,
                    },
                    locationExact: 'Irving, TX',
                    address: "3201 W. Royal Lane, Suite 100 <br/> Irving, TX"
                },
                {
                    name: "Orlando",
                    position: {
                        lat:28.47823499521864,
                        lng:-81.23098357361658
                    },
                    locationExact: 'Orlando, FL',
                    address: "10850 Lee Vista Blvd., Suite 101 <br/> Orlando, FL 32829"
                },
                {
                    name: 'San Antonio',
                    locationExact: "San Antonio, TX",
                    position:{
                        lat: 29.566522049276823,
                        lng: -98.60031797307185,
                    },
                    address: '12831 Cogburn <br/> San Antonio, TX 78249'
                },
                {
                    name: "Coppell",
                    position: {
                        lat: 32.95564601572313,
                        lng: -97.03013217115816
                    },
                    locationExact: 'Coppell, TX',
                    address: "1204 W Bethel Rd,<br/> Coppell, TX 75099"
                },

            ],
        }
    },
    methods: {
        clickedPlace(place) {
            alert(`You clicked on custom place marker: ${place.name}:${place.address}`)
        },
    },
}
</script>
