/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { settingsAPP } from "../../../config/environments/settings";
import {
  ILogin,
  ILoginResponse,
  IAuthData,
  IRegister,
  ILoginByGoogle,
  ILoginByGoogleResponse,
} from "./types/auth-types";
import { APP_CONSTANS } from "../../../constants/app";

const baseURLAuth = settingsAPP.api.auth;

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURLAuth,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "text/html,image/apng,application/pdf");
      headers.set("Access-Control-Allow-Origin", "*");
      return headers;
    },
  }),
  endpoints: (build) => ({
    startLoginByEmail: build.mutation<ILoginResponse, ILogin>({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: {
          email,
          password,
          enviroment: "web",
        },
      }),
      transformResponse: (response: ILoginResponse) => response,
    }),
    startRegisterByEmail: build.mutation<ILoginResponse, IRegister>({
      query: ({ email, password, passConfirmation }) => ({
        url: `/auth/sign-up`,
        method: "POST",
        body: {
          email,
          password,
          password_confirmation: passConfirmation,
          enviroment: "web",
        },
      }),
      transformResponse: (response: ILoginResponse) => response,
    }),
    startLogout: build.mutation<string, any>({
      query: () => {
        const dataUser = Cookies.get(APP_CONSTANS.AUTH_USER_DATA);
        if (dataUser != null && dataUser != undefined) {
          const user = JSON.parse(dataUser) as IAuthData;
          return {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
            url: "/auth/logout",
            method: "POST",
          };
        }
        return {
          url: "/auth/logout",
          method: "POST",
        };
      },
      transformResponse: (response: string) => response,
    }),
    startLoginByGoogle: build.mutation<any, any>({
      query: () => ({
        url: `auth/login/google`,
        method: "POST",
        headers: {
          Accept: "application/json",
          Mode: "no-cors",
          AccessControlAllowOrigin: "*",
          AccessControlAllowHeaders: "*",
          AccessControlAllowMethods: "*",
        },
      }),
      transformResponse: (response: any) => response,
    }),
    startLoginByFacebook: build.mutation<any, any>({
      query: () => ({
        url: `auth/login/facebook`,
        method: "POST",
        headers: {
          AccessControlAllowOrigin: "*",
          mode: "no-cors",
        },
      }),
      transformResponse: (response: any) => response,
    }),
  }),
});

export const {
  useStartLoginByEmailMutation,
  useStartRegisterByEmailMutation,
  useStartLogoutMutation,
  useStartLoginByGoogleMutation,
  useStartLoginByFacebookMutation,
} = authAPI;
