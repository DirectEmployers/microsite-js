<template>
    <div>
        <slot :addViewSourceParams="addViewSourceParams" />
    </div>
</template>
<script>
import {blank, strAfter, jsonParseQueryString} from "../../services/helpers"
import buildUrl from "axios/lib/helpers/buildURL"

const VS_KEY = 'vs'
const UTM_KEY = 'external_utm'

export default {
    mounted() {
        if(!this.hasSlotContent){

            if (Object.prototype.hasOwnProperty.call(this.$route.query, VS_KEY)) {
                this.setViewSource(this.$route.query[VS_KEY])
            }

            this.setUtmParams()
        }

    },
    computed:{
        hasSlotContent(){
            return Object.prototype.hasOwnProperty.call(this.$scopedSlots, 'default')
        }
    },
    methods: {
        setViewSource(vs) {
            if (!blank(vs) && process.isClient) {
                sessionStorage.setItem(VS_KEY, vs)
            }
        },
        setUtmParams(){
            let params = {}
            const query = this.$route.query

            Object.keys(query).forEach((key)=>{
                if(key.startsWith("utm_")){
                    params[key] = query[key]
                }
            })

            if(!blank(params)){
                sessionStorage.setItem(UTM_KEY, JSON.stringify(params))
            }
        },
        addViewSourceParams(url) {
            const qs = strAfter(url, "?")

            let params = jsonParseQueryString(qs)

            const vs = sessionStorage.getItem(VS_KEY)


            if (!blank(vs)) {
                params[VS_KEY] = vs
            }

            const utm = sessionStorage.getItem(UTM_KEY)

            let utm_params = {}

            if(!blank(utm)){
                try{
                    utm_params = JSON.parse(utm)
                }catch{
                    utm_params = {}
                }

            }
            params = { ...params, ...utm_params}

            return buildUrl(url, params)
        },
    },
}
</script>
