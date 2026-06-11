import prisma from "./prisma";
import { createServerFn } from "@tanstack/react-start";

const deleteUser = createServerFn().handler(async ({ data }) => {
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