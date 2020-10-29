<template>
    <div>
        <main id="content">
            <AppNavbar
                :links="[
                    {href: '/', display: 'Home'},
                    {href: '/jobs', display: 'Jobs'},
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
            <slot />
            <AppDETracker />
            <AppViewSourceHandler />
        </main>
    </div>
</template>
<script>
import AppDETracker from "~/components/AppDETracker"
import AppViewSourceHandler from "~/components/Parse/AppViewSourceHandler"
import AppNavbar from "~/components/AppNavbar"
export default {
    components: {
        AppNavbar,
        AppDETracker,
        AppViewSourceHandler,
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
