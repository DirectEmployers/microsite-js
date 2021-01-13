<template>
    <span class="chip" tabindex="0">
        <g-link :to="url">
            <slot>
                {{ text }}
            </slot>
        </g-link>
    </span>
</template>

<script>
import buildUrl from "axios/lib/helpers/buildURL"
const ENTER_KEY = 13

export default {
    props:{
        name: {
            type: [String, Array],
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

        this.url = this.removeFilter()
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

        removeFilter(){
            if(this.name === "*"){
                return buildUrl(this.$route.path)
            }
            let query = Object.assign({}, this.$route.query)
            delete query[this.name]

            return buildUrl(this.$route.path, query)
        }
    }
}
</script>