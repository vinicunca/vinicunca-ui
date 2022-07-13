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

          <NuxtLink to="/about">
            about
          </NuxtLink>

          <BaseHamburger v-model="navIsOpen" class="ml-auto" />
        </div>
      </div>
    </div>
  </div>
</template>
