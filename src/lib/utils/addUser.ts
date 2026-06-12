import prisma from "./prisma";
import { z } from "zod";
import { createServerFn } from "@tanstack/react-start";

const addUser = createServerFn()
  .inputValidator(
    z.object({
      username: z.string(),
      email: z.string().email(),
      password: z.string(),
      administrator: z.boolean(),
    })
  )
  .handler(async ({ data }) => {
    const { username, email, password, administrator } = data;
    try {
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password,
          administrator,
        },
      });

      return user;
    } 

    catch (error) {
      return false;
    }
});

export default addUser;