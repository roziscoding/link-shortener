<template>
  <div>
    <n-config-provider :theme="darkTheme">
      <NuxtPage />
    </n-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { darkTheme, NConfigProvider } from 'naive-ui'
</script>