import jwt from 'jsonwebtoken'
import { TelegramLogin, TelegramLoginPayload } from 'node-telegram-login'

export default defineEventHandler(async (event) => {
  const body = (await useBody(event)) as unknown as TelegramLoginPayload

  const { telegramToken } = useRuntimeConfig()

  const auth = new TelegramLogin(telegramToken)

  if (!auth.checkLoginData(body)) {
    return sendError(
      event,
      createError({ statusCode: 401, statusMessage: 'Unauthorized' }),
      false
    )
  }

  const token = jwt.sign(body, telegramToken, {
    algorithm: 'HS256',
    audience: 'link-shortener',
    expiresIn: '1h',
    issuer: 'telegram',
    subject: body.id.toString()
  })

  return { token, data: body }
})
