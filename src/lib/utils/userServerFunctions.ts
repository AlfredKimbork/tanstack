import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import prisma from './prisma'

export const setServerUserPrevCart = createServerFn()
  .inputValidator(
    z.object({
      email: z.string().email(),
      cart: z.array(
        z.object({
          productId: z.number(),
          productName: z.string(),
          quantity: z.number(),
          price: z.string(),
        })
      )
    })
  )
  .handler(async ({ data }) => {
    const { email, cart } = data;

    const currentUser = await prisma.user.findUnique({
      where: { email },
      include: { cart: true },
    });

    const activeCart = currentUser?.cart;

    if (!activeCart) {
      throw new Error('User cart not found');
    }

    const previousCartData = cart.map((item) => ({
      productId: item.productId,
      productName: item.productName,
      quantity: item.quantity,
      price: item.price,
    }));

    const previousCart = await prisma.$transaction(async (tx) => {
      const archivedCart = await tx.previousCart.create({
        data: {
          user: { connect: { email } },
          items: { createMany: { data: previousCartData } },
        },
      })

      await tx.cartItem.deleteMany({
        where: { cartId: activeCart.id },
      })

      await tx.cart.delete({
        where: { id: activeCart.id },
      })

      return archivedCart
    })

    return previousCart;
  })

export const getServerUserPrevCart = createServerFn()
  .inputValidator(
    z.object({
      email: z.string().email(),
    })
  )
  .handler(async ({ data }) => {
    const { email } = data;

    try {
      const previousCarts = await prisma.previousCart.findMany({
        where: { user: { email } },
        include: { items: true },
      });
      return previousCarts;
    } catch (error) {
      return null;
    }
  });

export const addServerUser = createServerFn()
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

export const deleteServerUser = createServerFn()
  .inputValidator(
    z.object({
      id: z.number(),
    })
  )
  .handler(async ({ data }) => {
    const { id } = data;
    try {
      const deletedUser = await prisma.$transaction(async (tx) => {
        const user = await tx.user.findUnique({
          where: { id },
          include: {
            cart: { include: { items: true } },
            prevCarts: { include: { items: true } },
            savedProducts: true,
          },
        })

        if (!user) {
          throw new Error('User not found')
        }

        if (user.cart) {
          await tx.cartItem.deleteMany({
            where: { cartId: user.cart.id },
          })

          await tx.cart.delete({
            where: { id: user.cart.id },
          })
        }

        if (user.prevCarts.length > 0) {
          const previousCartIds = user.prevCarts.map((previousCart) => previousCart.id)

          await tx.cartItem.deleteMany({
            where: { previousCartId: { in: previousCartIds } },
          })

          await tx.previousCart.deleteMany({
            where: { userId: id },
          })
        }

        return tx.user.delete({
          where: { id },
          include: { cart: true, prevCarts: true },
        })
      });
      return deletedUser;
    } 

    catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  });

export const getUserByEmail = createServerFn()
  .inputValidator(
    z.object({
      email: z.string().email(),
    })
  )
  .handler(async ({ data }) => {
    const { email } = data;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        cart: {
          include: {
            items: true,
          },
        },
      },
    })

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      administrator: user.administrator,
      created_at: user.created_at,
      cart:
        user.cart?.items.map(({ productId, created_at, productName, quantity, cartId }) => ({
          productId,
          created_at,
          productName,
          quantity,
          cartId: cartId ?? undefined,
        })) ?? null,
    }
  }

  catch(error) {
    return null;
  }
});

export const getServerUsers = createServerFn()
  .inputValidator(
    z.object({
      sortby: z.enum(['id', 'username', 'email', 'administrator', 'created_at']),
      direction: z.enum(['asc', 'desc']),
    })
  )
  .handler(async ({ data }) => {
    const { sortby, direction }: { sortby?: 'id' | 'username' | 'email' | 'administrator' | 'created_at', direction?: 'asc' | 'desc' } = data || {};
    const users = await prisma.user.findMany({
      orderBy: {
        [sortby]: direction,
      },
    });
    return users
});

export const updateServerAdministrator = createServerFn({method: 'POST'})
  .inputValidator(
    z.object({
      id: z.number(),
      administrator: z.boolean(),
    })
  )
  .handler(async ({ data }) => {
    const { id, administrator } = data;
    const user = await prisma.user.update({
      where: { id },
      data: { administrator },
    })
    return user;
});
