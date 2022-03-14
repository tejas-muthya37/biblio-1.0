import { createContext, useContext, useReducer } from "react";
import productsArray from "./productsArray.js";

const FilterContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "Low to High":
      return {
        ...state,
        items: state.items.sort((a, b) => a.bookPrice - b.bookPrice),
      };
    case "High to Low":
      return {
        ...state,
        items: state.items.sort((a, b) => b.bookPrice - a.bookPrice),
      };
    case "Price filter":
      state.items.map((item) => {
        item.bookPrice > action.payload
          ? (item.show = false)
          : (item.show = true);

        return true;
      });
      return {
        ...state,
        items: state.items,
      };
    case "Rating filter":
      state.items.map((item) => {
        item.bookRating < action.payload
          ? (item.show = false)
          : (item.show = true);
        return true;
      });
      return {
        ...state,
        items: state.items,
      };
    case "Category filter":
      if (state.categoryFiltersFlag === false) {
        state.items.map((item) => {
          item.bookCategory === action.payload.id
            ? (item.show = true)
            : (item.show = false);
          return true;
        });
        return { items: state.items, categoryFiltersFlag: true };
      } else {
        const tempProductsArray = state.items.filter(
          (item) => item.show === true
        );
        state.items.map((item) => {
          if (action.payload.checked) {
            if (item.bookCategory === action.payload.id) {
              item.show = true;
            }
          } else {
            if (tempProductsArray.length === 0) {
              state.items.map((item) => (item.show = true));
              return { items: state.items, categoryFiltersFlag: false };
            } else if (item.bookCategory === action.payload.id) {
              item.show = false;
            }
          }
          return true;
        });
      }
      return {
        ...state,
        items: state.items,
      };
    default:
      return state;
  }
};

const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    items: productsArray,
    categoryFiltersFlag: false,
  });
  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = () => useContext(FilterContext);

export { FilterProvider, useFilter };
