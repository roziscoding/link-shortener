<template>
  <slot v-if="auth0.isAuthenticated.value" :auth0="auth0"></slot>
  <slot name="unauthenticated" v-else :login="auth0.login"></slot>
</template>

<script lang="ts" setup>
import { useAuth0 } from '@/plugins/auth'

const auth0 = useAuth0()

</script>