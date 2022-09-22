import { getPrisma, linkExists } from '../prisma'

export default defineEventHandler(async (event) => {
  const { shortcode } = event.context.params

  if (!shortcode) return sendError(event, createError({ statusCode: 400, message: 'missing or invalid shortcode' }))

  if (!(await linkExists(shortcode))) {
    return event.res.writeHead(204, 'NO CONTENT').end()
  }

  await getPrisma().then((prisma) => prisma.link.delete({ where: { shortcode } }))

  return event.res.writeHead(204, 'NO CONTENT').end()
})
