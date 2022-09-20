import { getPrisma } from '../prisma'
import { CreateLinkSchema } from '../schemas/link'

export default defineEventHandler(async (event) => {
  const body = await useBody(event)
  const validation = CreateLinkSchema.safeParse(body, { path: ['body'] })

  if (!validation.success)
    return sendError(
      event,
      createError({
        statusCode: 422,
        cause: validation.error,
        statusMessage: 'UNPROCESSABLE ENTITY',
        data: validation.error.issues
      })
    )

  const { name, shortcode, url, isPublic } = validation.data

  return getPrisma().then((prisma) =>
    prisma.link.create({
      data: {
        name,
        shortcode,
        url,
        public: isPublic
      }
    })
  )
})
