import { getPrisma, linkExists } from '../prisma'
import { UpdateLinkSchema } from '../schemas/link'

export default defineEventHandler(async (event) => {
  const { shortcode } = event.context.params

  if (!shortcode) return sendError(event, createError({ statusCode: 400, message: 'missing or invalid shortcode' }))

  const validation = await useBody(event).then((body) => UpdateLinkSchema.safeParse(body, { path: ['body'] }))

  if (!validation.success) {
    return sendError(
      event,
      createError({
        statusCode: 422,
        data: validation.error.issues,
        cause: validation.error
      })
    )
  }

  if (!(await linkExists(shortcode))) {
    return sendError(
      event,
      createError({
        statusCode: 404,
        data: { message: `link with shortcode "${shortcode}" does not exist` },
        statusMessage: 'NOT FOUND'
      })
    )
  }

  const { name, url, isPublic } = validation.data

  return getPrisma().then((prisma) =>
    prisma.link.update({
      where: {
        shortcode
      },
      data: {
        name,
        url,
        public: isPublic
      }
    })
  )
})
