import { TelegramLoginPayload } from 'node-telegram-login'

export const useToken = () => useState<string>('token', () => localStorage.getItem('token') || '')
export const useUser = () =>
  useState<TelegramLoginPayload>('userData', () => {
    const json = localStorage.getItem('userData')

    if (!json)
      return {
        id: 0,
        first_name: '',
        username: '',
        auth_date: '',
        hash: ''
      }

    return JSON.parse(json)
  })
