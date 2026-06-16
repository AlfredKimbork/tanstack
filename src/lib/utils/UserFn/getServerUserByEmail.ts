import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import prisma from '../prisma';

const getByEmail = createServerFn()
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
})

export default getByEmail;