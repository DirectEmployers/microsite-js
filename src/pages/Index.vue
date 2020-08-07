<template>
    <Layout>
        <div class="container">
            <AppAccordion :open="true">
                <template v-slot:header>
                    An Accordion Header
                </template>
                <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Iste suscipit a sint aspernatur libero alias deserunt
                    accusantium, eveniet exercitationem totam tempora iure eaque
                    repellendus cumque ab saepe. Quam, quis fugit.
                </div>
            </AppAccordion>
            <AppAccordion>
                <template v-slot:header>
                    A Second Accordion Header
                </template>
                <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Iste suscipit a sint aspernatur libero alias deserunt
                    accusantium, eveniet exercitationem totam tempora iure eaque
                    repellendus cumque ab saepe. Quam, quis fugit.
                </div>
            </AppAccordion>
            <AppAccordion>
                <template v-slot:header>
                    A Third Accordion Header
                </template>
                <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Iste suscipit a sint aspernatur libero alias deserunt
                    accusantium, eveniet exercitationem totam tempora iure eaque
                    repellendus cumque ab saepe. Quam, quis fugit.
                </div>
            </AppAccordion>
        </div>
    </Layout>
</template>
<script>
import AppAccordion from "~/components/AppAccordion"

export default {
    components: {
        AppAccordion
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
