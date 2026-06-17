import { useServerFn } from '@tanstack/react-start';
import { createFileRoute } from '@tanstack/react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getServerProducts } from '#/lib/utils/productServerFunctions';

import ProductForm from '#/components/forms/ProductForm'

export const Route = createFileRoute('/dashboard/products/new')({
  component: RouteComponent,
})

function RouteComponent() {
  const getProducts = useServerFn(getServerProducts)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () =>
      getProducts({ data: { sortby: 'id', direction: 'asc' } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  });
  return (
    <ProductForm mutation={mutation} />
  )
}
