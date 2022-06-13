<template>
  <NavBar v-if="auth0.isAuthenticated && !auth0.isLoading" />
  <main>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in" :duration="100">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth0 } from './plugins/auth'
import NavBar from '@/components/NavBar.vue'

const auth0 = useAuth0()

onMounted(async () => {
  await auth0.createClient()
  await auth0.handleCallback()
})
</script>

<style scoped lang="scss">
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
