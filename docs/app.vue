<script lang="ts" setup>
// TODO: enable this when ready
const socialCardLarge = ref('');
const description = ref('');
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

      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:site" content="@praburangki" />
      <Meta name="twitter:description" :content="description" />
      <Meta name="twitter:image" :content="socialCardLarge" />
      <Meta name="twitter:creator" content="@praburangki" />
      <Meta
        key="og:url"
        property="og:url"
        content="{`https://vinicunca.dev${router.pathname}`}"
      />
      <meta key="og:type" property="og:type" content="article" />
      <meta key="og:description" property="og:description" :content="description" />
      <meta
        key="og:image"
        property="og:image"
        content="{`https://vinicunca.dev${socialCardLarge}`}"
      />
      <link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="/feeds/feed.xml" />
      <link rel="alternate" type="application/atom+xml" title="Atom 1.0" href="/feeds/atom.xml" />
      <link rel="alternate" type="application/json" title="JSON Feed" href="/feeds/feed.json" />

      <Title>Vinicunca</Title>
    </Head>

    <Body class="antialiased text-slate-500 dark:text-slate-400">
      <NuxtPage />
    </Body>
  </Html>
</template>
