<template>
  <div>
    <n-config-provider :theme="darkTheme">
      <n-layout position="absolute" class="root-layout">
        <app-navbar :user="user" />
        <n-layout-content class="main-content">
          <NuxtPage />
        </n-layout-content>
      </n-layout>
    </n-config-provider>
  </div>
</template>

<script lang="ts" setup>
  import { darkTheme, NConfigProvider, NLayout, NLayoutContent } from 'naive-ui'

  const user = useUser()
</script>

<style>
  .main-content {
    padding: 0 32px 0 32px;
  }
</style>
