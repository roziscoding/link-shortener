<template>
  <n-layout position="absolute" class="root-layout">
    <n-config-provider :theme="darkTheme">
      <slot />
    </n-config-provider>
  </n-layout>
</template>
<script lang="ts" setup>
  import { darkTheme, NConfigProvider, NLayout } from 'naive-ui'
</script>
