<template>
    <component :is="tag" class="accordion">
        <div
            role="button"
            tabindex="0"
            :id="`accordion-header-${id}`"
            class="accordion__header"
            :class="{
                'accordion__header--active': isOpen
            }"
            :aria-expanded="isOpen"
            @click="isOpen = !isOpen"
            @keyup.enter="isOpen = !isOpen"
        >
            <slot name="header">
                <h3 v-if="header" class="accordion__header-text">
                    {{ header }}
                </h3>
            </slot>
        </div>
        <div
            :id="`accordion-content-${id}`"
            class="accordion__content"
            v-if="isOpen"
            :aria-labelledby="`accordion-header-${id}`"
        >
            <slot />
        </div>
    </component>
</template>

<script>
export default {
    data() {
        return {
            isOpen: this.open
        }
    },
    props: {
        open: {
            // no type enforced as this allows strings/truthy
            // values to determine accordion toggle status.
            required: false,
            default: false
        },
        id: {
            type: String,
            required: false,
            default() {
                return `${this._uid}`
            }
        },
        header: {
            type: String,
            required: false,
            default : ''
        },
        tag: {
            type: String,
            required: false,
            default: "div"
        }
    }
}
</script>
