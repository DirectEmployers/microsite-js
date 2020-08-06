<template>
<div>
    <div class="bg-gray-100 mt-6 p-2">
        <div class="container px-4 mx-auto mt-6 font-semibold">
            <div class="mt-6 search-form">
              <AppSearchProvider
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
import SearchForm from "~/demo/components/SearchForm"
import AppSearchProvider from "~/components/Search/AppSearchProvider"

export default {
    components: {
        SearchForm,
        AppSearchProvider,
    }
}
</script>
