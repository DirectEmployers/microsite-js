<template>
    <span class="search-filter-chip" tabindex="0">
        <g-link :to="link">
            <slot>
                {{ text }}
            </slot>
        </g-link>
    </span>
</template>

<script>

export default {
    props: {
        link: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: false,
        },
    },
}
</script>