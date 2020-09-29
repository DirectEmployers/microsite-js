<template>
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
            <img
                width="18px"
                src="https://dn9tckvz2rpxv.cloudfront.net/img/radius-search2.svg"
                alt="Radius Icon"
                :class="{ hidden: !isSupported }"
            />
        </slot>
    </button>
</template>
<script>
export default {
    computed:{
        isSupported(){
            if (process.isClient) {
                return "geolocation" in window.navigator
            }
            return false
        }
    },
    methods:{
        getGeoLocation() {
            if (process.isClient && this.isSupported) {
                navigator.geolocation.getCurrentPosition(position => {
                    let lat = position.coords.latitude.toFixed(6)

                    let lon = position.coords.longitude.toFixed(6)

                    let coords = lat + "," + lon

                    this.$emit("getCoords", coords)
                })
            }
        }

    }
}
</script>