<template>
  <n-layout-header bordered class="nav">
    <n-text tag="div" class="ui-logo" :depth="1">Link Shortener</n-text>
    <n-space vertical>&nbsp;</n-space>
    <div class="nav-end">
      <n-button size="small" tag="div" quaternary class="nav-picker">
        {{ user.first_name }}
      </n-button>
    </div>
  </n-layout-header>
</template>
<script lang="ts" setup>
  import { NButton, NLayoutHeader, NSpace, NText } from 'naive-ui'
  import { TelegramLoginPayload } from 'node-telegram-login'
  import { defineProps } from 'vue'

  type Props = {
    user: Required<TelegramLoginPayload>
  }

  defineProps<Props>()
</script>

<style scoped>
  .nav {
    display: grid;
    align-items: center;
    padding: 0 32px;
    grid-template: 60px / auto 1fr auto;
  }

  .ui-logo {
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 18px;
  }

  .nav-end {
    display: flex;
    align-items: center;
  }

  .nav-picker {
    margin-right: 4px;
  }
  .nav-picker.padded {
    padding: 0 10px;
  }
  .nav-picker:last-child {
    margin-right: 0;
  }
</style>
