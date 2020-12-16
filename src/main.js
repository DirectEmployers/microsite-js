// This is the main.js file for our demo gridsome playground
import axios from "axios"
import "~/demo/scss/main.scss"
import DefaultLayout from "~/layouts/Default.vue"
import siteConfig from "~/config"
import Jobs from "~/pages/jobs"

export default function (Vue, { router, head, isClient }) {
    Vue.component("Layout", DefaultLayout)
    router.addRoutes([{
        path:'/jobs',
        name:'jobs',
        component: Jobs,
    }])
    router.options.scrollBehavior = function(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        if (to.params.savePos) {
            return {}
        }
        return {x: 0, y: 0}
    }
    //can reference it globally in components & templates.
    Vue.prototype.$siteConfig = siteConfig
}
