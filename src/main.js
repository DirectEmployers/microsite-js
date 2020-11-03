// This is the main.js file for our demo gridsome playground
import axios from "axios"
import "~/demo/scss/main.scss"
import DefaultLayout from "~/layouts/Default.vue"
import siteConfig from "~/config"

export default function (Vue, { router, head, isClient }) {
    Vue.component("Layout", DefaultLayout)

    if(isClient){
        window.YETT_BLACKLIST = [
            /www\.google-analytics\.com/,
            /d2e48ltfsb5exy\.cloudfront\.net\/p\/t.js/,
        ]
    }


    //can reference it globally in components & templates.
    Vue.prototype.$siteConfig = siteConfig
}
