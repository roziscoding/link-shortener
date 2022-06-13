import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    userProfile: {},
    auth0: null
  }),
  actions: {
    async init() {}
  }
})
