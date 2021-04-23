<template>
    <AppJobMap
        :zoom="2"
        :site-config="$siteConfig"
        :center="{lat: 20, lng: 0}"
        map-styles="width: 100%; height:500px;"
    >
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
}
</script>
