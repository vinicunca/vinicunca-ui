<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const navIsOpen = ref(false);

watch(() => route.path, () => {
  navIsOpen.value = false;
});
</script>

<template>
  <div class="sticky top-0 z-40 w-full backdrop-blur transition-colors duration-500 lg:(z-50 border-b border-slate-900/10) dark:border-slate-50/[0.06]">
    <div class="max-w-8xl mx-auto">
      <div class="px-4 py-4 border-b border-slate-900/10 lg:(px-8 border-0) dark:border-slate-300/10">
        <div class="relative flex items-center">
          <NuxtLink to="/">
            <span className="sr-only">Vinicunca home page</span>
            <AppLogo class="w-auto h-5" />
          </NuxtLink>

          <AppNavSearch />

          <a
            href="https://github.com/vinicunca/vinicunca-ui"
            title="Github"
            target="_blank"
            rel="noreferrer noopener"
            class="text-2xl text-slate-500 flex hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
          >
            <VIcon name="i-carbon-logo-github" />
          </a>

          <AppNavHamburger :is-active="navIsOpen" class="ml-4" @click="navIsOpen = !navIsOpen" />
        </div>
      </div>
    </div>
  </div>
</template>
