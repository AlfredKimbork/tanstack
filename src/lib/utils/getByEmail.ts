import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import prisma from './prisma';

const getByEmail = createServerFn()
  .inputValidator(
    z.object({
      email: z.string().email(),
    })
  )
  .handler(async ({ data }) => {
    const { email } = data;

  try {
    const user = await prisma.user.findUnique({
      where:{ email }
    })
    return user;
  }

  catch(error) {
    return null;
  }
})

export default getByEmail;