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
                <!-- menu -->
                <svg
                    v-if="!toggled"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                >
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
                <!-- x -->
                <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 96 96"
                    enable-background="new 0 0 96 96"
                >
                    <polygon
                        points="96,14 82,0 48,34 14,0 0,14 34,48 0,82 14,96 48,62 82,96 96,82 62,48 "
                    />
                </svg>
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
                <slot :name="item.key" :item="item">
                    <component
                        :is="getLinkType(item)"
                        v-bind="item.attributes"
                        :href="item.href"
                        :to="item.href"
                        class="navbar__item-link"
                        :class="{
                            'navbar__item-link--active': linkIsActive(item.href)
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
export default {
    props: {
        links: {
            type: Array,
            required: true,
        },
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
            this.toggled = false
            this.$emit("navbarClosed", this.toggled)
        },

        open() {
            this.toggled = true
            this.$emit("navbarOpened", this.toggled)
        },

        toggle() {
            this.toggled = !this.toggled
            this.$emit("navbarToggled", this.toggled)
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

            console.log(containsTarget)

            const wrapperContainsTarget = menuWrapper.contains(e.target)

            if (!containsTarget && !wrapperContainsTarget) {
                this.close()
            }
        },


        getLinkType(item) {
            if (Object.prototype.hasOwnProperty.call(item, 'tag')) {
                return item.tag
            }

            return "g-link"
        },
    },
}
</script>
