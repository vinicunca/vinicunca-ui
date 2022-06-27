<script lang="ts" setup>
const route = useRoute();

const navIsOpen = ref(false);

watch(() => route.path, () => {
  navIsOpen.value = false;
});
</script>

<template>
  <main>
    <ContentDoc />
  </main>
</template>
