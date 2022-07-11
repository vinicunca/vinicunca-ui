<script lang="ts" setup>
// TODO: Implement a11y https://www.w3.org/WAI/ARIA/apg/example-index/dialog-modal/dialog.html

import { computed, ref } from 'vue';
import { convertToUnit } from '@vinicunca/js-utilities';
import { VOverlay } from '@vinicunca/components/overlay';
import { VFocusTrap } from '@vinicunca/components/focus-trap';
import { useDialog } from '@vinicunca/components/dialog';

import { drawerProps } from './drawer';

const props = defineProps(drawerProps);

defineOptions({
  name: 'VDrawer',
});

const refDrawer = ref<HTMLElement>();
const refFocusStart = ref<HTMLElement>();

const isHorizontal = computed(
  () => ['RTL', 'LTR'].includes(props.direction),
);
const drawerSize = computed(() => convertToUnit(props.size));

const {
  afterEnter,
  afterLeave,
  beforeLeave,
  onClickModal,
  onCloseRequested,
  titleId,
  bodyId,
  isRendered,
  isVisible,
  zIndex,
} = useDialog({ props, refTarget: refDrawer });
</script>

<template>
  <Teleport to="body" :disabled="!appendToBody">
    <Transition
      @after-enter="afterEnter"
      @after-leave="afterLeave"
      @before-leave="beforeLeave"
    >
      <VOverlay
        v-show="isVisible"
        :mask="modal"
        :overlay-class="classModal"
        :z-index="zIndex"
        @click="onClickModal"
      >
        <VFocusTrap
          loop
          :trapped="isVisible"
          :el-focus-trap="refDrawer"
          :el-focus-start="refFocusStart"
          @release-requested="onCloseRequested"
        >
          <div
            ref="refDrawer"
            :style="
              isHorizontal ? 'width: ' + drawerSize : 'height: ' + drawerSize
            "
            aria-modal="true"
            role="dialog"
            :aria-describedby="bodyId"
            :aria-label="title || undefined"
            :aria-labelledby="!title ? titleId : undefined"
          >
            <span ref="refFocusStart" tabindex="-1" />

            <template v-if="isRendered">
              <div :id="bodyId">
                <slot />
              </div>
            </template>
          </div>
        </VFocusTrap>
      </VOverlay>
    </Transition>
  </Teleport>
</template>
