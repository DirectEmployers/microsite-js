// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const merge = require("webpack-merge")
const path = require("path")
// const {config} = require("process")

module.exports = {
  siteName: "Gridsome",
  plugins: [],
  configureWebpack: {
    resolve: {
      alias: {
        "@de": path.resolve(__dirname, "../src/lib-components/"),
      }
    }
  }
}