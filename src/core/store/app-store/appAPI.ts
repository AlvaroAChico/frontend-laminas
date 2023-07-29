/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { settingsAPP } from "../../../config/environments/settings";

const baseURLLanding = settingsAPP.api.laminas;

export const appApi = createApi({
  reducerPath: "appAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURLLanding,
    prepareHeaders: (headers) => {
      const token = settingsAPP.app.mocks
        ? "111|XM36TYAWPozngvUvXwu0fPrixWiAMtXLSSCQLQfp"
        : Cookies.get("jwt_token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        headers.set("Content-Type", "application/json");
        headers.set("Accept", "text/html,image/apng,application/pdf");
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    getStatusUserDownloads: build.query<string, any>({
      query: () => ({
        url: `/auth/descargas`,
        method: "GET",
      }),
      transformResponse: (response: string) => response,
    }),
    getListLaminas: build.mutation<string, any>({
      query: () => ({
        url: `/laminas?sort=tbllmnacdgo&render=paginate`,
        method: "GET",
      }),
      transformResponse: (response: string) => response,
    }),
  }),
});

export const { useGetStatusUserDownloadsQuery, useGetListLaminasMutation } =
  appApi;
