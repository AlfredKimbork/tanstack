import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"
import prisma from "../prisma"

const getServerProductById = createServerFn()

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

export default getServerProductById