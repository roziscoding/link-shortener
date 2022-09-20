<template>
  <div class="n-card-header__main">
    <n-space>
      {{ link.name }}
      <n-tag :type="tag.type">
        <template #icon>
          <n-icon size="12px" :component="tag.icon"> </n-icon>
        </template>
        {{ tag.text }}
      </n-tag>
    </n-space>
  </div>
</template>

<script lang="ts" setup>
  import { Link } from '@prisma/client'
  import { Lock, LockOpen } from '@vicons/fa'
  import { NIcon, NSpace, NTag } from 'naive-ui'
  import { computed, defineProps } from 'vue'

  type Props = {
    link: Link
  }

  const props = defineProps<Props>()
  const tag = computed(() =>
    props.link.public
      ? ({ type: 'success', text: 'Público', icon: LockOpen } as const)
      : ({ type: 'error', text: 'Privado', icon: Lock } as const)
  )
</script>
