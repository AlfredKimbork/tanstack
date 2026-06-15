import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"
import prisma from "../prisma"

const updateServerInventory = createServerFn()
  .inputValidator(
    z.object({
      id: z.number(),
      inventory: z.number(),
    })
  )
  .handler(async ({ data }) => {
    const { id, inventory } = data
    const product = await prisma.product.update({
      where: { id },
      data: { inventory },
    })
    return product;
  })

export default updateServerInventory;