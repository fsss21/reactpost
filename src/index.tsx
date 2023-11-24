import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Posts from "./Posts";
import FetchProducts from "./FetchProducts";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <div />,
  },
  {
    path: "/posts",
    element: <Posts />,
  },
  {
    path: "/fetch-products",
    element: <FetchProducts />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={routes} />);
