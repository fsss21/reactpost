import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Posts from "./Posts";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <div />,
  },
  {
    path: "/posts",
    element: <Posts />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={routes} />);
