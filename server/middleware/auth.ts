import jwt from 'jsonwebtoken'
const openUrls = ['/api/login', '/login/token', '/login', '/']

export default defineEventHandler(async (event) => {
  if (!openUrls.some((url) => event.req.originalUrl?.includes(url || ''))) {
    const { telegramToken } = useRuntimeConfig()
    const providedToken = getRequestHeader(event, 'Authorization')

    if (typeof providedToken !== 'string') {
      return createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
        message: 'MISSING_AUTH_TOKEN'
      })
    }

    try {
      const user = jwt.verify(providedToken, telegramToken, {
        algorithms: ['HS256'],
        issuer: 'telegram',
        audience: 'link-shortener'
      })

      event.context.userData = user
    } catch (err) {
      if (err instanceof jwt.JsonWebTokenError) {
        throw createError({
          statusCode: 401,
          statusMessage: 'Unauthorized',
          message: 'INVALID_AUTH_TOKEN'
        })
      }
    }
  }
})
