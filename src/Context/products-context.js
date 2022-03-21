import { createContext, useContext, useState, useReducer } from "react";

const ProductsContext = createContext();

const reducer = (stateMockbee, action) => {
  switch (action.type) {
    case "Cart setup":
      return {
        ...stateMockbee,
        cart: action.payload,
      };
    case "Wishlist setup":
      return {
        ...stateMockbee,
        wishlist: action.payload,
      };
    default:
      return stateMockbee;
  }
};

const ProductsProvider = ({ children }) => {
  const [stateMockbee, dispatchMockbee] = useReducer(reducer, {
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
        stateMockbee,
        dispatchMockbee,
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
