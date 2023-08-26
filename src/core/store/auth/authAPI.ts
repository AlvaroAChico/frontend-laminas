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
  IChangePassword,
  IGoogleResponseURL,
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
    startLoginByGoogle: build.mutation<IGoogleResponseURL, any>({
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
      transformResponse: (response: IGoogleResponseURL) => response,
    }),
    startGoogleCallback: build.mutation<ILoginResponse, string>({
      query: (params) => ({
        url: `auth/login/google/callback${params}`,
        method: "GET",
        headers: {
          ContentType: "application/json",
          Accept: "application/json",
          Mode: "no-cors",
          AccessControlAllowOrigin: "*",
          AccessControlAllowHeaders: "*",
          AccessControlAllowMethods: "*",
        },
      }),
      transformResponse: (response: ILoginResponse) => response,
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
    startChangePassword: build.mutation<any, IChangePassword>({
      query: ({ oldPassword, password }) => ({
        url: `auth/change-password`,
        method: "POST",
        body: {
          old_password: oldPassword,
          password: password,
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
  useStartChangePasswordMutation,
  useStartGoogleCallbackMutation,
} = authAPI;
