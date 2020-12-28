<template>
  <Layout>
    <App404 />
  </Layout>
</template>
<script>
import App404 from '~/components/App404'

export default {
  components: {
    App404,
  },
  metaInfo: {
    title: "Not Found",
    meta: [
      {
        key: "description",
        name: "description",
        content: "only the best jobs",
      },
    ],
  },
};
</script>