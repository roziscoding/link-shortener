<template>
  <n-space justify="end">
    <n-button quaternary size="tiny" :href="link.url" target="_blank" tag="a">
      <template #icon>
        <n-icon>
          <ExternalLinkAlt />
        </n-icon>
      </template>
      Abrir
    </n-button>
    <n-button quaternary size="tiny">
      <template #icon>
        <n-icon :component="icon" />
      </template>
      Tornar {{ text }}
    </n-button>
    <n-button quaternary size="tiny" type="error">
      <template #icon>
        <n-icon :component="Trash" />
      </template>
      Excluir
    </n-button>
  </n-space>
</template>

<script lang="ts" setup>
  import { Link } from '@prisma/client'
  import { ExternalLinkAlt, Lock, LockOpen, Trash } from '@vicons/fa'
  import { NButton, NIcon, NSpace } from 'naive-ui'
  import { computed, defineProps } from 'vue'

  export type Props = {
    link: Link
  }

  const props = defineProps<Props>()

  const icon = computed(() => (props.link.public ? Lock : LockOpen))
  const text = computed(() => (props.link.public ? 'privado' : 'público'))
</script>
