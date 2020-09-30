<template>
    <div class="page--overlay" v-if="toggled" @keydown.tab="focusTrap">
        <div class="modal" ref="modal" tabindex="0">
            <div class="modal__header">
                <h3 class="modal__header-title" v-if="title">
                    {{ title }}
                </h3>
                <button class="modal__header-close" @click="toggle" type="button">
                    &times;
                </button>
            </div>

            <div class="modal__body">
                <slot></slot>
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
        if (process.isClient) {
            document.addEventListener("click", this.nonModalClick)
            document.addEventListener("keyup", this.exitModal)
        }
    },

    destroyed() {
        if (process.isClient) {
            document.removeEventListener("click", this.nonModalClick)
            document.removeEventListener("keyup", this.exitModal)
        }
    },
    data() {
        return {
            toggled: false,
        }
    },
    methods: {
        close(){
            this.toggled = false
            this.$emit('modalClosed')
        },
        open(){
            this.toggled = true
            this.$emit('modalOpened')
        },
        toggle() {
            if(this.toggled){
                this.close()
            }else{
                this.open()
            }
        },

        nonModalClick(e) {
            const modalWrapper = this.$el.firstChild

            const containsTarget = this.$el.contains(e.target)

            const wrapperContainsTarget =
                modalWrapper && modalWrapper.contains(e.target)

            if (this.toggled && containsTarget && !wrapperContainsTarget) {
                this.close()
            }
        },

        exitModal(e) {
            // escape
            if (this.toggled && e.keyCode === 27) {
                this.close()
            }
        },

        focusTrap(e) {
            const focusable = this.$refs.modal.querySelectorAll(
                "button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
            )

            const firstFocusable = focusable[0]

            const lastFocusable = focusable[focusable.length - 1]

            if (e.shiftKey && document.activeElement === firstFocusable) {
                lastFocusable.focus()
                e.preventDefault()
            }

            if (!e.shiftKey && document.activeElement === lastFocusable) {
                firstFocusable.focus()
                e.preventDefault()
            }

            
        },
    },
}
</script>
