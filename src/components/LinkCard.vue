<template>
  <div class="link">
    <a :href="url" target="_blank">
      <span class="linkShortcode">{{ link.shortcode }}</span>
      <span class="linkDescription">{{ link.longUrl }}</span>
    </a>
  </div>
</template>

<script setup lang="ts">
import { ShortenedLink } from '@/types/ShortenedLink'
import { computed } from '@vue/reactivity'
const props = defineProps<{
  link: ShortenedLink
}>()

const url = computed(
  () => `https://roz.ninja/${props.link.shortcode}?ref=index`
)
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
a {
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }

  &:visited {
    text-decoration: none;
  }
}
.link {
  color: white;
  // display: flex;
  // flex-direction: column;
  background-color: $dark-grey;
  padding: 20px;

  .linkShortcode {
    font-size: 1.5em;
    font-weight: bold;
    margin-right: 1em;
    color: $blue;
  }

  .linkDescription {
    font-size: 1em;
    margin-top: 1em;
    color: grey;
  }
}
</style>
