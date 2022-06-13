import { ref } from 'vue'

export interface Photo {
  value: string
  type: string
}

export interface Name {
  givenName: string
  familyName: string
  formatted: string
}

export interface Email {
  primary: string
  value: string
}

export interface Url {
  value: string
  title: string
}

export interface Gravatar {
  id: string
  hash: string
  requestHash: string
  profileUrl: string
  preferredUsername: string
  thumbnailUrl: string
  photos: Photo[]
  name: Name
  displayName: string
  aboutMe: string
  currentLocation: string
  emails: Email[]
  urls: Url[]
}

const gravatarUrl = import.meta.env.VITE_GRAVATAR_PROFILE as string
export const gravatar = ref<Gravatar | null>(null)
export const isLoading = ref(false)
export const error = ref<Error | null>(null)

const loadGravatar = async () => {
  isLoading.value = true
  error.value = null
  gravatar.value = await fetch(gravatarUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
      }
      return res.json()
    })
    .then((result) => result.entry[0])
    .catch((err) => (error.value = err as Error))
  isLoading.value = false
}

export const useGravatar = () => {
  if (!gravatar.value) loadGravatar()

  return {
    gravatar,
    isLoading,
    error
  }
}
