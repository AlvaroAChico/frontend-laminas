import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../../features/landing/landing-page";
import EditorKonva from "../../features/editor-konva/editor-konva";
import CustomLayout from "../../components/custom-layout/custom-layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomLayout />,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },
      {
        path: "laminas",
        element: <>Laminas</>,
      },
      {
        path: "planes",
        element: <>Planes</>,
      },
    ],
  },
  {
    path: "/editor",
    element: <EditorKonva />,
  },
  {
    path: "*",
    element: <div>Pagina no encontrada</div>,
  },
]);
