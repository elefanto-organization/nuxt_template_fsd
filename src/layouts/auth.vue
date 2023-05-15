<template>
  <div class="auth-layout">
    <slot />
  </div>
</template>
<style lang="scss">
.auth-layout {
  height: 100vh;
  width: 100%;
  @include flex("row", 0, "justify-center", "center");
}
</style>
