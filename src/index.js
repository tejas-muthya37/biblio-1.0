import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ProductsProvider } from "./Context/products-context";
import { ToastProvider } from "./Context/toast-context";
import { FilterProvider } from "./Context/filter-context";
import { AddressProvider } from "./Context/address-context";

ReactDOM.render(
  <React.StrictMode>
    <ProductsProvider>
      <ToastProvider>
        <FilterProvider>
          <AddressProvider>
            <App />
          </AddressProvider>
        </FilterProvider>
      </ToastProvider>
    </ProductsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
