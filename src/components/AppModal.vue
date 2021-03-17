<template>
    <div class="page--overlay" v-if="toggled">
        <div class="modal" ref="modal" tabindex="0" >
            <Trap>
                <div class="modal__header">
                    <h3 class="modal__header-title" v-if="title">
                        {{ title }}
                    </h3>
                    <slot name="toggle-icon" :toggle="toggle">
                        <button
                            class="modal__header-close"
                            @click="toggle"
                            type="button"
                        >
                            &times;
                        </button>
                    </slot>
                </div>

                <div class="modal__body">
                    <slot :toggle="toggle"></slot>
                </div>

                <div class="modal__footer">
                    <slot name="footer"></slot>
                </div>
            </Trap>
        </div>
    </div>
</template>

<script>
import Trap from 'vue-focus-lock'
import { ESCAPE_KEY_CODE } from "../constants/keyCodes"
export default {
    props: {
        title: {
            required: false,
            default: "",
            type: String,
        },
    },
    components:{
        Trap,
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
        close() {
            this.toggled = false
            this.$emit("modalClosed")
        },
        open() {
            this.toggled = true
            this.$nextTick(()=>{
                this.$refs['modal'].focus()
            })
            this.$emit('modalOpened')
        },
        toggle() {
            if (this.toggled) {
                this.close()
            } else {
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
            if (this.toggled && e.keyCode === ESCAPE_KEY_CODE) {
                this.close()
            }
        },
    },
}
</script>
