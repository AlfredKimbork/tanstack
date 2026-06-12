import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import prisma from './prisma';

const getServerProducts = createServerFn()
  .inputValidator(
    z.object({
      sortby: z.enum(['id', 'name', 'price', 'created_at']),
      direction: z.enum(['asc', 'desc']),
    })
  )
  .handler(async ({ data }) => {
    const { sortby, direction }: { sortby?: 'id' | 'name' | 'price' | 'created_at', direction?: 'asc' | 'desc' } = data || {};
    console.log('sortby:', sortby, 'direction:', direction);
    const products = await prisma.product.findMany({
    orderBy: {
      [sortby]: direction,
    },
  });
  return products
});

export default getServerProducts;