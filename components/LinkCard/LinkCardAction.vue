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
    <n-button quaternary size="tiny" @click="togglePublic">
      <template #icon>
        <n-icon :component="icon" />
      </template>
      Tornar {{ text }}
    </n-button>
    <n-button quaternary size="tiny" type="error" @click="deleteLink">
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
  import { NButton, NIcon, NSpace, useDialog, useMessage } from 'naive-ui'
  import { computed, defineProps } from 'vue'

  export type Props = {
    link: Link
  }

  const props = defineProps<Props>()
  const emit = defineEmits(['refresh'])
  const icon = computed(() => (props.link.public ? Lock : LockOpen))
  const text = computed(() => (props.link.public ? 'privado' : 'público'))

  const dialog = useDialog()
  const message = useMessage()
  const deleteLink = async () => {
    const d = dialog.warning({
      title: 'Tem certeza?',
      content: `Deseja realmente excluir "${props.link.name}"? Essa ação não pode ser desfeita.`,
      positiveText: 'Excluir',
      negativeText: 'Cancelar',
      onPositiveClick: async () => {
        d.loading = true
        await $fetch(`/api/${props.link.shortcode}`, {
          method: 'DELETE',
          headers: {
            Authorization: useToken().value
          }
        })
          .then(() => {
            d.loading = false
            message.success('Link excluído com sucesso')
            emit('refresh')
          })
          .catch((err) => {
            d.loading = false
            console.error(err)
            message.error('Erro ao excluir link')
          })
      }
    })
  }

  const togglePublic = async () =>
    $fetch(`/api/${props.link.shortcode}`, {
      method: 'PUT',
      body: {
        isPublic: !props.link.public
      },
      headers: {
        Authorization: useToken().value
      }
    }).then(() => {
      emit('refresh')
    })
</script>
