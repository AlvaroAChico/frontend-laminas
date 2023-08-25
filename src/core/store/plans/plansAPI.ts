/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { settingsAPP } from "../../../config/environments/settings";
import { IAuthData } from "../auth/types/auth-types";
import { APP_CONSTANS } from "../../../constants/app";
import {
  IAccessTokenResponse,
  ISessionTokenRequest,
  ISessionTokenResponse,
} from "./types/plans-types";

const baseURLPlans = settingsAPP.api.plans;

export const plansAPI = createApi({
  reducerPath: "plansApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURLPlans,
    prepareHeaders: (headers) => {
      const dataUser = Cookies.get(APP_CONSTANS.AUTH_USER_DATA);
      if (dataUser != null && dataUser != undefined) {
        const user = JSON.parse(dataUser) as IAuthData;
        headers.set("authorization", `Bearer ${user.token}`);
      }
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "*/*");

      return headers;
    },
  }),
  endpoints: (build) => ({
    getAccessToken: build.mutation<IAccessTokenResponse, any>({
      query: () => ({
        url: "/niubiz/access-token",
        method: "GET",
      }),
      transformResponse: (response: IAccessTokenResponse) => response,
    }),
    getSessionToken: build.mutation<
      ISessionTokenResponse,
      ISessionTokenRequest
    >({
      query: ({ accessToken, planId }) => ({
        url: "/niubiz/session-token",
        method: "POST",
        body: {
          channel: "web",
          plan_id: planId,
          access_token: accessToken,
        },
      }),
      transformResponse: (response: ISessionTokenResponse) => response,
    }),
  }),
});

export const { useGetAccessTokenMutation, useGetSessionTokenMutation } =
  plansAPI;
