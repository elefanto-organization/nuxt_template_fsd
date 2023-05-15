<template>
  <div class="sign" :style="{ width: contentWidth }">
    <h1 class="sign__title">Логин</h1>
    <form class="sign__form" @submit.prevent="onSubmit">
      <app-form-item
        label="Email"
        message-type="danger"
        :message="errors.email"
      >
        <Field v-slot="{ field, meta }" name="email" label="Логин">
          <app-input
            :invalid="!meta.valid && meta.dirty"
            v-bind="field"
            placeholder="Логин"
          />
        </Field>
      </app-form-item>
      <Field v-slot="{ field }" name="password" type="password">
        <app-form-item
          message-type="danger"
          :message="errors.password"
          label="Пароль"
        >
          <app-input
            v-model:value="values.password"
            v-bind="field"
            placeholder="Пароль"
          />
        </app-form-item>
      </Field>
      <app-button :disabled="isSubmitting" type="submit">Войти</app-button>
      <nuxt-link>Забыли пароль</nuxt-link>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useForm, configure, Field } from "vee-validate";
import { computed, signInScheme } from "#imports";
import AppFormItem from "components/ui/app-form-item.vue";
import AppInput from "components/ui/app-input/app-input.vue";
import AppButton from "components/ui/app-button/app-button.vue";
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
const { handleSubmit, errors, values, isSubmitting } = useForm<FormValues>({
  initialValues: {
    email: "",
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
