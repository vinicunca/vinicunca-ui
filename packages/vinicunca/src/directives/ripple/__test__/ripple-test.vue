<script lang="ts">
  import { defineComponent } from 'vue';
  import { Ripple } from '../index';

  export default defineComponent({
    directives: { Ripple },

    props: {
      ripple: {
        type: Boolean,
        default: true,
      },
    },
  });
</script>

<template>
  <div v-ripple="ripple" class="a" />
</template>
