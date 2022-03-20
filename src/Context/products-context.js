import { createContext, useContext, useState, useReducer } from "react";

const ProductsContext = createContext();

// const reducer = (state, action) => {
//   switch(action.type) {
//     case "Setup":
//       fetch("/api/user/cart", {method: "GET"})
//       .then((res) => res.json())
//       .then((data) => )
//   }
// };

const ProductsProvider = ({ children }) => {
  // const [state, dispatch] = useReducer(reducer, {
  //   cart: [],
  //   wishlist: [],
  // });

  var storedCartArray = JSON.parse(localStorage.getItem("CART_ARRAY"));
  if (storedCartArray === null) storedCartArray = [];

  const [cartArray, setCartArray] = useState(storedCartArray);

  var storedWishlistArray = JSON.parse(localStorage.getItem("WISHLIST_ARRAY"));
  if (storedWishlistArray === null) storedWishlistArray = [];

  const [wishlistArray, setWishlistArray] = useState(storedWishlistArray);
  return (
    <ProductsContext.Provider
      value={{ cartArray, setCartArray, wishlistArray, setWishlistArray }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

const useProducts = () => useContext(ProductsContext);

export { ProductsProvider, useProducts };
