<template>
    <div>
        <AppHtmlToJson :html="cleanHtml" :lookupClass="lookupClass">
            <slot />
        </AppHtmlToJson>
    </div>
</template>

<script>
import AppHtmlToJson from "./Parse/AppHtmlToJson"

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
            return this.html.replace(/(\r\n|\n|\r)/gm, "")
        },
    },
}
</script>
