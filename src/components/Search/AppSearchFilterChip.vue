<template>
    <span class="search-filter-chip" tabindex="0">
        <g-link :to="url">
            <slot>
                {{ text }}
            </slot>
        </g-link>
    </span>
</template>

<script>
const ENTER_KEY = 13

export default {
    props: {
        url: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
    },
}
</script>