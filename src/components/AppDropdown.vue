<template>
    <component :is="tag" class="dropdown" v-on="eventHandlers">
        <div
            tabindex="0"
            role="button"
            ref="display"
            aria-haspopup="true"
            :aria-expanded="toggled"
            class="dropdown__display"
            :id="`dropdown-display-${id}`"
        >
            <slot name="display">
                {{ display }}
            </slot>
        </div>

        <div
            v-show="toggled"
            ref="dropdown-content"
            class="dropdown__content"
            :id="`dropdown-content-${id}`"
            :aria-labelledby="`dropdown-display-${id}`"
            :class="{'dropdown__content--active': toggled}"
        >
            <slot :selectedIndex="selectedIndex">
                <div
                    :key="index"
                    v-for="(link, index) in links"
                    @mouseover="selectedIndex = index"
                >
                    <slot
                        :link="link"
                        :name="link.key"
                        :isSelected="index == selectedIndex"
                    >
                        <a
                            tabindex="0"
                            dropdown-item
                            :href="link.href"
                            :ref="`link-${index}`"
                            v-bind="link.attributes || {}"
                            class="dropdown__content-item"
                            :class="{
                                'dropdown__content-item--active':
                                    index === selectedIndex,
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
import { TAB_KEY_CODE, UP_KEY_CODE, DOWN_KEY_CODE, ESCAPE_KEY_CODE, ENTER_KEY_CODE } from "../constants/keyCodes"
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
            items: [],
            totalItems: 0,
            toggled: false,
            selectedIndex: -1,
        }
    },
    mounted() {
        this.items = this.$refs["dropdown-content"].querySelectorAll(
            "[dropdown-item]"
        )
        this.totalItems = this.items.length
    },
    created() {
        if (!process.isClient) {
            return
        }

        document.addEventListener("keyup", this.keyNavigation)
        document.addEventListener("keydown", this.preventScroll)

        if (this.isClick) {
            document.addEventListener("click", this.clickOutOfMenu)
        }
    },
    destroyed() {
        if (!process.isClient) {
            return
        }

        document.removeEventListener("keyup", this.keyNavigation)
        document.removeEventListener("keydown", this.preventScroll)

        if (this.isClick) {
            document.removeEventListener("click", this.clickOutOfMenu)
        }
    },
    methods: {
        clickOutOfMenu(e) {
            if (this.$el !== e.target && !this.$el.contains(e.target)) {
                this.close()
            }
        },
        open() {
            this.toggled = true
        },
        close() {
            this.toggled = false
            this.selectedIndex = -1
        },
        down() {
            if (this.selectedIndex <= this.totalItems) {
                this.selectedIndex++
            }
            if (this.selectedIndex >= this.totalItems) {
                this.selectedIndex = 0
            }
            this.items[this.selectedIndex].focus()
        },
        up() {
            if (this.selectedIndex <= 0) {
                this.selectedIndex = this.totalItems - 1
            } else {
                this.selectedIndex--
            }
            this.items[this.selectedIndex].focus()
        },
        tab() {
            this.selectedIndex++
            if (this.selectedIndex >= this.totalItems) {
                return this.close()
            }
            this.items[this.selectedIndex].focus()
        },
        toggle() {
            if (this.toggled) {
                this.close()
            } else {
                this.open()
            }
        },
        preventScroll(event) {
            if (
                this.toggled &&
                [UP_KEY_CODE, DOWN_KEY_CODE].includes(event.keyCode)
            ) {
                event.preventDefault()
            }
        },
        keyNavigation(e) {
            const code = e.keyCode

            if (code == ENTER_KEY_CODE && e.target == this.$refs["display"]) {
                return this.toggle()
            }

            if (code == ESCAPE_KEY_CODE) {
                return this.close()
            }

            if (this.toggled) {
                if (code == TAB_KEY_CODE) {
                    return this.tab()
                }

                if (code == DOWN_KEY_CODE) {
                    return this.down()
                }
                if (code == UP_KEY_CODE) {
                    return this.up()
                }
            }
        },
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
