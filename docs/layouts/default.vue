<script lang="ts" setup>
// const { data: navigation } = await useAsyncData<any>('navigation', () => fetchContentNavigation(catsQuery));

// const navComponents = computed(()=> navigation.value.)

// console.log('🚀 ~ itu', itu);
// import qwe from '@nuxt/content'
</script>

<template>
  <div class="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
    <div class="hidden lg:block fixed z-20 inset-0 top-[3.8125rem] left-[max(0px,calc(50%-45rem))] right-auto w-[19.5rem] pb-10 px-8 overflow-y-auto">
      <nav>
        <!-- <div v-for="link of navigation" :key="link._path">
          <NuxtLink :to="link._path">
            {{ link }}
          </NuxtLink>
        </div> -->
      </nav>
    </div>

    <div class="lg:pl-[19.5rem]">
      <div class="max-w-3xl mx-auto pt-10 xl:max-w-none xl:ml-0 xl:mr-[15.5rem] xl:pr-16">
        <slot />
      </div>
    </div>
  </div>
</template>
