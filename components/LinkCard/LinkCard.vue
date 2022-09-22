<template>
  <n-card size="small" :segmented="{ content: true, footer: 'soft' }">
    <template #header>
      <link-card-header :link="link" />
    </template>
    <link-card-content :link="link" />
    <template #action>
      <link-card-action @refresh="emit('refresh')" :link="link" />
    </template>
  </n-card>
</template>

<script lang="ts" setup>
  import { definePreviews } from '@previewjs/plugin-vue3/setup'
  import { Link } from '@prisma/client'
  import { NCard } from 'naive-ui'
  import { defineProps } from 'vue'
  import LinkCardAction from './LinkCardAction.vue'
  import LinkCardContent from './LinkCardContent.vue'
  import LinkCardHeader from './LinkCardHeader.vue'

  export type Props = {
    link: Link
  }

  const emit = defineEmits(['refresh'])
  defineProps<Props>()
  definePreviews<Props>({
    private: {
      link: {
        id: '6329f5125e597672fe3c17d7',
        shortcode: 'wa',
        url: 'https://wa.me/+5511999999999',
        name: 'WhatsApp',
        public: false
      }
    },
    public: {
      link: {
        id: '6329f5125e597672fe3c17d8',
        shortcode: 'telegram',
        url: 'https://roziscoding.t.me',
        name: 'Telegram',
        public: true
      }
    }
  })
</script>
