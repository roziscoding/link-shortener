<template>
  <div class="container">
    <div class="sidebar">
      <profile-header />
    </div>
    <div class="links">
      <h1 class="linksHeader" v-if="!isFetching">Links</h1>
      <h1 class="linksHeader" v-else>Fetching links...</h1>
      <div class="linksHeader" v-if="error">
        Error while fetching links: {{ error }}
      </div>
      <template v-if="!isFetching && !error">
        <link-card v-for="(link, i) in data" :key="i" :link="link" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useFetch } from '@vueuse/core'
import LinkCard from '@/components/LinkCard.vue'
import ProfileHeader from '@/components/ProfileHeader.vue'
import { ShortenedLink } from '@/types/ShortenedLink'

const { isFetching, error, data } = useFetch<ShortenedLink[]>(
  `${import.meta.env.VITE_API_URL}/links/public`
).json()
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.container {
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;

  .sidebar {
    flex: 0.15;
    background-color: $dark-grey;
    padding-top: 2em;
    padding-left: 2em;
    color: white;
  }

  .links {
    display: grid;
    flex: 0.85;
    background-color: $grey;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: max-content;
    gap: 3em;
    padding: 3em;

    .linksHeader {
      grid-column: 1/3;
      color: white;
    }
  }
}
</style>
