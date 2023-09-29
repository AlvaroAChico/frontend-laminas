/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { settingsAPP } from "../../../config/environments/settings";
import Cookies from "js-cookie";
import { APP_CONSTANS } from "../../../constants/app";
import { IAuthData } from "../auth/types/auth-types";

const baseURLOpenIA = settingsAPP.api.openai;

export interface ArturitoChoicesResponse {
  text: string;
}
export interface ArturitoResponse {
  message: string;
}

export const openAiAPI = createApi({
  reducerPath: "openAiAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURLOpenIA,
    prepareHeaders: (headers) => {
      const dataUser = Cookies.get(APP_CONSTANS.AUTH_USER_DATA);
      if (dataUser != null && dataUser != undefined) {
        const user = JSON.parse(dataUser) as IAuthData;
        headers.set("Authorization", `Bearer ${user.token}`);
      }
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");

      return headers;
    },
  }),
  endpoints: (build) => ({
    postIAForApp: build.mutation<ArturitoResponse, string>({
      query: (text) => ({
        url: `/arturito/completions`,
        method: "POST",
        body: {
          consulta: text,
        },
      }),
      transformResponse: (response: ArturitoResponse) => response,
    }),
  }),
});

export const { usePostIAForAppMutation } = openAiAPI;
