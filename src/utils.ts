import prisma from "./lib/prisma";
import { createServerFn } from "@tanstack/react-start";

export const getProducts = createServerFn().handler(async () => {
  const products = await prisma.product.findMany({ orderBy: { name: "asc" } });
  return products;
});

export const getProductById = createServerFn().handler(async ({ data }) => {
  const { id } = data
  const product = await prisma.product.findUnique({ where: { id } });
  return product;
});