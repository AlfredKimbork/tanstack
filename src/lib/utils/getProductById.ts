import { createServerFn } from "@tanstack/react-start"
import prisma from "./prisma"

const getProductById = createServerFn().handler(async ({ data }) => {
  const { id } = data
  const product = await prisma.product.findUnique({
    where: { id }
  })
  return product
})

export default getProductById