<template>
    <component @click.prevent="removeFilter()" :is="tag" class="search__filter-chip">
        <slot name="display">
            {{ display }}
        </slot>
    </component>
</template>
<script>
    export default {
        props:{
            tag: {
                required: false,
                type: String,
                default: "div",
            },
            display: {
                required: true,
                type: String
            },
            parameter: {
                required: true,
                type: String
            }
        },
        methods:{
            removeFilter() {
                this.$router.app.$emit('search.filter.remove', this.parameter)
            }
        }
    }
</script>