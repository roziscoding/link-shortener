<template>
  <n-descriptions label-placement="top" :column="1">
    <n-descriptions-item>
      <template #label> URL </template>
      <n-tooltip trigger="click">
        <template #trigger>
          <n-text code @click="copy(link.url)">
            {{ link.url }} <n-icon size="12px"><ClipboardRegular /></n-icon>
          </n-text>
        </template>
        <span>Copiado</span>
      </n-tooltip>
    </n-descriptions-item>
    <n-descriptions-item>
      <template #label> Shortcode </template>
      <n-tooltip trigger="click">
        <template #trigger>
          <n-text code @click="copy(link.shortcode, true)">
            {{ link.shortcode }} <n-icon size="12px"><ClipboardRegular /></n-icon>
          </n-text>
        </template>
        <span>Copiado</span>
      </n-tooltip>
    </n-descriptions-item>
  </n-descriptions>
</template>

<script lang="ts" setup>
  import { Link } from '@prisma/client'
  import { ClipboardRegular } from '@vicons/fa'
  import { NDescriptions, NDescriptionsItem, NIcon, NText, NTooltip } from 'naive-ui'
  import { defineProps } from 'vue'

  // const message = useMessage()

  type Props = {
    link: Link
  }

  defineProps<Props>()

  const copy = async (text: string, appendBase = false) => {
    const toBeCopied = appendBase ? `${window.location.origin}/${text}` : text
    await navigator.clipboard.writeText(toBeCopied)
    // message.success('Link copiado', { icon: () => h(NIcon, null, { default: () => h(CheckCircle) }) })
  }
</script>

<style scoped>
  .n-text--code {
    cursor: pointer;
  }
</style>
