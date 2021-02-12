<template>
    <ClientOnly>
        <section v-if="!hasAcknowleged">
            <slot
                :acceptCookieUse="acceptCookieUse"
                :declineCookieUse="declineCookieUse"
                :declined="declined"
                :acknowledged="hasAcknowleged"
                :accepted="accepted"
            />
        </section>
    </ClientOnly>
</template>

<script>
import {
    ACCEPTED_COOKIES_KEY,
    DECLINED_COOKIES_KEY,
    acceptedCookieUse,
    declinedCookieUse,
} from "../services/storage"

export default {
    data() {
        return {
            declined: declinedCookieUse(),
            accepted: acceptedCookieUse(),
        }
    },
    computed: {
        hasAcknowleged() {
            return this.declined || this.accepted
        },
    },
    methods: {
        acceptCookieUse() {
            if (process.isClient) {
                this.accepted = true
                this.declined = false
                localStorage.removeItem(DECLINED_COOKIES_KEY)
                localStorage.setItem(ACCEPTED_COOKIES_KEY, "true")
            }
        },
        declineCookieUse() {
            if (process.isClient) {
                this.accepted = false

                this.declined = true

                localStorage.removeItem(ACCEPTED_COOKIES_KEY)

                localStorage.setItem(DECLINED_COOKIES_KEY, "true")

                window.location.reload()
            }
        },
    },
}
</script>
