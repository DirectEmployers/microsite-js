<template>
    <div>
        <AppHtmlToJson :html="cleanHtml" :lookupClass="lookupClass">
            <slot />
        </AppHtmlToJson>
    </div>
</template>

<script>
import AppHtmlToJson from "./Parse/AppHtmlToJson"
import { removeEndOfLine } from "../services/helpers"

export default {
    name: "AppJobDescription",
    props: {
        html: {
            type: String,
            required: true,
        },
        lookupClass: {
            type: String,
            required: false,
        },
    },
    components: {
        AppHtmlToJson,
    },

    computed: {
        cleanHtml() {
            return removeEndOfLine(this.html)
        },
    },
}
</script>
