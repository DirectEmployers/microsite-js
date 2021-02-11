<template>
    <nav class="navbar">
        <section class="navbar__brand">
            <slot name="logo"></slot>
            <span class="navbar__brand-text">
                <slot name="brand-text"></slot>
            </span>
        </section>
        <slot name="toggler" :toggled="toggled" :toggleNav="toggle">
            <button
                type="button"
                @click="toggle()"
                aria-label="navbar Toggle"
                class="navbar__toggler"
            >
                <AppHamburgerMenuIcon
                    v-if="!toggled"
                    class="pointer-events-none"
                />
                <AppXIcon v-else class="pointer-events-none" />
            </button>
        </slot>

        <ul
            class="navbar__items"
            ref="navBarItems"
            :class="{
                'navbar__items--toggled': toggled,
            }"
        >
            <li
                :key="index"
                class="navbar__item"
                v-for="(item, index) in links"
            >
                <slot :name="item.key" :link="item">
                    <component
                        :is="getLinkType(item)"
                        v-bind="item.attributes"
                        :href="item.href"
                        :to="item.href"
                        class="navbar__item-link"
                        :class="{
                            'navbar__item-link--active': linkIsActive(
                                item.href
                            ),
                        }"
                    >
                        {{ item.display }}
                    </component>
                </slot>
            </li>
        </ul>
    </nav>
</template>

<script>
import AppHamburgerMenuIcon from "./Icons/AppHamburgerMenuIcon"
import AppXIcon from "./Icons/AppXIcon"

export default {
    props: {
        links: {
            type: Array,
            required: true,
        },
    },
    components: {
        AppXIcon,
        AppHamburgerMenuIcon,
    },
    created() {
        if (process.isClient) {
            document.addEventListener("click", this.nonMenuClick)
            window.addEventListener("resize", this.close)
        }
    },
    destroyed() {
        if (process.isClient) {
            document.removeEventListener("click", this.nonMenuClick)
            window.removeEventListener("resize", this.close)
        }
    },
    data() {
        return {
            toggled: false,
        }
    },
    methods: {
        close() {
            if (this.toggled) {
                this.$emit("navbarClosed")
            }
            this.toggled = false
        },

        open() {
            if (!this.toggled) {
                this.$emit("navbarOpened")
            }
            this.toggled = true
        },

        toggle() {
            if (this.toggled) {
                this.close()
            } else {
                this.open()
            }
        },

        linkIsActive(href) {
            if (process.isClient) {
                return href == window.location.pathname
            }
            return false
        },

        nonMenuClick(e) {
            const menuWrapper = this.$refs["navBarItems"]

            const containsTarget = this.$el.contains(e.target)

            const wrapperContainsTarget = menuWrapper.contains(e.target)
            if (!containsTarget && !wrapperContainsTarget) {
                this.close()
            }
        },

        getLinkType(item) {
            if (Object.prototype.hasOwnProperty.call(item, "tag")) {
                return item.tag
            }

            return "g-link"
        },
    },
}
</script>
