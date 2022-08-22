import { TelegramLoginPayload } from 'node-telegram-login'

export const useToken = () => useState<string>('token', () => '')
export const useUser = () =>
  useState<TelegramLoginPayload>('userData', () => ({
    id: 0,
    first_name: '',
    username: '',
    auth_date: '',
    hash: ''
  }))
