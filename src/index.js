import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ProductsProvider } from "./products-context";
import { ToastProvider } from "./toast-context";
import { FilterProvider } from "./filter-context";
import { AddressProvider } from "./address-context";

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
