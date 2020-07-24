<template>
    <div class="page--overlay" v-if="toggled">
        <div class="modal">
            <div class="modal__header">
                <h3 class="modal__header-title" v-if="title">
                    {{ title }}
                </h3>
                <span class="modal__header-close" @click="toggle">
                    &times;
                </span>
            </div>

            <div class="modal__body">
                <slot name="content"></slot>
            </div>

            <div class="modal__footer">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            required: false,
            default: "",
            type: String,
        },
    },
    created() {
        //"document" will not be defined when we run npm run build, this is a workaround
        if (typeof document != "undefined") {
            document.addEventListener("click", this.nonModalClick)
        }
    },
    destroyed() {
        if (typeof document != "undefined") {
            document.removeEventListener("click", this.nonModalClick)
        }
    },
    data() {
        return {
            toggled: false,
        }
    },
    methods: {

        toggle() {
            this.toggled = !this.toggled
        },

        nonModalClick(e) {
            const modalWrapper = this.$el.firstChild

            const containsTarget = this.$el.contains(e.target)

            const wrapperContainsTarget = (modalWrapper && modalWrapper.contains(e.target))

            if (containsTarget && !wrapperContainsTarget) {
                this.toggled = false
            }
        },
    },
}
</script>
