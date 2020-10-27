<template>
    <div>
        <slot :addViewSourceParams="addViewSourceParams" />
    </div>
</template>
<script>
import {blank, strAfter, jsonParseQueryString} from "../../services/helpers"
import buildUrl from "axios/lib/helpers/buildURL"

export default {
    created() {
        if (Object.prototype.hasOwnProperty.call(this.$route.query, "vs")) {
            this.setViewSource(this.$route.query.vs)
        }
    },
    methods: {
        setViewSource(vs) {
            if (!blank(vs) && process.isClient) {
                sessionStorage.setItem("vs", vs)
            }
        },
        addViewSourceParams(url) {
            const qs = strAfter(url, "?")

            let params = jsonParseQueryString(qs)

            let vs = sessionStorage.getItem("vs")

            if (!blank(vs)) {
                params["vs"] = vs
            }
            return buildUrl(url, params)
        },
    },
}
</script>
