<template>
  <div class="radio">
    {{ modelValue }}
    <input
      :id="`radio-${labelId}`"
      v-model="model"
      class="radio__input"
      type="radio"
      :name="groupName"
      :value="value"
      :checked="isChecked"
    />
    <div class="radio__checkmark" :class="radioCheckMarkClasses" />
    <label :for="`radio-${labelId}`">Radio</label>
  </div>
</template>
<script lang="ts" setup>
import { Colors, Sizes } from "types/theme";
import { getComponentClasses, useUid } from "utils";

interface Props {
  color?: Colors;
  size?: Sizes;
  value: any;
  groupName: string;
  modelValue?: string;
}
const props = withDefaults(defineProps<Props>(), {
  color: "secondary",
  size: "md",
  modelValue: "",
});
const emit = defineEmits<{ (event: "update:modelValue", value: any): void }>();
const model = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});
const isChecked = computed(() => props.modelValue === props.value);
const labelId = useUid();
const radioCheckMarkSizeClasses = getComponentClasses(
  "radio",
  [props.size],
  "checkmark"
);
const radioCheckMarkColorClasses = getComponentClasses(
  "radio",
  [props.color],
  "checkmark"
);
const radioCheckMarkClasses = computed(() => [
  radioCheckMarkSizeClasses,
  radioCheckMarkColorClasses.split(" ").filter(() => isChecked.value),
]);
</script>
<style lang="scss" scoped>
$radioSizes: (
  sm: $gutter-sm,
  md: $gutter-md,
  xl: $gutter-xl,
);
$radioColors: (
  primary: $primary,
  secondary: $secondary,
);
.radio {
  font-family: sans-serif;
  @include flex(row, 10, initial, center);
  &__input {
    display: none;
  }
  label {
    cursor: pointer;
  }
  &__checkmark {
    @each $prefix, $size in $radioSizes {
      @debug "prefix #{$prefix}";
      &--#{$prefix} {
        @include circle($size, $size);
      }
    }
    @each $prefix, $color in $radioColors {
      border: 2px solid $color;
      &--#{$prefix} {
        @include flex(row, 0, center, center);
        position: relative;
        &::after {
          content: "";
          position: absolute;
          width: 90%;
          height: 90%;
          border-radius: 50%;
          background: $color;
        }
      }
    }
  }
}
</style>
