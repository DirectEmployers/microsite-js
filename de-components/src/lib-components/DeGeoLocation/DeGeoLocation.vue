<template>
    <ClientOnly>
        <button
            @click="getGeoLocation"
            v-if="isSupported"
            type="button"
            aria-label="Your location"
            class="geolocation__button"
            :class="{
                hidden: !isSupported,
            }"
        >
            <slot>
                <DeRadiusIcon width="18px" />
            </slot>
        </button>
    </ClientOnly>
</template>
<script>
import AppRadiusIcon from "./Icons/DeRadiusIcon"

export default {
    computed: {
        isSupported() {
            if (process.isClient) {
                return "geolocation" in window.navigator
            }
            return false
        },
    },
    components:{
        DeRadiusIcon
    },
    methods: {
        getGeoLocation() {
            if (process.isClient && this.isSupported) {
                navigator.geolocation.getCurrentPosition(position => {
                    let lat = position.coords.latitude.toFixed(6)

                    let lon = position.coords.longitude.toFixed(6)

                    let coords = lat + "," + lon

                    this.$emit("getCoords", coords)
                }, (error)=>{
                    if(error.code == 1){
                        this.$emit("permissionDenied")
                    }
                })
            }
        },
    },
}
</script>
