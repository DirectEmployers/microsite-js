<template>
    <section>
        <GmapMap
            ref="map"
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
                <slot :done="done" :error="error"></slot>
            </GmapCluster>
        </GmapMap>
        <slot name="footer" :error="error" :done="done"></slot>
    </section>
</template>
<script>
import get from "lodash/get"
import omitBy from "lodash/omitBy"
import clone from "lodash/cloneDeep"
import {blank} from "../../services/helpers"
import {searchService, GOOGLE_TALENT} from "../../services/search"
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
            counts: {},
            done: false,
            markers: [],
            jobs: [],
            error: false,
            hasMore: true,
            positionZoom: this.$attrs.zoom,
            payload: clone(this.searchData),
            positionCenter: this.$attrs.center,
            queryConfig: {
                source: queryConfig.source,
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
            ...{page: 1, num_items: 100}, // google only allows 100 jobs at a time.
        }
        while (this.hasMore) {
            try {
                let response = await this.service(data)
                let {pagination, jobs, meta} = response.data || {}
                this.createMarkers(jobs || [], meta.source)
                this.done = !pagination.has_more_pages
                this.hasMore = !this.done
                data.page += 1
            } catch (err) {
                this.done = true
                this.error = err
            }
        }
        this.displayMarkers()
        // if location was given, position map to the first job in the area.
        if (
            this.$refs.map &&
            this.payload.location &&
            this.markers.length > 0
        ) {
            this.$refs.map.panTo(this.markers[0].job.coords)
            this.positionZoom = 6
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
            payload.location = job.location
            if (payload.r) {
                payload.coords = job.coords
            }
            this.$router
                .push({
                    path: "/jobs",
                    query: payload,
                })
                .catch(err => {})
        },
        getJobWindowLabel(location) {
            let count = this.counts[location] || 1
            let jobsLabel = "Jobs"
            if (count == 1) {
                jobsLabel = "Job"
            }
            return `${location}: ${count} ${jobsLabel}`
        },
        makeMarker(job) {
            return new google.maps.Marker({
                position: job.coords,
                job: job,
            })
        },
        coordinatesStringToObject(geolocation) {
            if (blank(geolocation)) {
                return false
            }
            let coords = geolocation.split(",")
            return {
                lat: parseFloat(coords[0]),
                lng: parseFloat(coords[1]),
            }
        },
        deriveJobLocation(job, source) {
            let location = job.location_exact
            if (source == GOOGLE_TALENT) {
                let locationData = get(
                    job.job,
                    "derivedInfo.locations[0].postalAddress",
                    {}
                )
                let city = get(locationData, "locality")
                let state = get(locationData, "administrativeArea")
                let country = get(
                    job.job,
                    "customAttributes.country_short.stringValues[0]"
                )
                if (["USA", "CAN"].includes(country)) {
                    location = `${city}, ${state}`
                } else {
                    location = `${city}, ${country}`
                }
            }
            return location
        },
        deriveJobCoords(job, source) {
            let coords = null
            if (source == GOOGLE_TALENT) {
                coords = get(job.job, "derivedInfo.locations[0].latLng")
                coords = this.coordinatesStringToObject(
                    `${coords["latitude"]},${coords["longitude"]}`
                )
            } else {
                coords = this.coordinatesStringToObject(job.GeoLocation)
            }
            return coords
        },
        createMarkers(jobs, source) {
            jobs.forEach(job => {
                job.coords = this.deriveJobCoords(job, source)
                if (job.coords) {
                    job.location = this.deriveJobLocation(job, source)
                    this.counts[job.location] =
                        (this.counts[job.location] || 0) + 1
                    this.jobs.push(this.makeMarker(job))
                }
            })
        },
        displayMarkers() {
            this.markers = this.jobs
        },
        setWindowInfo(marker, index) {
            this.infoWindow.position = marker.position
            this.infoWindow.options.content = this.getJobWindowLabel(
                marker.job.location
            )

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
