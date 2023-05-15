<template>
  <div ref="selectRef" class="select">
    <div
      ref="selectControlRef"
      class="select__control"
      :class="selectControlClasses"
      @click="isOpen = !isOpen"
    >
      <template v-if="isMultiple">
        <div class="select__control--multiple">
          <span
            v-for="item of selectedValue"
            :key="item.label"
            class="select__control__label"
            :class="selectOptionItemLabelMultipleClasses"
          >
            {{ item.label }}
            <div
              class="select__control__label--delete"
              @click.stop="handleDelete(item)"
            >
              x
            </div>
          </span>
        </div>
      </template>
      <template v-else>
        <span class="select__control__label">{{ selectedValue.label }}</span>
      </template>
      <div class="select__icon-block">
        <button
          v-if="clearable"
          class="select__icon-block__clear"
          @click.stop="handleClear"
        >
          x
        </button>
        <slot name="control-icon">
          <img
            class="select__icon-block__icon"
            :class="{ 'select__icon-block__icon--reverse': isOpen }"
            src="@/assets/icons/chevron-down.svg"
            alt="chevron"
          />
        </slot>
      </div>
    </div>
    <transition name="selectSlideDown">
      <ul v-if="isOpen" class="select__options" :class="selectOptionClasses">
        <li
          v-for="option of options"
          :key="option.id"
          class="select__options__item"
          :class="{
            'select__options__item--disabled': isSameOption(option.id),
          }"
          @click.stop="handleSelectChange(option)"
        >
          <span
            class="select__options__item__label"
            :class="selectOptionItemLabelClasses"
          >
            {{ selectOptionLabel(option) }}
          </span>
        </li>
      </ul>
    </transition>
  </div>
</template>
<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";
import { getComponentClasses } from "utils";
import type { Colors, Sizes } from "types/theme";
import { getValueBySelector } from "components/ui/app-select/utils";
interface SelectOption {
  id: string | number;
  label: string;
  [key: string]: unknown;
}
interface Props {
  size?: Sizes;
  color?: Colors;
  options: SelectOption[];
  modelValue: SelectOption | SelectOption[];
  optionLabel?: keyof SelectOption;
  optionValue?: string;
  multiple?: boolean;
  placeholder?: string;
  clearable?: boolean;
}
interface SelectEmit {
  (event: "update:modelValue", payload: unknown): void;
}
const emit = defineEmits<SelectEmit>();
const props = withDefaults(defineProps<Props>(), {
  size: "sm",
  color: "primary",
  multiple: false,
  placeholder: "Select your option",
  clearable: false,
});

const selectedValue = computed(() => {
  if (!props.modelValue) return props.placeholder ?? "";
  if (Array.isArray(props.modelValue)) {
    if (!props.multiple)
      return new Error(
        "multiple props not passed but required after passing model value arrays"
      );
    return props.modelValue.map((item) => ({
      ...item,
      label: getValueBySelector(item, props.optionLabel ?? "label") as string,
    }));
  }
  return {
    ...props.modelValue,
    label: getValueBySelector(
      props.modelValue,
      props.optionLabel ?? "label"
    ) as string,
  };
});
const isSameOption = (id: string | number) => {
  if (Array.isArray(props.modelValue)) {
    if (!props.multiple)
      return new Error(
        "multiple props not passed but required after passing model value arrays"
      );
    return props.modelValue.some((item) => item.id === id);
  }
  return props.modelValue.id === id;
};
const isMultiple = computed(() => props.multiple);
const selectControlRef = useState<HTMLDivElement | null>(() => null);
const selectRef = useState<HTMLDivElement | null>(() => null);
const isOpen = ref(false);

