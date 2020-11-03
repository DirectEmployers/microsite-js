<template>
    <section v-show="!hasAcknowleged">
        <slot
            :acceptCookieUse="acceptCookieUse"
            :declineCookieUse="declineCookieUse"
            :declined="declined"
            :acknowledge="hasAcknowleged"
            :accepted="accepted"
        />
    </section>
</template>
<script>
import {blank} from "../services/helpers"

const ACCEPTED_KEY = "accepted_cookie_use"
const DECLINED_KEY = "declined_cookie_use"

const yett = "https://unpkg.com/yett@0.1.13/dist/yett.min.js"

function isStoredAs(key, stored_as) {
    if (!process.isClient) {
        return stored_as
    }

    return localStorage.getItem(key) === stored_as.toString()
}

if (process.isClient) {
    const yettScript = document.querySelector(`script[src='${yett}']`)

    if (isStoredAs(DECLINED_KEY, true) && !yettScript) {
        let script = document.createElement("script")

        script.src = yett

        document.head.insertBefore(script, document.head.firstChild)
    }
}

export default {
    data() {
        return {
            declined: isStoredAs(DECLINED_KEY, true),
            accepted: isStoredAs(ACCEPTED_KEY, true),
        }
    },
    computed: {
        hasAcknowleged() {
            return this.accepted || this.declined
        },
    },
    methods: {
        acceptCookieUse() {
            if (process.isClient) {
                this.accepted = true
                this.declined = false
                localStorage.removeItem(DECLINED_KEY)
                localStorage.setItem(ACCEPTED_KEY, "true")
            }
        },
        declineCookieUse() {
            if (process.isClient) {
                this.accepted = false

                this.declined = true

                localStorage.removeItem(ACCEPTED_KEY)

                localStorage.setItem(DECLINED_KEY, "true")

                window.location.reload()
            }
        },
    },
}
</script>
