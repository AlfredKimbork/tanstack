import { createServerFn } from '@tanstack/react-start'
import prisma from './prisma';

const getServerUsers = createServerFn().handler(async () => {
  const users = await prisma.user.findMany()
  return users
});

export default getServerUsers;
