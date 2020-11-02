<template>
    <section v-if="!acknowledged">
        <slot
            :acceptCookieUse="acceptCookieUse"
            :acknowledged="acknowledged"
        />
    </section>
</template>
<script>
const ACCEPTED_KEY = "accepted_cookie_use"

export default {
    props: {},

    data() {
        return {
            acknowledged: this.isStoredTrue(ACCEPTED_KEY),
        }
    },
    methods: {
        isStoredTrue(key) {
            if (!process.isClient) {
                return false
            }
            return localStorage.getItem(key) === "true"
        },
        acceptCookieUse() {
            if (process.isClient) {
                this.acknowledged = true
                localStorage.setItem(ACCEPTED_KEY, "true")
            }
        },
    },
}
</script>
