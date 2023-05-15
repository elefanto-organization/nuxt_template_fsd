<template>
  <teleport to="body">
    <transition name="fadeInModalOverlay" mode="out-in">
      <div v-if="isOpen" class="modal__overlay" @click="onClose" />
    </transition>
    <transition name="fadeIn">
      <div v-if="isOpen" class="modal">
        <div
          class="modal__content"
          :class="modalContentClasses"
          :style="{ width: `${contentWidth}px` }"
        >
          <span
            class="modal__close"
            aria-label="close"
            role="button"
            @click="onClose"
          >
            &times;
          </span>
          <slot />
        </div>
      </div>
    </transition>
  </teleport>
</template>
<script lang="ts" setup>
import { getComponentClasses } from "shared/utils";
import { Sizes } from "shared/types/theme";

interface ModalContainerProps {
  isOpen: boolean;
  size?: Sizes;
  contentWidth?: number;
}
type ModalContainerEmit = {
  (event: "update:is-open", payload: boolean): void;
};

const props = withDefaults(defineProps<ModalContainerProps>(), {
  isOpen: false,
  size: "md",
  contentWidth: 300,
});
const emit = defineEmits<ModalContainerEmit>();
const onClose = () => {
  emit("update:is-open", false);
};
const modalContentClasses = getComponentClasses(
  "modal",
  [props.size],
  "content"
);
</script>
<style lang="scss" scoped>
$modalContentBorderRadius: (
  sm: $border-radius-xs,
  md: $border-radius-md,
  xl: $border-radius-xl,
);
.modal {
  position: absolute;
  inset: 0;
  height: 100%;
  &--inactive {
    display: none;
  }
  &--active {
    display: block;
  }
  &__overlay {
    position: absolute;
    z-index: 10;
    inset: 0;
    background-color: rgba(#000000, 40%);
    cursor: pointer;
  }
  &__content {
    @each $prefix, $size in $modalContentBorderRadius {
      &--#{$prefix} {
        border-radius: $size;
      }
    }
    padding: to-rem($gutter-md);
    z-index: 20;
    position: relative;
    background: #fff;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 50%;
  }
  &__close {
    position: absolute;
    top: to-rem(5);
    right: to-rem(5);
    font-size: to-rem(18);
    cursor: pointer;
  }
}

@keyframes fadeInModalOverlay {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}

.fadeInModalOverlay-enter-active {
  animation: fadeInModalOverlay 0.3s ease forwards;
}
.fadeInModalOverlay-leave-active {
  animation: fadeInModalOverlay 0.3s ease reverse;
}
</style>
