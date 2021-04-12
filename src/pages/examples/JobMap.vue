<template>
    <AppJobMap
        :site-config="$siteConfig"
        :center="{lat: 20, lng: 0}"
        :zoom="2"
        style="width: 100%; height:500px;"
    >
    </AppJobMap>
</template>
<script>
import AppJobMap from '~/components/Search/AppJobMap'

export default {
    components:{
        AppJobMap
    }
}
</script>