const handleSelectChange = (option: SelectOption) => {
  const value = !props.optionValue
    ? option
    : getValueBySelector(option, props.optionValue);
  if (Array.isArray(props.modelValue)) {
    if (isSameOption(option.id)) return;
    emit("update:modelValue", [...props.modelValue, option]);
    return;
  }

  emit("update:modelValue", value);
  isOpen.value = false;
};
const handleDelete = (option: SelectOption) => {
  if (Array.isArray(props.modelValue)) {
    const filteredOptions = props.modelValue.filter(
      (item) => item.id !== option.id
    );
    emit("update:modelValue", filteredOptions);
  }
};
const handleClear = () => {
  const value = Array.isArray(props.modelValue) ? [] : null;
  emit("update:modelValue", value);
  isOpen.value = false;
};
const selectControlClasses = getComponentClasses(
  "select",
  [props.size, props.color],
  "control"
);
const selectOptionClasses = getComponentClasses(
  "select",
  [props.size, props.color],
  "options"
);
const selectOptionItemLabelClasses = getComponentClasses(
  "select",
  [props.size, props.color],
  "options__item__label"
);
const selectOptionItemLabelMultipleClasses = getComponentClasses(
  "select",
  [props.size, props.color],
  "control__label--multiple"
);
const selectOptionLabel = (option: SelectOption) => {
  return getValueBySelector(option, props.optionLabel ?? "label") as string;
};
onClickOutside(selectRef, () => {
  isOpen.value = false;
});
</script>
<style lang="scss" scoped>
$selectBorderRadius: (
  sm: $border-radius-xs,
  md: $border-radius-md,
  xl: $border-radius-xl,
);
$selectColors: (
  primary: $primary,
  secondary: $secondary,
  danger: $danger,
);
$selectOptionLabelHover: (
  primary: darken($primary, 20%),
  secondary: darken($secondary, 20%),
  danger: darken($danger, 20%),
);
$selectBorderColors: (
  primary: darken($primary, 20%),
  secondary: darken($secondary, 20%),
  danger: darken($danger, 20%),
);
.select {
  position: relative;
  z-index: 10;
  font-family: sans-serif;
  &__control {
    position: relative;
    z-index: 10;
    cursor: pointer;
    width: 100%;
    @include flex(row, 0, space-between, center);
    padding: to-rem(5) to-rem(10);
    border: 1px solid;
    &--multiple {
      @include flex(row, 10);
    }
    &__label {
      @include flex(row, 10);
    }
    &__label--multiple {
      @each $prefix, $size in $selectBorderRadius {
        &--#{$prefix} {
          padding: calc($size / 2) $size;
          border-radius: $size;
        }
      }
      @each $prefix, $color in $selectBorderColors {
        &--#{$prefix} {
          background: darken($color, 20%);
          color: lighten($color, 30%);
        }
      }
    }
    @each $prefix, $color in $selectColors {
      &--#{$prefix} {
        border-color: $color;
      }
    }
    @each $prefix, $size in $selectBorderRadius {
      &--#{$prefix} {
        border-radius: $size;
      }
    }
  }
  &__icon {
    &-block {
      @include flex(row, 10, flex-start, center);
      &__clear {
        cursor: pointer;
        font-size: to-rem(18);
        border: none;
        background: transparent;
      }
      &__icon {
        width: to-rem(24);
        height: to-rem(24);
        transition: transform 0.3s ease;
        &--reverse {
          transform: rotate(-180deg);
        }
      }
    }
  }
  &__options {
    max-height: 150px;
    overflow-y: scroll;
    margin-top: 20px;
    position: absolute;
    z-index: 99;
    width: 100%;
    @include flex(column, 10);
    @each $prefix, $color in $selectBorderColors {
      &--#{$prefix} {
        border: 1px solid $color;
      }
    }
    @each $prefix, $size in $selectBorderRadius {
      &--#{$prefix} {
        border-radius: $size;
        padding: $size;
      }
    }
    @each $prefix, $color in $selectColors {
      &--#{$prefix} {
        background: $color;
      }
    }
    &__item {
      list-style: none;
      cursor: pointer;
      width: 100%;
      &--disabled {
        cursor: not-allowed;
        color: darken($primary, 30%);
      }
      &__label {
        display: inline-block;
        transition: background 0.3s ease;
        @each $prefix, $size in $selectBorderRadius {
          &--#{$prefix} {
            padding: 0 10px;
            width: calc(100% + calc($size + $size));
            margin: 0 -#{$size};
          }
        }
        @each $prefix, $color in $selectOptionLabelHover {
          &--#{$prefix} {
            &:hover {
              background-color: $color;
            }
          }
        }
      }
    }
  }
}
</style>
