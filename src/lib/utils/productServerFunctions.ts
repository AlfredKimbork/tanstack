import prisma from "./prisma";
import { z } from "zod";
import { createServerFn } from "@tanstack/react-start";

export const addServerProduct = createServerFn()
  .inputValidator(
    z.object({
      name: z.string(),
      price: z.string(),
      inventory: z.number().int().nonnegative(),
    })
  )
  .handler(async ({ data }) => {
    const { name, price, inventory } = data;
    try {
      const product = await prisma.product.create({
        data: {
          name,
          price,
          inventory,
        },
      });

      return product;
    } 

    catch (error) {
      return false;
    }
});

export const getServerProductById = createServerFn()
  .inputValidator(
    z.object({
      id: z.number(),
    })
  )
  .handler(async ({ data }) => {
    const { id } = data
    const product = await prisma.product.findUnique({
      where: { id }
    })
    return product
})

export const getServerProducts = createServerFn()
  .inputValidator(
    z.object({
      sortby: z.enum(['id', 'name', 'price', 'inventory', 'created_at']),
      direction: z.enum(['asc', 'desc']),
    })
  )
  .handler(async ({ data }) => {
    const { sortby, direction }: { sortby?: 'id' | 'name' | 'price' | 'inventory' | 'created_at', direction?: 'asc' | 'desc' } = data || {};
    const products = await prisma.product.findMany({
    orderBy: {
      [sortby]: direction,
    },
  });
  return products
});

export const updateServerProduct = createServerFn()
  .inputValidator(
    z.object({
      id: z.number(),
      inventory: z.number().optional(),
      price: z.string().optional(),
    })
  )
  .handler(async ({ data }) => {
    const { id, inventory, price } = data
    const product = await prisma.product.update({
      where: { id },
      data: { inventory, price },
    })
    return product;
  })