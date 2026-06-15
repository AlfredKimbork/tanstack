import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';

import addProduct from '../../lib/utils/ProductFn/addServerProduct';

interface ProductFormValues {
  name: string
  price: string
  inventory: number
}

export default function ProductForm({ mutation }: { mutation: any }) {
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      name: '',
      price: '',
      inventory: 0,
    } as ProductFormValues,
    onSubmit: async ({ value }) => {
      console.log(value)

      if( await addProduct({ data: value })) {
        mutation.mutate()
        navigate({ to: '/products' })
      }
    }
  })
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit(e)
      }}
      className="max-w-120 bg-white p-8 rounded-md w-full flex flex-col gap-4"
    >
      <div>
        <form.Field 
          name="name"
          validators={{
            onBlur: ({ value }) => 
              !value 
                ? 'Product name is required' 
                : undefined
          }}
          children={(field) => {
            return (
              <>
                <label htmlFor={field.name}>Product Name:</label>
                <input 
                  className={`w-full border rounded-md p-2 ${field.state.meta.errors.length > 0 ? 'border-red-500' : 'border-slate-300'}`}
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={() => field.handleBlur()}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.length > 0 && <em className="text-red-500">{field.state.meta.errors.join(", ")}</em>}
              </>
            )
          }}
        />
      </div>
      <div>
        <form.Field 
          name="price"
          validators={{
            onBlur: ({ value }) => 
              !value 
                ? 'Product price is required' 
                : undefined
          }}
          children={(field) => {
            return (
              <>
                <label htmlFor={field.name}>Product Price:</label>
                <input 
                  className={`w-full border rounded-md p-2 ${field.state.meta.errors.length > 0 ? 'border-red-500' : 'border-slate-300'}`}
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={() => field.handleBlur()}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.length > 0 && <em className="text-red-500">{field.state.meta.errors.join(", ")}</em>}
              </>
            )
          }}
        />
      </div>
      <div>
        <form.Field 
          name="inventory"
          validators={{
            onBlur: ({ value }) => 
              !value 
                ? 'Product inventory is required' 
                : undefined
          }}
          children={(field) => {
            return (
              <>
                <label htmlFor={field.name}>Product Inventory:</label>
                <input 
                  type="number"
                  className={`w-full border rounded-md p-2 ${field.state.meta.errors.length > 0 ? 'border-red-500' : 'border-slate-300'}`}
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={() => field.handleBlur()}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
                {field.state.meta.errors.length > 0 && <em className="text-red-500">{field.state.meta.errors.join(", ")}</em>}
              </>
            )
          }}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Add Product
      </button>

    </form>
  )
}