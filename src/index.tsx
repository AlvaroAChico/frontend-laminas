import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./core/store";
import App from "./App";
import { RouterProvider } from "react-router-dom";
import { router } from "./config/routes/router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { settingsAPP } from "./config/environments/settings";

// eslint-disable-next-line
const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <GoogleOAuthProvider clientId={settingsAPP.app.g_client_id}>
    {/* <React.StrictMode> */}
    <Provider store={store}>
      <RouterProvider router={router} />
      <App />
    </Provider>
    {/* </React.StrictMode> */}
  </GoogleOAuthProvider>
);
