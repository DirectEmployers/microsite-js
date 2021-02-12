// This is the main.js file for our demo gridsome playground
import axios from "axios"
import "~/demo/scss/main.scss"
import DefaultLayout from "~/layouts/Default.vue"
import siteConfig from "~/config"

export default function (Vue, {
    router,
    head,
    isClient
}) {
    Vue.component("Layout", DefaultLayout)
    //can reference it globally in components & templates.
    Vue.prototype.$siteConfig = siteConfig
}