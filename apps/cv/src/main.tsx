import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import FullStackEngineerStartup from "./Full-Stack-Engineer-Startup";
import FullStackEngineerPublicSector from "./Full-Stack-Engineer-Public-Sector";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/full-stack-engineer-startup",
    element: <FullStackEngineerStartup />,
  },
  {
    path: "/full-stack-engineer-public-sector",
    element: <FullStackEngineerPublicSector />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
