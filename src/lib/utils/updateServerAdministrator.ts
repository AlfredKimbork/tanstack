import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import prisma from './prisma';

const updateServerAdministator = createServerFn({method: 'POST'})
  .inputValidator(
    z.object({
      id: z.number(),
      administrator: z.boolean(),
    })
  )
  .handler(async ({ data }) => {
    const { id, administrator } = data;
    const user = await prisma.user.update({
      where: { id },
      data: { administrator },
    })
    return user;
})

export default updateServerAdministator;