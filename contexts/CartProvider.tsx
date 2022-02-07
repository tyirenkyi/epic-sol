import { createContext, ReactElement, useState } from "react";

import { Product } from "@prisma/client";

interface ICartContext {
  products: Product[],
  updateProducts: (newProducts: Product[]) => void
}

const defaultState: ICartContext = {
  products: [],
  updateProducts: () => {},
}

export const CartContext = createContext<ICartContext>(defaultState);

const CartProvider = ({children} : {children: ReactElement}) => {
  const [products, setProducts] = useState(defaultState.products);

  const updateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
  }

  return (
    <CartContext.Provider value={{products, updateProducts}}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider;
