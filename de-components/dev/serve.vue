<script>
import Vue from 'vue';
import { DeSample } from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    DeSample,
  }
});
</script>

<template>
  <div id="app">
    <de-sample />
  </div>
</template>
