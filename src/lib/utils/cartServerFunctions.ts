import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import prisma from './prisma';

export const setServerCart = createServerFn()
  .inputValidator(
    z.object({
      index: z.number().optional(),
      email: z.string().email(),
      productName: z.string(),
      price: z.string(),
      productId: z.number(),
      quantity: z.number(),
    })
  )
  .handler(async ({ data }) => {
    const {email, productId, quantity, productName, index} = data;
    const user = await prisma.user.findUnique({
      where: { email },
      include: { cart: { include: { items: true } } },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    if (quantity > product.inventory) {
      throw new Error('Not enough inventory');
    }

    let cart = user.cart;
    const id = cart?.items[index!]?.id
    console.log(id)
    
    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          user: { connect: { email: email } },
          items: { create: { productId, quantity, productName, price: product.price || 'Price unavailable' } },
        },
        include: { items: true },
      });
    } else if(id) { 
      await prisma.cartItem.update({ where: { id }, data: { quantity } });
    } else {
      cart = await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: { create: { productId, quantity, productName, price: product.price || 'Price unavailable' } },
        },
        include: { items: true },
      });
    }

    return cart;
})

export const getServerCart = createServerFn()
  .inputValidator(
    z.object({
      email: z.string().email(),
    })
  )
  .handler(async ({ data }) => {
    const { email } = data;
    const user = await prisma.user.findUnique({
      where: { email },
      include: { cart: { include: { items: true } } }, 
    })
    if (!user) {
      throw new Error('User not found');
    }

    return user.cart;
  })

export const deleteServerCartItem = createServerFn()
  .inputValidator(
    z.object({
      email: z.string().email(),
      index: z.number(),
    })
  )
  .handler(async ({ data }) => {
    const {email, index} = data;

    const user = await prisma.user.findUnique({
      where: { email },
      include: { cart: { include: { items: true } } },
    });

    if (!user) {
      throw new Error('User not found');
    }

    let cart = user.cart;
    const id = cart?.items[index!]?.id

    if (!cart || id === undefined) {
      throw new Error('Cart item not found');
    }

    const deletedItem = await prisma.cartItem.delete({ where: { id } });
    console.log(cart!.items.length);
    if(cart!.items.length === 1) {
      await prisma.cart.delete({ where: { id: cart!.id } })
    }
    return deletedItem;
  })


