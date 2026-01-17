import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : {};
  });
  const [adm, setAdm] = useState(localStorage.getItem("adm") === "1");

  const addToCart = (key) => {
    const newCart = { ...cart };
    if (newCart[key]) newCart[key] += 1;
    else newCart[key] = 1;
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const deleteFromCart = (key) => {
    const newCart = { ...cart };
    delete newCart[key];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCart({});
    localStorage.removeItem("cart");
  };

  const logIn = () => {
    setAdm(true);
    localStorage.setItem("adm", "1");
  };

  const logOut = () => {
    setAdm(false);
    localStorage.setItem("adm", "0");
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, deleteFromCart, clearCart, adm, logIn, logOut }}
    >
      {children}
    </CartContext.Provider>
  );
}
