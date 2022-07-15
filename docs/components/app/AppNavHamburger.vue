<script lang="ts" setup>
defineProps<{
  isActive: boolean;
}>();
</script>

<template>
  <button type="button" class="nav-hamburger w-[20px] flex flex-col justify-center" :class="{ 'is-active': isActive }">
    <span class="nav-hamburger__1" />
    <span class="nav-hamburger__2" />
    <span class="nav-hamburger__3" />
  </button>
</template>

<style lang="postcss" scoped>
  .nav-hamburger {
    > span {
      @apply rounded-[10px] h-[2px] my-[2px] w-full bg-slate-500 transition;

      &.nav-hamburger {
        &__1 {
          width: 50%;
        }
        &__3 {
          width: 75%;
        }
      }
    }

    &.is-active {
      .nav-hamburger {
        &__1 {
          transform-origin: bottom;
          transform: rotatez(45deg) translate(13px, 0px);
        }

        &__2 {
          transform-origin: top;
          transform: rotatez(-45deg);
        }

        &__3 {
          transform-origin: bottom;
          width: 50%;
          transform: translate(2px, -10px) rotatez(45deg);
        }
      }
    }
  }

  .nav-hamburger__1 {
    width: 50%;
  }

  /*

  .nav-hamburger__3 {
    @apply w-[75%]
  }

  .nav-hamburger.is-active span.nav-hamburger__1 {
    transform-origin: bottom;
    transform: rotate(45deg) translate(13px)
  }

  .nav-hamburger.is-active span.nav-hamburger__2 {
    transform-origin: top;
    transform: rotate(-45deg)
  }

  .nav-hamburger.is-active span.nav-hamburger__3 {
    transform-origin: bottom;
    width: 50%;
    transform: translate(2px,-10px) rotate(45deg)
  } */
</style>
