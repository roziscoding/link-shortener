<template>
  <div>
    <n-config-provider :theme="darkTheme">
      <n-message-provider>
        <n-layout position="absolute" class="root-layout">
          <app-navbar :user="user" />
          <n-layout-content class="main-content">
            <slot />
          </n-layout-content>
        </n-layout>
      </n-message-provider>
    </n-config-provider>
  </div>
</template>

<script lang="ts" setup>
  import { darkTheme, NConfigProvider, NLayout, NLayoutContent, NMessageProvider } from 'naive-ui'

  const user = useUser()
</script>

<style>
  .main-content {
    padding: 0 32px 0 32px;
  }
</style>
