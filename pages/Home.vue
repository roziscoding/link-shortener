<template>
  <div>
    <h1>Hello, {{ user.first_name }}</h1>
    <div v-if="pending">Carregando links...</div>
    <div v-if="error">Erro ao carregar links: {{ error }}</div>
    <div v-if="links">
      Links:
      <ul>
        <li v-for="link of links" :key="link">{{ link }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
const token = useToken()
const user = useUser()

if (!token.value) await navigateTo({ path: '/login' })

const {
  data: links,
  error,
  pending
} = token.value
  ? await useFetch('/api/links', {
      headers: { Authorization: token.value }
    })
  : ({} as any)
</script>
