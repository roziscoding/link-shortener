<template>
  <div>
    <n-modal v-model:show="newLinkModal">
      <n-card style="width: 600px" title="Novo link" :bordered="false" role="dialog" aria-modal="true">
        <n-form :model="newLink">
          <n-form-item label="Nome" path="name">
            <n-input v-model:value="newLink.name" placeholder="" />
          </n-form-item>
          <n-form-item label="Shortcode" path="shortcode">
            <n-input v-model:value="newLink.shortcode" placeholder="" />
          </n-form-item>
          <n-form-item label="URL" path="url">
            <n-input v-model:value="newLink.url" placeholder="" />
          </n-form-item>
          <n-form-item label="Tipo" path="isPublic">
            <n-radio-group v-model:value="newLink.isPublic" name="radiobuttongroup1">
              <n-radio-button :value="true" label="Público" />
              <n-radio-button :value="false" label="Privado" />
            </n-radio-group>
            <!-- <n-switch v-model:value="newLink.isPublic" size="medium">
              <template #checked> Público </template>
              <template #unchecked> Privado </template>
              <template #checked-icon>
                <n-icon :component="LockOpen" size="12px" />
              </template>
              <template #unchecked-icon>
                <n-icon :component="Lock" size="12px" />
              </template>
            </n-switch> -->
          </n-form-item>
          <!-- <n-form-item label="Público" path="name">
            <n-input v-model:value="newLink.name" />
          </n-form-item> -->
        </n-form>
        <template #action>
          <n-space justify="end">
            <n-button @click="clearNewLink(true)">Cancelar</n-button>
            <n-button type="success">Salvar</n-button>
          </n-space>
        </template>
      </n-card>
    </n-modal>
    <n-space align="baseline">
      <h1>Links</h1>
      <n-button size="tiny" quaternary @click="refresh()" :disabled="pending">
        <n-icon :component="Refresh"></n-icon>
      </n-button>
      <n-button size="tiny" quaternary @click="newLinkModal = !newLinkModal" :disabled="pending">
        <n-icon :component="Plus"></n-icon>
      </n-button>
    </n-space>
    <div v-if="pending">Carregando links...</div>
    <div v-if="!pending && !error && links && (links as Link[]).length === 0">Nenhum link cadastrado</div>
    <div v-if="error">Erro ao carregar links: {{ error }}</div>
    <div v-if="links">
      <n-grid :cols="cols" :x-gap="12" :y-gap="12">
        <n-gi v-for="link of links" :key="link.shortcode">
          <link-card @refresh="refresh()" :link="link" />
        </n-gi>
      </n-grid>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Link } from '@prisma/client'
  import { Plus, Refresh } from '@vicons/tabler'
  import { useWindowSize } from '@vueuse/core'
  import {
    NButton,
    NCard,
    NForm,
    NFormItem,
    NGi,
    NGrid,
    NIcon,
    NInput,
    NModal,
    NRadioButton,
    NRadioGroup,
    NSpace
  } from 'naive-ui'
  import { computed } from 'vue'

  const token = useToken()
  const windowSize = useWindowSize()
  const cols = computed(() => Math.floor(Math.max(windowSize.width.value / 360, 1)))
  const newLinkModal = ref(false)
  const newLink = ref({
    name: '',
    shortcode: '',
    url: '',
    isPublic: false
  })

  const clearNewLink = (closeModal = false) => {
    newLink.value.name = ''
    newLink.value.shortcode = ''
    newLink.value.url = ''
    newLink.value.isPublic = false
    if (closeModal) newLinkModal.value = false
  }

  if (!token.value) await navigateTo('/login')

  const {
    data: links,
    error,
    pending,
    refresh
  } = await useFetch('/api/links', {
    headers: { Authorization: token.value }
  })

  if (error.value && error.value !== true && error.value.data.statusCode === 401) {
    navigateTo('/login')
  }
</script>
