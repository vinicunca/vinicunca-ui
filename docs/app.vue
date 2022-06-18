<script lang="ts" setup>
</script>

<template>
  <Html lang="en">
    <Head>
      <Meta name="apple-mobile-web-app-title" content="Vinicunca" />
      <Meta name="application-name" content="Vinicunca" />
      <Meta name="msapplication-config" content="/favicons/browserconfig.xml" />
      <Link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
      <Link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
      <Link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
      <Link rel="manifest" href="/favicons/site.webmanifest" />
      <Link rel="shortcut icon" href="favicons/favicon.ico" />
      <Meta name="msapplication-TileColor" content="#da532c" />
      <Meta name="theme-color" content="#ffffff" />

      <Title>Vinicunca</Title>
    </Head>

    <Body class="antialiased text-slate-500 dark:text-slate-400">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>
