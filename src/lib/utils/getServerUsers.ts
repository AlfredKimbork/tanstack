import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import prisma from './prisma';

const getServerUsers = createServerFn()
  .inputValidator(
    z.object({
      sortby: z.enum(['id', 'username', 'email', 'administrator', 'created_at']),
      direction: z.enum(['asc', 'desc']),
    })
  )
  .handler(async ({ data }) => {
    const { sortby, direction }: { sortby?: 'id' | 'username' | 'email' | 'administrator' | 'created_at', direction?: 'asc' | 'desc' } = data || {};
    const users = await prisma.user.findMany({
      orderBy: {
        [sortby]: direction,
      },
    });
    return users
});

export default getServerUsers;
