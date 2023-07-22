import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../../features/landing/landing-page";
import LaminasPage from "../../features/laminas/laminas-page";
import PlansPage from "../../features/plans/plans-page";
import DashboardPage from "../../features/dashboard/dashboard-page";
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
        element: <LaminasPage />,
      },
      {
        path: "planes",
        element: <PlansPage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
        children: [
          {
            path: "perfil",
            element: <>Perfil</>,
          },
          {
            path: "descargas",
            element: <>Descargas</>,
          },
          {
            path: "suscripcion",
            element: <>Suscripcion</>,
          },
          {
            path: "favoritos",
            element: <>Favoritos</>,
          }
        ]
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
