import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./hooks/useGlobalReducer.jsx";
import Layout from "./pages/Layout.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StoreProvider>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </StoreProvider>
);
