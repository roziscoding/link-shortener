<template>
  <div>
    <div v-if="pending">Carregando links...</div>
    <div v-if="error">Erro ao carregar links: {{ error }}</div>
    <div v-if="links">
      <h1>Links</h1>
      <n-grid :cols="5" :x-gap="12">
        <n-gi v-for="link of links" :key="link.shortcode">
          <link-card :link="link" />
        </n-gi>
      </n-grid>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { NGi, NGrid } from 'naive-ui'
  const token = useToken()

  if (!token.value) await navigateTo('/login')

  const {
    data: links,
    error,
    pending
  } = await useFetch('/api/links', {
    headers: { Authorization: token.value }
  })

  if (error.value && error.value !== true && error.value.data.statusCode === 401) {
    navigateTo('/login')
  }
</script>
