import prisma from "./prisma";
import { createServerFn } from "@tanstack/react-start";

const addUser = createServerFn().handler(async ({ data }) => {
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
    // console.error("Error creating user:", error);
    return false;
  }
});

export default addUser;