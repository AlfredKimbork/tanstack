import prisma from "../prisma";
import { z } from "zod";
import { createServerFn } from "@tanstack/react-start";

const addProduct = createServerFn()
  .inputValidator(
    z.object({
      name: z.string(),
      price: z.string(),
      inventory: z.number().int().nonnegative(),
    })
  )
  .handler(async ({ data }) => {
    const { name, price, inventory } = data;
    console.log("Received data in addProduct:", { name, price, inventory });
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

export default addProduct;