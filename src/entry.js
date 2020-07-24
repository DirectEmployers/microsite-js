import Vue from "vue"
//components
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


