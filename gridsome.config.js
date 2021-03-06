// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
    siteName: "Microsite JS",
    siteUrl: "http://localhost:8080/",
    siteDescription: "Real jobs from real companies. Updated daily. Only verified, open positions at top companies.",
    outputDir: "build",
    plugins: [
        {
            use: "gridsome-plugin-tailwindcss",
            options: {
                tailwindConfig: "./tailwind.config.js",
            },
        },
    ],
    //
}
