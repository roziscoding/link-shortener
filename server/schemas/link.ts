import z from 'zod'

export const CreateLinkSchema = z.object({
  shortcode: z.string().min(1),
  url: z.string().url(),
  name: z.string().min(1),
  isPublic: z.boolean().optional()
})

export const UpdateLinkSchema = z.object({
  url: z.string().url().optional(),
  name: z.string().min(1).optional(),
  isPublic: z.boolean().optional()
})
