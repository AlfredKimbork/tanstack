type CartItem = {
  productId: number;
  productName: string;
  price: string;
  quantity: number;
}

export default function Item({ item, index }: { item: CartItem; index: number }) {
  return (
    <li key={index} className="border border-gray-300 rounded-md p-2 bg-gray-50">
      {index + 1}. {item.productName} - Quantity: {item.quantity}
    </li>
  )
}