<template>
    <Layout>
        <AppGoogleTalentSearchProvider
            class="mt-6"
            :search-on-load="false"
            :site-config="$siteConfig"
            v-slot="{
                input,
                source,
                newSearch,
            }"
        >
            <div class="mx-4">
                <AppSearchForm
                    :input="input"
                    :source="source"
                    @search="newSearch"
                />
            </div>
        </AppGoogleTalentSearchProvider>
    </Layout>
</template>
<script>
import AppGoogleTalentSearchProvider from "~/components/Search/Providers/AppGoogleTalentSearchProvider"
import AppSearchForm from "~/demo/components/AppSearchForm"
export default {
    components: {
        AppGoogleTalentSearchProvider,
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

