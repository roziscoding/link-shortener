<template>
  <div class="user-menu-activator link" @click="toggle">{{ name }}</div>
  <div class="user-menu" :class="menuClass">
    <div class="link" @click="logout">Logout</div>
  </div>
</template>

<script lang="ts" setup>
import { Auth0Plugin } from '@/plugins/auth'
import { computed, ref } from 'vue'

const props = defineProps<{ auth0: Auth0Plugin }>()
const isMenuVisible = ref(false)
const menuClass = computed(() => isMenuVisible.value ? 'user-menu-visible' : 'user-menu-hidden')
const name = computed(() => props.auth0.user.value?.name ?? 'Loading...')

const toggle = () => {
  isMenuVisible.value = !isMenuVisible.value
}

const logout = () => props.auth0.logout()
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.user-menu {
  background-color: $dark-bg-color;
  padding: 0 1em 0 1em;

  &-activator {
    text-align: center;
  }

  &-hidden {
    height: 0;
    overflow: hidden;
  }

  a {
    text-align: center;
    color: white;
    text-decoration: none;
  }

  .router-link-active {
    color: $orange;
  }
}
</style>