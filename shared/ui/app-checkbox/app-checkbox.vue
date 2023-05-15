<template>
  <div class="checkbox" :class="checkboxClasses">
    <input
      :id="parsedName"
      v-model="model"
      class="checkbox__input"
      type="checkbox"
    />
    <label :for="parsedName" class="checkbox__label">
      <slot />
    </label>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "#imports";
import type { Colors, Sizes } from "~~/shared/types/theme";
import { getComponentClasses, useUid } from "~~/shared/utils";

interface Props {
  size?: Sizes;
  color?: Colors;
  value: boolean;
  name?: string;
}

interface CheckboxEmit {
  (event: "update:value", payload: boolean): void;
}
const props = withDefaults(defineProps<Props>(), {
  color: "primary",
  size: "md",
});
const emit = defineEmits<CheckboxEmit>();

const id = useUid();
const parsedName = computed(() => props.name ?? `checkbox-${id}`);
const checkboxClasses = getComponentClasses("checkbox", [
  props.color,
  props.size,
]);

const model = computed({
  get() {
    return props.value;
  },
  set(newValue: boolean) {
    emit("update:value", newValue);
  },
});
</script>
<style lang="scss" scoped>
$checkboxSizes: (
  sm: $gutter-sm,
  md: $gutter-md,
  xl: $gutter-xl,
);
.checkbox {
  font-family: sans-serif;
  $parent: &;
  @include flex(row, 10);
  position: relative;
  @each $unit, $size in $checkboxSizes {
    &--#{$unit} {
      .checkbox__label {
        &:after {
          @debug "#{$size}";
          @include pseudo($size, $size, absolute);
        }
      }
    }
  }
  &__input {
    display: none;
  }
  &__label {
    @include flex(row, 10);
    position: relative;
    margin-left: to-rem(30);
    cursor: pointer;
    &:after {
      border: 2px solid $primary;
      border-radius: 3px;
      @include flex(row, 0, center, center);
      background: transparent;
      left: to-rem(-30);
    }
  }
}
.checkbox__input:checked + .checkbox__label:after {
  background: transparent url("~~/assets/icons/checked.svg") no-repeat center
    center;
  background-size: cover;
}
</style>
