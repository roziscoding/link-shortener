<template>
  <div ref="container"></div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const container = ref<HTMLElement | null>(null)

  const props = withDefaults(
    defineProps<{
      username: string
      redirectUrl: string
      size: 'large' | 'medium' | 'small'
      showUserPhoto?: boolean
      radius?: number
      requestAccess?: boolean
      version?: string
    }>(),
    { showUserPhoto: true, requestAccess: false, version: '19' }
  )

  onMounted(() => {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://telegram.org/js/telegram-widget.js?${props.version}`

    script.setAttribute('data-size', props.size)
    if (!props.showUserPhoto) script.setAttribute('data-userpic', 'false')
    script.setAttribute('data-telegram-login', props.username)
    script.setAttribute('data-auth-url', props.redirectUrl)
    if (props.requestAccess) script.setAttribute('data-request-access', 'write')

    container.value?.appendChild(script)
  })
</script>
