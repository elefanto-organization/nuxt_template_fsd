<template>
  <div class="sign" :style="{ width: contentWidth }">
    <h1 class="sign__title">Логин</h1>
    <form class="sign__form" @submit.prevent="onSubmit">
      <Field
        v-slot="{ field, meta }"
        validate-on-change
        name="email"
        label="Логин"
      >
        <app-form-item
          label="Email"
          message-type="danger"
          :message="errors.email"
        >
          <pre>{{ errors }}</pre>
          <app-input
            v-bind="field"
            :invalid="!meta.valid && meta.dirty"
            placeholder="Логин"
          />
        </app-form-item>
      </Field>

      <app-form-item
        message-type="danger"
        :message="errors.password"
        label="Пароль"
      >
        <Field v-slot="{ field }" name="password" type="password">
          <app-input
            v-model:value="field.value"
            :name="field.name"
            placeholder="Пароль"
          />
        </Field>
      </app-form-item>

      <app-button :disabled="isSubmitting" type="submit">Войти</app-button>
      <nuxt-link>Забыли пароль</nuxt-link>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useForm, configure, Field } from "vee-validate";
import { computed } from "#imports";
import AppFormItem from "~~/shared/ui/app-form-item.vue";
import AppInput from "shared/ui/app-input/app-input.vue";
import AppButton from "shared/ui/app-button/app-button.vue";
import { signInScheme } from "shared/utils/validation-schemes";

interface Props {
  width?: number | string;
}
interface FormValues {
  email: string;
  password: string;
}
configure({
  validateOnChange: true,
});
const props = withDefaults(defineProps<Props>(), {
  width: 400,
});
const { handleSubmit, errors, isSubmitting } = useForm<FormValues>({
  initialValues: {
    email: "login",
    password: "",
  },
  validationSchema: signInScheme,
  keepValuesOnUnmount: true,
  validateOnMount: false,
});
const onSubmit = handleSubmit(
  (values) => {
    console.log(values);
  },
  () => {}
);
const contentWidth = computed(() => `${props.width}px`);
</script>
<style lang="scss" scoped>
.sign {
  font-family: Roboto;
  background: white;
  border-radius: $border-radius-xs;
  box-shadow: $shadow-md;
  padding: to-rem($gutter-sm) to-rem($gutter-md);
  @include flex(column, 10, center, center);
  &__form {
    width: 100%;
    @include flex(column, 20, center, center);
  }
}
</style>
