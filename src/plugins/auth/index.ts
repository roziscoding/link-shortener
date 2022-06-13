import createAuth0Client, {
  Auth0Client,
  GetTokenSilentlyOptions,
  LogoutOptions,
  RedirectLoginOptions,
  User
} from '@auth0/auth0-spa-js'
import { inject, provide, Ref, ref } from 'vue'
import { getCallbackHandler } from './handle-callback'

export type Auth0Plugin = {
  isAuthenticated: Ref<boolean>
  isLoading: Ref<boolean>
  user: Ref<User | null>
  createClient: () => Promise<void>
  handleCallback: () => Promise<void>
  login: (options?: RedirectLoginOptions) => Promise<void>
  logout: (options?: LogoutOptions) => Promise<void>
  getAccessToken: () => Promise<null | string>
}

const domain = import.meta.env.VITE_AUTH_DOMAIN as string
const clientId = import.meta.env.VITE_AUTH_CLIENT_ID as string

const auth0Client = ref<Auth0Client | null>(null)
export const isAuthenticated = ref(false)
export const isLoading = ref(true)
const user = ref<User | null>(null)
const error = ref<Error | null>(null)

const refs = {
  auth0Client,
  isAuthenticated,
  isLoading,
  user,
  error
}

export type Refs = typeof refs

const Auth0Symbol = Symbol('auth0')

const createClient = async (): Promise<void> => {
  auth0Client.value = await createAuth0Client({
    domain,
    client_id: clientId
  })
}

export const login = async (options?: RedirectLoginOptions): Promise<void> => {
  if (!auth0Client.value) {
    return
  }

  try {
    await auth0Client.value.loginWithRedirect({
      ...options,
      redirect_uri: 'http://localhost:3000'
    })
  } catch (err) {
    error.value = err as Error
  }
}

const logout = async (options?: LogoutOptions): Promise<void> => {
  if (!auth0Client.value) {
    return
  }

  try {
    await auth0Client.value.logout(options)
    isAuthenticated.value = await auth0Client.value.isAuthenticated()
  } catch (err) {
    error.value = err as Error
  }
}

const getAccessToken = async (
  options?: GetTokenSilentlyOptions
): Promise<null | string> => {
  if (!auth0Client.value) {
    return null
  }

  return (await auth0Client.value.getTokenSilently(options)) as string
}

export const provideAuth0 = (): void => {
  const auth0 = {
    isAuthenticated,
    isLoading,
    user,
    createClient,
    handleCallback: getCallbackHandler(refs),
    login,
    logout,
    getAccessToken
  }

  provide(Auth0Symbol, auth0)
}

export const useAuth0 = (): Auth0Plugin => {
  const auth0 = inject<Auth0Plugin>(Auth0Symbol)

  if (!auth0) {
    throw new Error('Auth0 plugin not provided. Call provideAuth0() first.')
  }

  return auth0
}
