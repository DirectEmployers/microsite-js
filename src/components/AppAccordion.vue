<template>
    <component :is="tag" class="accordion">
        <div
            role="button"
            tabindex="0"
            :id="`accordion-header-${id}`"
            class="accordion__header"
            :class="{
                'accordion__header--active': active,
            }"
            :aria-expanded="active"
            @click="active = !active"
            @keyup.enter="active = !active"
        >
            <slot name="display" :active="active">
                <h3 v-if="display" class="accordion__header-text">
                    {{ display }}
                </h3>
            </slot>
        </div>
        <div
            :id="`accordion-content-${id}`"
            class="accordion__content"
            v-if="active"
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
            active: this.open,
        }
    },
    props: {
        open: {
            type: Boolean,
            required: false,
            default: false,
        },
        id: {
            type: String,
            required: false,
            default() {
                return `${this._uid}`
            },
        },
        display: {
            type: String,
            required: false,
            default: "",
        },
        tag: {
            type: String,
            required: false,
            default: "div",
        },
    },
}
</script>
