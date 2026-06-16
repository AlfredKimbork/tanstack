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
  })
