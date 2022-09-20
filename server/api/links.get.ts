import { getPrisma } from '../prisma'

export default defineEventHandler(() => {
  return getPrisma().then((prisma) => prisma.link.findMany())
})
