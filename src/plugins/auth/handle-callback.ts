import type { Refs } from '.'
import router from '../../router'

export const getCallbackHandler =
  ({ auth0Client, user, isAuthenticated, isLoading, error }: Refs) =>
  async (): Promise<void> => {
    if (!auth0Client.value) return

    isAuthenticated.value = await auth0Client.value.isAuthenticated()

    if (isAuthenticated.value) {
      user.value = (await auth0Client.value.getUser()) || null
      isLoading.value = false

      window.history.replaceState({}, document.title, window.location.pathname)

      return
    }

    const params = new URLSearchParams(window.location.search)
    const hasError = params.has('error')
    const hasCode = params.has('code')
    const hasState = params.has('state')

    if (hasError) {
      error.value = new Error(
        params.get('error_description') || 'error completing login import.meta!'
      )

      isLoading.value = false

      return
    }

    if (hasCode && hasState) {
      try {
        const result = await auth0Client.value.handleRedirectCallback()

        let url = '/'

        if (result.appState && result.appState.targetUrl) {
          url = result.appState.targetUrl
        }

        isAuthenticated.value = await auth0Client.value.isAuthenticated()

        if (isAuthenticated.value) {
          user.value = (await auth0Client.value.getUser()) || null
          error.value = null

          isLoading.value = false

          await router.push(url)

          return
        }
      } catch (err) {
        error.value = err as Error
      }
    }

    isLoading.value = false
  }
