<template>
  <button
    :class="[
      buttonClasses,
      buttonVariantClasses,
      buttonShadowClasses,
      { 'button--disabled': disabled },
    ]"
    class="button"
  >
    <slot />
  </button>
</template>
<script lang="ts" setup>
import { ButtonHTMLAttributes } from "vue";
import type { Colors, Variants, Sizes } from "@/types/theme";
import { getComponentClasses } from "@/utils";
interface AppButtonProps extends ButtonHTMLAttributes {
  color?: Colors;
  variant?: Variants;
  size?: Sizes;
  disabled?: boolean;
}
const props = withDefaults(defineProps<AppButtonProps>(), {
  color: "primary",
  variant: "outlined",
  size: "md",
  disabled: false,
});
const buttonClasses = getComponentClasses("button", [
  props.color,
  props.variant,
  props.size,
]);
const buttonVariantClasses = getComponentClasses(
  "button",
  [props.color],
  props.variant
);
const buttonShadowClasses = getComponentClasses(
  "button",
  [props.size],
  "shadow"
);
</script>
<style lang="scss" scoped>
$button-sizes: (
  sm: $gutter-sm,
  md: $gutter-md,
  xl: $gutter-xl,
);
$button-radius: (
  sm: $border-radius-xs,
  md: $border-radius-md,
  xl: $border-radius-xl,
);
$button-shadow: (
  sm: $shadow-xs,
  md: $shadow-md,
  xl: $shadow-xl,
);
$button-variants: (
  primary: $primary,
  secondary: $secondary,
  danger: $danger,
  success: $success,
);
$button-filled-variant: $button-variants;
$button-outlined-variant: $button-variants;
$button-text-variant: $button-variants;

.button {
  cursor: pointer;
  border: none;
  border-radius: $border-radius-md;
  &--disabled {
    cursor: default;
    background: rgba(gray, 30%) !important;
    color: white !important;
    border: transparent !important;
  }
  @each $prefix, $value in $button-filled-variant {
    &__filled {
      &--#{$prefix} {
        background: $value;
        color: white;
      }
    }
  }
  @each $prefix, $value in $button-outlined-variant {
    &__outlined {
      &--#{$prefix} {
        background: transparent;
        color: $value;
        border: 2px solid $value;
      }
    }
  }
  @each $prefix, $value in $button-text-variant {
    &__text {
      &--#{$prefix} {
        background: transparent;
        color: $value;
      }
    }
  }
  @each $size, $value in $button-sizes {
    &--#{$size} {
      padding: to-rem($value / 2) to-rem($value);
    }
  }
  @each $size, $value in $button-variants {
    &--#{$size} {
      border-radius: $value;
    }
  }
  @each $size, $value in $button-shadow {
    &--#{$size} {
      box-shadow: $value;
    }
  }
}
</style>
