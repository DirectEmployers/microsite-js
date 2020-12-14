<template>
<div>
    <div class="bg-gray-100 mt-6 p-2">
        <div class="container px-4 mx-auto mt-6 font-semibold">
            <div class="mt-6 search-form">
                <AppGoogleTalentSearchProvider
                    :site-config="$siteConfig"
                    :search-on-load="false"
                    v-slot="{
                        input,
                        newSearch,
                        source
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
            </div>
        </div>
    </div>
    <div class="container px-4 mx-auto mt-6 font-semibold">
      <header>
        <h3 class="font-semibold text-2xl">
          Oops! You’ve reached a page that we’ve misplaced…
        </h3>
        <p>You can either
          <g-link
            class="text-blue-500 uppercase text-2xl font-semibold border-b border-gold"
            to="/jobs"
          >
            click here to view all jobs
          </g-link>, or try a new search at the top of the page.
        </p>
        <div>
          Status Code: 404
        </div>
      </header>
    </div>
</div>
</template>
<script>
import AppSearchForm from "~/demo/components/AppSearchForm"
import AppGoogleTalentSearchProvider from "~/components/Search/Providers/AppGoogleTalentSearchProvider"

export default {
    components: {
        AppSearchForm,
        AppGoogleTalentSearchProvider
    }
}
</script>
