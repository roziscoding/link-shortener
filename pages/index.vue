<template>
  <div>
    <div v-if="pending">Carregando links...</div>
    <div v-if="error">Erro ao carregar links: {{ error }}</div>
    <div v-if="links">
      <h1>Links</h1>
      <n-grid :cols="4">
        <n-gi v-for="link of links" :key="link">
          <n-card :title="link">
            {{ link }}
          </n-card>
        </n-gi>
      </n-grid>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { NCard, NGi, NGrid } from 'naive-ui'
  const token = useToken()

  if (!token.value) await navigateTo({ path: '/login' })

  const {
    data: links,
    error,
    pending
  } = await useFetch('/api/links', {
    headers: { Authorization: token.value }
  })
</script>
