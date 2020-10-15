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
            :class="{ 'dropdown__content--active': toggled }"
        >
            <slot>
                <div
                    :key="index"
                    v-for="(link, index) in links"
                    @mouseover="selectedIndex = index"
                >
                    <slot
                        :name="link.key"
                        :link="link"
                        :isSelected="index == selectedIndex"
                    >
                        <a
                            tabindex="0"
                            :ref="`link-${index}`"
                            :href="link.href"
                            class="dropdown__content-item"
                            :class="{
                                'dropdown__content-item--active':
                                    index === selectedIndex
                            }"
                        >
                            {{ link.display }}
                        </a>
                    </slot>
                </div>
            </slot>
        </div>
    </component>
</template>

<script>
const TAB_KEY = 9
const UP_KEY = 38
const DOWN_KEY = 40
const ESC_KEY = 27
const ENTER_KEY = 13
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
            default: 'click'
        },
        links: {
            type: Array,
            required: false,
            default: () => []
        },
        tag: {
            type: String,
            required: false,
            default: 'div'
        },
        display: {
            type: String,
            required: false,
            default: 'Dropdown'
        }
    },
    data() {
        return {
            toggled: false,
            selectedIndex: -1
        }
    },
    methods: {
        toggle() {
            this.toggled = !this.toggled
        },
        open() {
            this.toggled = true
            this.selectedIndex = 0
        },
        close() {
            this.toggled = false
            this.selectedIndex = -1
        },

        keyUp(e) {
            const code = e.keyCode
            //if enter is pressed on the display button make sure dropdown is open.
            if (
                !this.toggled &&
                code == ENTER_KEY &&
                document.activeElement == this.$refs['display']
            ) {
                this.open()
                this.$nextTick(() => {
                    this.$refs['link-0'][0].focus()
                })
            }

            //escape
            if (code == ESC_KEY) {
                return this.close()
            }
            //tab or up arrrow
            if (this.toggled && [UP_KEY].includes(code)) {
                if (this.selectedIndex <= 0) {
                    this.selectedIndex = this.links.length - 1
                } else {
                    this.selectedIndex--
                }
                this.setLinkFocus(this.selectedIndex)
            }
        },
        keyDown(e) {
            const code = e.keyCode

            if (this.toggled && [DOWN_KEY, TAB_KEY].includes(code)) {
                if (this.selectedIndex <= this.links.length) {
                    this.selectedIndex++
                }
                if (this.selectedIndex >= this.links.length) {
                    this.selectedIndex = 0
                }
                this.setLinkFocus(this.selectedIndex)
            }

            if (this.toggled && code == TAB_KEY) {
                if (this.selectedIndex == 0) {
                    return this.close()
                }
                //odd bug where tab doesnt focus the right index :/
                this.setLinkFocus(this.selectedIndex - 1)
            }
        },
        setLinkFocus(index) {
            this.$nextTick(() => {
                this.$refs[`link-${index}`][0].focus()
            })
        },
        exitDropdown(e) {
            if (this.$el !== e.target && !this.$el.contains(e.target)) {
                this.close()
            }
        }
    },
    created() {
        if (process.isClient && this.isClick) {
            document.addEventListener('click', this.exitDropdown)
            if (this.links.length) {
                document.addEventListener('keyup', this.keyUp)
                document.addEventListener('keydown', this.keyDown)
            }
        }
    },
    destroyed() {
        if (process.isClient && this.isClick) {
            document.removeEventListener('click', this.exitDropdown)
            if (this.links.length) {
                document.removeEventListener('keyup', this.keyUp)
                document.removeEventListener('keydown', this.keyDown)
            }
        }
    },
    computed: {
        isClick() {
            return this.interactionType == 'click'
        },

        eventHandlers() {
            const type = this.interactionType
            switch (type) {
                case 'click':
                    return { click: this.toggle, mouseleave: this.close }
                    break
                case 'hover':
                    return { mouseover: this.open, mouseleave: this.close }
                    break
                default:
                    throw new Error(`Unsupported interaction type '${type}'`)
                    break
            }
        }
    }
}
</script>