<script lang="ts" setup>
import { provide, ref } from 'vue';
import VOverlay from '@vinicunca/components/overlay';
import VFocusTrap from '@vinicunca/components/focus-trap';
import { INJECTION_DIALOG } from '@vinicunca/tokens';

import { useDialog } from './use-dialog';
import { dialogEmits, dialogProps } from './dialog';

const props = defineProps(dialogProps);
defineEmits(dialogEmits);

defineOptions({
  name: 'VDialog',
});

const refDialog = ref<HTMLElement>();
const refHeader = ref<HTMLElement>();
const refDialogContent = ref();

const {
  visible,
  titleId,
  bodyId,
  style,
  rendered,
  zIndex,
  afterEnter,
  afterLeave,
  beforeLeave,
  handleClose,
  onModalClick,
  onOpenAutoFocus,
  onCloseAutoFocus,
  onCloseRequested,
} = useDialog({ props, refTarget: refDialog });

provide(INJECTION_DIALOG, {
  refDialog,
  refHeader,
  bodyId,
  rendered,
  style,
});
</script>

<template>
  <Teleport to="body" :disabled="!appendToBody">
    <Transition
      name="dialog-fade"
      @after-enter="afterEnter"
      @after-leave="afterLeave"
      @before-leave="beforeLeave"
    >
      <VOverlay
        v-show="visible"
        custom-mask-event
        :mask="modal"
        :class-overlay="modalClass"
        :z-index="zIndex"
      >
        <div
          role="dialog"
          aria-modal="true"
          :aria-label="title || undefined"
          :aria-labelledby="!title ? titleId : undefined"
          :aria-describedby="bodyId"
          @click="overlayEvent.onClick"
          @mousedown="overlayEvent.onMousedown"
          @mouseup="overlayEvent.onMouseup"
        >
          <VFocusTrap
            loop
            :trapped="visible"
            el-focus-start="container"
            @focus-after-trapped="onOpenAutoFocus"
            @focus-after-released="onCloseAutoFocus"
            @release-requested="onCloseRequested"
          >
          </VFocusTrap>
        </div>
      </VOverlay>
    </Transition>
  </Teleport>
</template>
