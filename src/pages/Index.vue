<template>
    <Layout>
        <AppGoogleTalentSearchProvider
            class="mt-6"
            :search-on-load="false"
            :site-config="$siteConfig"
            :static="$static"
            :is-load-more="$static.metadata.paginationType == 'load'"
            v-slot="{input, source, newSearch}"
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
import AppSearchForm from "~/demo/components/AppSearchForm"
import AppGoogleTalentSearchProvider from "~/components/Search/Providers/AppGoogleTalentSearchProvider"

export default {
    components: {
        AppSearchForm,
        AppGoogleTalentSearchProvider,
    },
    metaInfo: {
        title: "Home",
    },
}
</script>

<static-query>
query {
    metadata {
        paginationType,
        siteName,
    }
}
</static-query>
