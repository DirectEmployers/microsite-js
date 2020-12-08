<template>
    <span class="chip" tabindex="0" @click="clickedChip" v-once>
        <slot>
            {{ text }}
        </slot>
    </span>
</template>

<script>
const ENTER_KEY = 13

export default {
    props:{
        name: {
            type: String,
            required: false,
            default() {
                return `${this._uid}`
            }
        },
        text: {
            type: String,
            required: false,
            default: ''
        }
    },
    created(){
        if(process.isClient){
            document.addEventListener('keyup', this.hitEnter)
        }

    },
    destroyed(){
        if(process.isClient){
            document.removeEventListener('keyup', this.hitEnter)
        }

    },
    methods:{
        hitEnter(e){
            if(e.keyCode == ENTER_KEY && document.activeElement == this.$el){
                this.clickedChip()
            }
        },
        clickedChip(){
            this.$emit('chipClicked', this.name)
        }
    }
}
</script>