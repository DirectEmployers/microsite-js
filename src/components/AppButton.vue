<template>
    <button class="button" type="button" @click="onClick">
        <slot>
            Button Slot
        </slot>
    </button>
</template>

<script>
export default {
  props: {
    onClick: {
      type: Function,
      required: true
    }
  }
}
</script>
