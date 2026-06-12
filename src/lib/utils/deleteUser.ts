import prisma from "./prisma";
import { z } from "zod";
import { createServerFn } from "@tanstack/react-start";


const deleteUser = createServerFn()
  .inputValidator(
    z.object({
      id: z.number(),
    })
  )
  .handler(async ({ data }) => {
    const { id } = data;
    try {
      const deletedUser = await prisma.user.delete({
        where: { id },
    })
    return deletedUser;
  } 

  catch (error) {
    return false;
  }
});

export default deleteUser;