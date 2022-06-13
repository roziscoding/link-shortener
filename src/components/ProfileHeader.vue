<template>
  <img
    class="profilePicture"
    :src="profilePicture"
    alt="user profile picture"
  />
  <h1>{{ name }}</h1>
  <p v-if="location" class="location">
    <img class="icon" :src="mapIcon" alt="Map Icon" />{{ location }}
  </p>
  <p v-for="(paragraph, i) of description" :key="i">{{ paragraph }}</p>
  <hr />
  <p>
    <img class="icon" :src="emailIcon" alt="Email icon" />
    <a :href="`mailto:${email}`" target="_blank">Contact-me</a>
  </p>
</template>

<script lang="ts" setup>
import { useGravatar } from '@/plugins/gravatar'
import { computed } from 'vue'
import mapIcon from '@/assets/icons/map-marker.svg'
import emailIcon from '@/assets/icons/email.svg'
const { gravatar } = useGravatar()

const profilePicture = computed(
  () => `https://www.gravatar.com/avatar/${gravatar.value?.hash}`
)
const name = computed(() => gravatar.value?.displayName || '')
const description = computed(() => gravatar.value?.aboutMe?.split('\n') || '')
const location = computed(() => gravatar.value?.currentLocation || '')
const email = computed(
  () => gravatar.value?.emails.find(({ primary }) => primary)?.value || ''
)
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

a {
  text-decoration: none;
  color: white;
}
.profilePicture {
  border-radius: 50%;
}

.icon {
  vertical-align: text-bottom;
  margin: 0 10px 0 0;
  padding: 0;
  filter: invert(100%) sepia(100%) saturate(2%) hue-rotate(138deg)
    brightness(103%) contrast(101%) drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
}

.location {
  color: white;
}

hr {
  border: 0;
  height: 1px;
  background-image: linear-gradient(to right, $grey, $dark-grey);
}
</style>
