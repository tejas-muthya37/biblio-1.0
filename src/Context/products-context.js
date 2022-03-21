import { createContext, useContext, useState, useReducer } from "react";

const ProductsContext = createContext();

const reducer = (stateCart, action) => {
  switch (action.type) {
    case "Setup":
      return {
        ...stateCart,
        cart: action.payload,
      };
    default:
      return stateCart;
  }
};

const ProductsProvider = ({ children }) => {
  const [stateCart, dispatchCart] = useReducer(reducer, {
    cart: [],
    wishlist: [],
  });
  var storedCartArray = JSON.parse(localStorage.getItem("CART_ARRAY"));
  if (storedCartArray === null) storedCartArray = [];

  const [cartArray, setCartArray] = useState(storedCartArray);

  var storedWishlistArray = JSON.parse(localStorage.getItem("WISHLIST_ARRAY"));
  if (storedWishlistArray === null) storedWishlistArray = [];

  const [wishlistArray, setWishlistArray] = useState(storedWishlistArray);
  return (
    <ProductsContext.Provider
      value={{
        stateCart,
        dispatchCart,
        cartArray,
        setCartArray,
        wishlistArray,
        setWishlistArray,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

const useProducts = () => useContext(ProductsContext);

export { ProductsProvider, useProducts };
