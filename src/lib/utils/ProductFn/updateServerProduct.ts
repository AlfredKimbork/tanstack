import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"
import prisma from "../prisma"

const updateServerProduct = createServerFn()
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

export default updateServerProduct;