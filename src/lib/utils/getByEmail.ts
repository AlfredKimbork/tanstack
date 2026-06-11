import { createServerFn } from '@tanstack/react-start';
import prisma from './prisma';

const getByEmail = createServerFn().handler(async ({ data }) => {
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