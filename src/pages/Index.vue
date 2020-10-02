<template>
    <Layout>
        <AppSearchProvider
            class="mt-6"
            :search-on-load="false"
            :site-config="$siteConfig"
            v-slot="{
                input,
                submitSearchForm,
                source
            }"
        >
            <div class="mx-4">
                <AppSearchForm
                    :input="input"
                    :source="source"
                    :submitSearchForm="submitSearchForm"
                />
            </div>
        </AppSearchProvider>
    </Layout>
</template>
<script>
import AppSearchProvider from "~/components/Search/AppSearchProvider"
import AppSearchForm from "~/demo/components/AppSearchForm"
export default {
    components: {
        AppSearchProvider,
        AppSearchForm,
    },
    metaInfo: {
        title: "Home",
        meta: [
            {
                key: "description",
                name: "description",
                content: "only the best jobs",
            },
        ],
    }
}
</script>

