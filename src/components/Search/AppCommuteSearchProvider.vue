<template>
    <component :is="tag">

    </component>
</template>

<script>
export default {
    props:{
        tag: {
            type: String,
            required: false,
            default: 'section'
        }
    }
}
</script>