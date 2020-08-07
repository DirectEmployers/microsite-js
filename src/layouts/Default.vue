<template>
    <div>
        <main id="content">
            <AppNavbar
                :links="[
                    { href: '/', display: 'Home' },
                    { href: '/jobs', display: 'Jobs' },
                ]"
            >
                <template v-slot:logo>
                    <g-link to="/">
                        <img
                            style="border-radius: 50%;"
                            width="50px"
                            height="50px"
                            src="//d2e48ltfsb5exy.cloudfront.net/myjobs/logos/DE-icon-bleed.png"
                            alt="Logo"
                        />
                    </g-link>
                </template>
            </AppNavbar>
            <AppSearchProvider
                class="my-6"
                :search-on-load="false"
                :site-config="$siteConfig"
                v-slot="{
                    input,
                    submitSearchForm,
                    supported,
                    getUserCoordinates,
                }"
            >
                <div class="mx-4">
                    <SearchForm
                        :input="input"
                        :submitSearchForm="submitSearchForm"
                        :supported="supported"
                        :getUserCoordinates="getUserCoordinates"
                    />
                </div>
            </AppSearchProvider>
            <slot />
        </main>
    </div>
</template>
<script>
import AppNavbar from "~/components/AppNavbar"
import AppSearchProvider from "~/components/Search/AppSearchProvider"
import SearchForm from "~/demo/components/SearchForm"

export default {
    components: {
        AppNavbar,
        AppSearchProvider,
        SearchForm,
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
    },
}
</script>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>
