<template>
    <span class="search-filter-chip" tabindex="0">
        <g-link :to="url">
            <slot>
                {{ text }}
            </slot>
        </g-link>
    </span>
</template>

<script>
const ENTER_KEY = 13

export default {
    props: {
        url: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        path: {
            type: String,
            required: false,
            default() {
                return this.$route.path
            },
        },
    },
    created() {
        if (process.isClient) {
            document.addEventListener("keyup", this.hitEnter)
        }
    },
    destroyed() {
        if (process.isClient) {
            document.removeEventListener("keyup", this.hitEnter)
        }
    },
    methods: {
        hitEnter(e) {
            if (e.keyCode == ENTER_KEY && document.activeElement == this.$el) {
                this.$router
                    .push({
                        path: this.url,
                    })
                    .catch((err) => {})
            }
        },
    },
}
</script>