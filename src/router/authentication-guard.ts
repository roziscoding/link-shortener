import { watch } from 'vue'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { isAuthenticated, isLoading, login } from '../plugins/auth'

export const authenticationGuard = (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
): void => {
  const guardAction = () => {
    if (isAuthenticated.value) {
      return next()
    }

    login({
      appState: {
        targetUrl: to.fullPath
      }
    })
  }

  if (!isLoading.value) {
    return guardAction()
  }

  watch(isLoading, (currentValue) => {
    if (!currentValue) {
      return guardAction()
    }
  })
}
