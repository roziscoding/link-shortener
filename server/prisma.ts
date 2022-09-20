import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

export const getPrisma = async () => {
  prisma = prisma ?? new PrismaClient()
  await prisma.$connect()
  return prisma
}

export const linkExists = (shortcode: string) =>
  getPrisma()
    .then((prisma) => prisma.link.count({ where: { shortcode } }))
    .then((count) => count > 0)
