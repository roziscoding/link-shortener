<template>
  <div>
    <div v-if="!error">Carregando...</div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script lang="ts" setup>
refreshNuxtData()
const query = useRoute().query
const error = ref<string | false>(false)
const authResponse = await $fetch('/api/login', { method: 'post', body: query })
  .then((response) => ({ ok: true as const, ...response }))
  .catch((err) => ({ ok: false as const, err }))

if (authResponse.ok) {
  const token = useToken()
  const userData = useUser()
  token.value = authResponse.token
  userData.value = authResponse.data

  await navigateTo({ path: '/home' })
}
</script>
