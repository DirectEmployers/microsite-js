<template>
    <div v-if=json>
        <template v-for="(json, index) in json.child">
            <template v-if="json.attr.class == lookupClass">
                <slot />
                <AppJsonToHtml :tag="json.tag" :json="json.child" v-bind="json.attr" :key="index" />
            </template>
            <template v-else>
                <AppJsonToHtml :tag="json.tag" :json="json.child" v-bind="json.attr" :key="index" />
            </template>
        </template>
    </div>
</template>

<script>
import linkify from 'linkifyjs/html'
import { kebabCase, truncate } from 'lodash'
const html2json = require('html2json').html2json
import AppJsonToHtml from "./AppJsonToHtml"

export default {
    name: 'AppHtmlToJson',
    props: {
        html: {
            type: String,
            required: true,
        },
        lookupClass: {
            type: String,
            required: false,
        }
    },
    components: {
        AppJsonToHtml,
    },
    data() {
        return {
            json: null,
        }
    },
    mounted() {
        this.parseHtmlDescription()
    },
    methods: {
        parseHtmlDescription() {
            const json = html2json(this.linkifyHtml())
            for (var i = 0, len = json.child.length; i < len; i++) {
                let className = null
                if ( json.child[i].child !== undefined ) {
                    if (json.child[i].child[0].child !== undefined) {
                        if (json.child[i].child[0].child[0].node == "text") {
                            className = kebabCase(truncate(json.child[i].child[0].child[0].text, {'length': 64}))
                        }
                    }
                }
                json.child[i]["attr"] = { class: className ? className : `node-${i}` }
            }
            this.json = json
        },
        cleanHtml() {
            return this.html.replace(/(\r\n|\n|\r)/gm, "")
        },
        linkifyHtml() {
            return linkify(this.cleanHtml(), { className: 'job-detail-link', attributes:{ rel: 'noreferrer' } })
        }
    }
}
</script>