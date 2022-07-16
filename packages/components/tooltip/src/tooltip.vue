<script lang="ts" setup>
import { reactive, toRefs } from 'vue';
import { objectKeys, pickProps } from '@vinicunca/js-utilities';

import VTooltipRoot from './root.vue';
import VTooltipArrow from './arrow.vue';
import VTooltipContent from './content.vue';
import VTooltipTrigger from './trigger.vue';
import { tooltipProps } from './tooltip';
import { tooltipArrowProps } from './arrow';
import { tooltipContentProps } from './content';
import { tooltipRootProps } from './root';
import { tooltipTriggerProps } from './trigger';

const props = defineProps(tooltipProps);

defineOptions({
  name: 'VTooltip',
});

const reactiveProps = toRefs(props);

const arrowProps = reactive(pickProps(reactiveProps, objectKeys(tooltipArrowProps)));

const contentProps = reactive(pickProps(reactiveProps, objectKeys(tooltipContentProps)));

const rootProps = reactive(pickProps(reactiveProps, objectKeys(tooltipRootProps)));

const triggerProps = reactive(pickProps(reactiveProps, objectKeys(tooltipTriggerProps)));
</script>

<template>
  <VTooltipRoot v-bind="rootProps">
    <template #default="{ isOpen }">
      <VTooltipTrigger v-bind="triggerProps" nowrap>
        <slot name="trigger" />
      </VTooltipTrigger>

      <Teleport :to="to" :disabled="!teleported">
        <template v-if="fullTransition">
          <Transition v-bind="transitionProps">
            <VTooltipContent v-if="alwaysOn || isOpen" v-bind="contentProps">
              <slot />
              <template #arrow="{ style, side }">
                <VTooltipArrow
                  v-if="showArrow"
                  v-bind="arrowProps"
                  :style="style"
                  :side="side"
                />
              </template>
            </VTooltipContent>
          </Transition>
        </template>

        <template v-else>
          <VTooltipContent v-if="alwaysOn || isOpen" v-bind="contentProps">
            <slot />
            <template #arrow="{ style, side }">
              <VTooltipArrow
                v-if="showArrow"
                v-bind="arrowProps"
                :style="style"
                :side="side"
              />
            </template>
          </VTooltipContent>
        </template>
      </Teleport>
    </template>
  </VTooltipRoot>
</template>
