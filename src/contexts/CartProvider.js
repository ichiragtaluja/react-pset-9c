import { createContext, useContext } from "react";
import { useState } from "react";
import { useData } from "./DataProvider";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { menuToBeDisplayed, setMenuToBeDisplayed } = useData();

  const addToCartHandler = (product) => {
    const updatedMenu = menuToBeDisplayed.map((dish) =>
      dish.id === product.id ? { ...dish, addToCart: true } : dish
    );

    setMenuToBeDisplayed(updatedMenu);
  };

  const totalItemsInCart = menuToBeDisplayed.reduce(
    (acc, curr) => (curr.addToCart ? acc + 1 : acc),
    0
  );

  return (
    <CartContext.Provider
      value={{
        addToCartHandler,
        menuToBeDisplayed,
        totalItemsInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
