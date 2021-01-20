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
        path: {
            type: String,
            required: false,
            default() {
                return this.$route.path
            }
        },
        input: {
            required: false,
            type: Object,
            default: () => { return {} },
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
                this.$router
                .push({
                    path: this.url,
                })
                .catch(err => {})
            }
        },

        removeFilter(){
            if(this.name === "*"){
                return this.path
            }

            let input = this.input
            let names = this.name
            let query = Object.assign({}, this.$route.query)
            query = {...query, ...input}

            if(!Array.isArray(names)){
                names = [names]
            }

            for(let item of names){
                delete query[item]
            }
            return buildUrl(this.path, query)
        }
    }
}
</script>