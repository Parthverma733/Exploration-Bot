import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "react-loading-skeleton/dist/skeleton.css";
import "./styles/global.css";
import { SkeletonTheme } from "react-loading-skeleton";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Toaster position="top-center" reverseOrder={false} />
    <SkeletonTheme
  baseColor="#E2E8F0"
  highlightColor="#FFF7ED"
>
  <App />
</SkeletonTheme>
  </BrowserRouter>,
);
