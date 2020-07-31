// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import axios from 'axios'
import '~/demo-css/main.scss'
import DefaultLayout from '~/layouts/Default.vue'
import siteConfig from "~/config"

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  //register a property for the site config so we
  //can reference it globally in components & templates.
  Vue.prototype.$siteConfig = siteConfig

}

