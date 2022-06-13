<template>
  <nav class="navbar">
    <div class="navbar-brand" aria-hidden="true">
      <router-link to="/">
        <img src="@/assets/logo.svg" alt="brand logo" />
      </router-link>
    </div>
    <div class="navbar-menu">
      <auth-guard>
        <router-link class="nav-link" to="/">Home</router-link>
      </auth-guard>
    </div>
    <div class="navbar-profile">
      <auth-guard>
        <template v-slot:unauthenticated="{ login }">
          <span class="link" @click="login">Login</span>
        </template>
        <template v-slot:default="{ auth0 }">
          <user-menu :auth0="auth0"></user-menu>
        </template>
      </auth-guard>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import AuthGuard from '@/components/AuthGuard.vue'
import UserMenu from '@/components/UserMenu.vue'
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.navbar {
  width: 100vw;
  height: 60px;
  background-color: $dark-bg-color;
  line-height: 60px;
  color: white;
  display: flex;

  .navbar-brand {
    margin-left: 1em;
    width: min-content;

    img {
      margin-top: 10px;
      height: 40px;
      position: relative;
    }
  }

  .navbar-menu {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    .nav-link {
      margin: 0 2em 0 2em;
    }

    a {
      color: white;
      text-decoration: none;
    }

    .router-link-active {
      color: $orange;
    }
  }

  .navbar-profile {
    margin-right: 1em;
  }
}

.link {
  cursor: pointer;
}
</style>