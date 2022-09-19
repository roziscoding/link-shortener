<template>
  <div>
    <ClientOnly>
      <telegram-login
        size="large"
        username="arrozbot"
        redirect-url="http://chatbot.roz.ninja/login/token"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
  onBeforeMount(() => {
    const token = useToken()
    if (token.value) navigateTo('/')
  })
</script>
