import React from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
import LandingPage from "../../features/landing/landing-page";
import LaminasPage from "../../features/laminas/laminas-page";
import PlansPage from "../../features/plans/plans-page";
import DashboardPage from "../../features/dashboard/dashboard-page";
import EditorKonva from "../../features/editor-konva/editor-konva";

import ProfileSection from "../../features/dashboard/components/profile/profile-section";
import DownloadsSection from "../../features/dashboard/components/downloads/downloads-section";
import SubscriptionSection from "../../features/dashboard/components/subscription/subscription-section";
import FavouritesSection from "../../features/dashboard/components/favourites/favourites-section";

import CustomLayout from "../../components/custom-layout/custom-layout";
import ResponsePayment from "../../features/response-payment/response-payment";
import RecoveryPassword from "../../features/recovery-password/recovery-password";

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
            element: <ProfileSection />,
          },
          {
            path: "descargas",
            element: <DownloadsSection />,
          },
          {
            path: "suscripcion",
            element: <SubscriptionSection />,
          },
          {
            path: "favoritos",
            element: <FavouritesSection />,
          },
        ],
      },
      {
        path: "recuperar-contraseña",
        element: <RecoveryPassword />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [
      {
        path: "payment/:transactionToken",
        element: <ResponsePayment />,
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
