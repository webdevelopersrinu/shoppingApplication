import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ShopContextProvider } from "./context/ShopContext.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ErrorBoundary>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </ErrorBoundary>
  </BrowserRouter>
);
