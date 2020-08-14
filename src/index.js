//this file is what is used as our entry point for our modules.
import Vue from "vue"

//import styles
require('./scss/microsite-js.scss')

const components = require.context("./components", true, /\.vue$/i)

// Declare install function executed by Vue.use()
export function install(Vue) {
    if (install.installed) return

    install.installed = true
    //globally register components
    components.keys().map((key) => {
        let name = key.split("/").pop().split(".")[0]
        Vue.component(name, files(key).default)
    })
}

// Export the library as a plugin for Vue.use()
export default { install: install }


