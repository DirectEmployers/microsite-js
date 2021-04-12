<template>
    <GmapMap
        v-if="markers.length > 0"
        :options="{...{disableDefaultUI: true}, ...mapOptions}"
        v-bind="$attrs"
    >
        <GmapCluster
            image-path="https://de-microsites.s3.amazonaws.com/__shared__/images/google-maps/cluster"
        >
            <GmapMarker
                :key="index"
                :clickable="true"
                :draggable="true"
                :position="m.position"
                @click="center = m.position"
                v-for="(m, index) in markers"
            ></GmapMarker>
        </GmapCluster>
    </GmapMap>
</template>
<script>
import {geoService} from "../../services/search"
import GmapCluster from "gmap-vue/dist/components/cluster"
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
        mapOptions: {
            type: Object,
            required: false,
            default: () => {
                return {}
            },
        },
    },
    components: {
        GmapCluster,
    },
    data() {
        return {
            google: null,
            markers: [],
            center: this.$attrs.center,
            pagination: {
                has_more_pages: true,
            },
            ready: false,
        }
    },
    async created() {
        await this.$gmapApiPromiseLazy()
        let searchData = {...{page: 1, num_items: 100}, ...this.searchData}
        while (this.hasMore) {
            try {
                let response = await this.geoService(searchData)
                let {pagination, results} = response.data || {}
                this.pagination = pagination || {has_more_pages: false}
                this.addMarkers(results || [])
                searchData.page += 1
            } catch (err) {
                console.error(err)
                this.pagination = {has_more_pages: false}
            }
        }
        this.ready = true
    },
    computed: {
        hasMore() {
            return this.pagination.has_more_pages
        },
    },
    methods: {
        geoService(data) {
            return geoService(data, {
                buids: this.siteConfig.buids || [],
                tenant_uuid: this.siteConfig.tenant_uuid || null,
                company_uuids: this.siteConfig.company_uuids || [],
                filters: this.siteConfig.filters || [],
                force_filters: this.siteConfig.force_filters || [],
            })
        },
        makeMarker(lat, lng) {
            return new google.maps.Marker({
                position: new google.maps.LatLng(
                    parseFloat(lat),
                    parseFloat(lng)
                ),
            })
        },
        addMarkers(results) {
            results.forEach(result => {
                this.markers.push(this.makeMarker(result.lat, result.lng))
            })
        },
    },
}
</script>
