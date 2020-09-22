<template>
    <component class="dropdown" :is="tag" v-on="eventHandlers">
        <div 
            role="button"
            tabindex="0"
            :id="`dropdown-display-${id}`"
            class="dropdown__display"
            :aria-expanded="toggled"

        >
            <span class="dropdown__display-text">{{ display }}</span>
        </div>
        <ul
            class="dropdown__content"
            :aria-labelledby="`dropdown-display-${id}`"
            :class="{
                'dropdown__content--toggled': toggled
            }"
        >
            <slot></slot>
        </ul>
    </component>
</template>

<script>
export default {
    props: {
        id: {
            type: String,
            required: false,
            default() {
                return `${this._uid}`
            }
        },
        interactionType: {
            type: String,
            required: false,
            default: "click"
        },
        tag: {
            type: String,
            required: false,
            default: "div"
        },
        display: {
            type: String,
            required: false,
            default: 'Dropdown'
        }
    },
    data() {
        return {
            toggled: false
        }
    },
    created() {
        if(this.isClick && process.isClient){
            document.addEventListener('click', this.nonMenuClick)
        }
    },
    destroyed() {
        if(this.isClick && process.isClient){
            document.removeEventListener('click', this.nonMenuClick)
        }
    },
    computed: {
        isClick(){
            return this.interactionType == 'click'
        },
        eventHandlers() {
            const type = this.interactionType
            switch(type){
                case 'click':
                    return { click: this.toggle }
                    break;
                case 'hover':
                    return {mouseover: this.open, mouseleave: this.close}
                    break;
                default:
                    throw new Error(`Unsupported interaction type '${type}'`)
                    break;
            }
        }
    },
    methods: {
        toggle(){
            this.toggled = !this.toggled
        },
        open(){
            this.toggled = true
        },
        close(){
            this.toggled = false
        },
        nonMenuClick(e) {
            if (this.$el !== e.target && !this.$el.contains(e.target)) {
                this.toggled = false
            }
        }
    }
}
</script>
