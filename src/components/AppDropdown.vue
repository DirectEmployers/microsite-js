<template>
    <component :is="tag" class="dropdown" v-on="eventHandlers">
        <div
            role="button"
            ref="display"
            class="dropdown__display"
            tabindex="0"
            :aria-expanded="toggled"
            :id="`dropdown-display-${id}`"
        >
            {{ display }}
        </div>

        <div
            :id="`dropdown-content-${id}`"
            class="dropdown__content"
            v-show="toggled"
            :aria-labelledby="`dropdown-display-${id}`"
            :class="{'dropdown__content--active': toggled}"
        >
            <slot>
                <div :key="index" v-for="(link, index) in links"  @mouseover="selectedIndex = index">
                    <slot :name="link.key" :isSelected="index==selectedIndex">
                        <component
                            :is="link.tag || 'g-link'"
                            :to="link.href"
                            :href="link.href"
                            class="dropdown__content-item"
                            :class="{
                                'dropdown__content-item--active':
                                    index === selectedIndex,
                            }"
                        >
                            {{ link.display }}
                        </component>
                    </slot>
                </div>
            </slot>
        </div>
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
            },
        },
        interactionType: {
            type: String,
            required: false,
            default: "click",
        },
        links: {
            type: Array,
            required: false,
            default: () => [],
        },
        tag: {
            type: String,
            required: false,
            default: "div",
        },
        display: {
            type: String,
            required: false,
            default: "Dropdown",
        },
    },
    data() {
        return {
            toggled: false,
            selectedIndex: 0,
        }
    },
    methods: {
        toggle() {
            this.toggled = !this.toggled
        },
        open() {
            this.toggled = true
        },
        close() {
            this.toggled = false
            this.selectedIndex = 0
        },
        keyUp(e) {
            const code = e.keyCode
            //if enter is pressed on the display button make sure dropdown is open.
            if(!this.toggled && code == 13 && document.activeElement == this.$refs['display']){
                this.open()
            }   

            //escape
            if (code == 27) {
                return this.close()
            }
            //tab or up arrrow
            if (this.toggled && [38, 9].includes(code)) {
                if(code == 38 && this.selectedIndex <= 0){
                    this.selectedIndex = this.links.length - 1
                }else{
                    this.selectedIndex--
                }
            }

        },
        keyDown(e) {
            if (this.toggled && e.keyCode == 40) {
                if (this.selectedIndex <= this.links.length) {
                    this.selectedIndex++
                }
                if (this.selectedIndex >= this.links.length) {
                    this.selectedIndex = 0
                }
            }
        },
        exitDropdown(e) {
            if (this.$el !== e.target && !this.$el.contains(e.target)) {
                this.close()
            }
        },
    },
    created() {
        if (this.isClick && process.isClient) {
            document.addEventListener("click", this.exitDropdown)
            if(this.links.length){
                document.addEventListener("keyup", this.keyUp)
                document.addEventListener("keydown", this.keyDown)
            }
        }
    },
    destroyed() {
        if (this.isClick && process.isClient) {
            document.removeEventListener("click", this.exitDropdown)
            if(this.links.length){
                document.removeEventListener("keyup", this.keyUp)
                document.removeEventListener("keydown", this.keyDown)
            }
        }
    },
    computed: {
        isClick() {
            return this.interactionType == "click"
        },

        eventHandlers() {
            const type = this.interactionType   
            switch (type) {
                case "click":
                    return {click: this.toggle}
                    break
                case "hover":
                    return {mouseover: this.open, mouseleave: this.close}
                    break
                default:
                    throw new Error(`Unsupported interaction type '${type}'`)
                    break
            }
        },
    },
}
</script>
