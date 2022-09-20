import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const path = event.req.originalUrl?.split('?')[0] || ''
  if (path.startsWith('/api') && !path.endsWith('/login')) {
    const { telegramToken } = useRuntimeConfig()
    const providedToken = getRequestHeader(event, 'Authorization')

    if (typeof providedToken !== 'string') {
      return path.startsWith('/api')
        ? createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            message: 'MISSING_AUTH_TOKEN'
          })
        : sendRedirect(event, '/login')
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
