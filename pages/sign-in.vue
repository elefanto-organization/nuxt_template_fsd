<template>
  <div class="auth">
    <sign-in-form />
  </div>
</template>
<script lang="ts" setup>
import SignInForm from "~~/entities/sesion/ui/sign-in-form.vue";
</script>
<style lang="scss" scoped>
.auth {
  height: 100vh;
  width: 100%;
  @include flex(row, 0, center, center);
}
</style>
