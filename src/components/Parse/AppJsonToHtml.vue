<template>
    <component :is="tag">
        <template v-for="(child, index) in json">
            <span
                v-if="child.node === 'text'"
                :key="index"
                v-html="child.text"
            ></span>
            <AppJsonToHtml
                v-else
                :tag="child.tag"
                :json="child.child"
                v-bind="child.attr"
                :key="index"
            ></AppJsonToHtml>
        </template>
    </component>
</template>

<script>
const json2html = require("html2json").json2html

export default {
    name: "AppJsonToHtml",
    props: {
        json: {
            type: Array,
            required: true,
        },
        tag: {
            type: String,
            required: true,
        },
    },
    methods: {
        convert2html(json) {
            return json2html(json)
        },
    },
}
</script>