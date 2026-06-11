import { createServerFn } from '@tanstack/react-start'
import prisma from './prisma';

const getProducts = createServerFn().handler(async () => {
  const products = await prisma.product.findMany()
  return products
});

export default getProducts;