<template>
    <div>
        <main
            id="main-content"
        >
            <slot />
        </main>
    </div>


</template>
<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>
