<template>
    <section>
        <GmapMap
            v-if="!error"
            v-bind="$attrs"
            :style="mapStyles"
            :zoom="positionZoom"
            :center="positionCenter"
            :options="jobMapOptions"
        >
            <GmapCluster v-bind="jobClusterOptions">
                <GmapMarker
                    :key="index"
                    :clickable="true"
                    :position="m.position"
                    @click="search(m.job)"
                    v-for="(m, index) in markers"
                    @mouseout="infoWindow.open = false"
                    @mouseover="setWindowInfo(m, index)"
                ></GmapMarker>
                <GmapInfoWindow
                    :opened="infoWindow.open"
                    :options="infoWindow.options"
                    :position="infoWindow.position"
                    @click="search(infoWindow.job)"
                ></GmapInfoWindow>
            </GmapCluster>
        </GmapMap>
        <slot name="footer" :error="error" :done="done"></slot>
    </section>
</template>
<script>
import omitBy from "lodash/omitBy"
import clone from "lodash/cloneDeep"
import {blank} from "../../services/helpers"
import {searchService, SOLR} from "../../services/search"
import GmapCluster from "gmap-vue/dist/components/cluster"
import GmapInfoWindow from "gmap-vue/dist/components/info-window"
export default {
    props: {
        searchData: {
            type: Object,
            required: false,
            default: () => {
                return {}
            },
        },
        siteConfig: {
            type: Object,
            required: false,
            default: () => {
                return {}
            },
        },
        mapStyles: {
            type: [Object, Array, String],
            required: false,
            default: () => {
                return {}
            },
        },
        mapOptions: {
            type: Object,
            required: false,
            default: () => {
                return {}
            },
        },
        clusterOptions: {
            type: Object,
            required: false,
            default: () => {
                return {}
            },
        },
    },
    components: {
        GmapCluster,
        GmapInfoWindow,
    },
    data() {
        let queryConfig = clone(this.siteConfig)
        let filters = clone(this.siteConfig.filters || [])
        // mark filters as not visible so search api doesnt calculate the options.
        filters.forEach(f => {
            f["visible"] = false
        })

        return {
            jobs: [],
            counts: {},
            done: false,
            markers: [],
            google: null,
            error: false,
            hasMore: true,
            positionZoom: this.$attrs.zoom,
            payload: clone(this.searchData),
            positionCenter: this.$attrs.center,
            queryConfig: {
                source: SOLR,
                buids: queryConfig.buids || [],
                tenant_uuid: queryConfig.tenant_uuid || null,
                company_uuids: queryConfig.company_uuids || [],
                filters: filters,
                force_filters: queryConfig.force_filters || [],
            },
            infoWindow: {
                open: false,
                position: null,
                currentIndex: null,
                options: {
                    content: "",
                    pixelOffset: {
                        width: 0,
                        height: -35,
                    },
                },
            },
        }
    },
    async created() {
        await this.$gmapApiPromiseLazy()
        let data = {
            ...this.payload,
            ...{page: 1, num_items: 200},
        }
        while (this.hasMore) {
            try {
                let response = await this.service(data)
                let {pagination, jobs} = response.data || {}
                this.addMarkers(jobs || [])
                this.done = !pagination.has_more_pages
                this.hasMore = !this.done
                data.page += 1
            } catch (err) {
                this.done = true
                this.error = err
            }
        }
        // if a location was given center to the first available job to give
        // a better center for the current search results ( TODO - find a better way to do this?)
        if (this.payload.location && this.jobs.length > 0) {
            this.positionCenter = this.parseGeoLocation(
                this.jobs[0].GeoLocation
            )
            this.positionZoom = 5
        }
    },
    computed: {
        jobMapOptions() {
            return {...{disableDefaultUI: true}, ...this.mapOptions}
        },
        jobClusterOptions() {
            return {
                ...{
                    "max-zoom": 5,
                    "zoom-on-click": true,
                    "image-path":
                        "https://de-microsites.s3.amazonaws.com/__shared__/images/google-maps/cluster",
                },
                ...this.clusterOptions,
            }
        },
    },
    methods: {
        service(data) {
            return searchService(data, this.queryConfig)
        },
        search(job) {
            let payload = omitBy(this.payload, (v, k) => blank(v))
            payload.page = 1
            payload.location = job.location_exact
            if(payload.r){
                payload.coords = job.GeoLocation
            }
            this.$router
                .push({
                    path: "/jobs",
                    query: payload,
                })
                .catch(err => {})
        },
        getJobWindowLabel(job) {
            let count = this.counts[job.location_exact] || 1
            let jobsLabel = "Jobs"
            if (count == 1) {
                jobsLabel = "Job"
            }
            return `${job.location_exact}: ${count} ${jobsLabel}`
        },
        makeMarker(job) {
            let coords = this.parseGeoLocation(job.GeoLocation)
            return new google.maps.Marker({
                position: new google.maps.LatLng(coords.lat, coords.lng),
                job: job,
            })
        },
        parseGeoLocation(geolocation) {
            if (blank(geolocation)) {
                return false
            }
            let coords = geolocation.split(",")
            return {
                lat: parseFloat(coords[0]),
                lng: parseFloat(coords[1]),
            }
        },
        addMarkers(jobs) {
            jobs.forEach(job => {
                if (job.GeoLocation) {
                    this.counts[job.location_exact] =
                        (this.counts[job.location_exact] || 0) + 1
                    this.jobs.push(job)
                    this.markers.push(this.makeMarker(job))
                }
            })
        },
        setWindowInfo(marker, index) {
            this.infoWindow.position = marker.position
            this.infoWindow.options.content = this.getJobWindowLabel(marker.job)

            //check if its the same marker that was selected if yes toggle
            if (this.infoWindow.currentIndex == index) {
                this.infoWindow.open = !this.infoWindow.open
            }

            //if different marker set infowindow to open and reset current marker index
            else {
                this.infoWindow.open = true
                this.infoWindow.currentIndex = index
            }
        },
    },
}
</script>
