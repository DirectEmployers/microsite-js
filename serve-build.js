const fs = require('fs');
const handler = require('serve-handler');
const http = require('http');

const rewriteRules = JSON.parse(fs.readFileSync('rewriteRules.json'))
const port = 5000;

const server = http.createServer((request, response) => {
    // TODO: It would be nice to add a middleware (4th arg to handler) that would
    // log accesses to the server.
    const options = {
        public: 'dist',
        cleanUrls: true,
        rewrites: rewriteRules,
        directoryListing: false,

    };
    return handler(request, response, options);
})

server.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
});
