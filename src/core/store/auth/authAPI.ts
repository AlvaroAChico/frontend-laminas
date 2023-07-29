/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { settingsAPP } from "../../../config/environments/settings";
import { ILogin, ILoginResponse, IAuthData, IRegister } from './types/auth-types'

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
    startLogin: build.mutation<ILoginResponse, ILogin>({
        query: ({ email, password }) => ({
          url: '/auth/login',
          method: "POST",
          body: {
              email,
              password
          },
        }),
        transformResponse: (response: ILoginResponse) => response,
    }),
    startRegister: build.mutation<ILoginResponse, IRegister>({
      query: ({ email, password, passConfirmation}) => ({
        url: `/auth/sign-up`,
        method: "POST",
        body: {
          email,
          password,
          password_confirmation: passConfirmation,
        }       
      }),
      transformResponse: (response: ILoginResponse) => response,
    }),
    startLogout: build.mutation<string, any>({
      query: () => {
        const authCookie = Cookies.get("auth_user")
        if(authCookie != null && authCookie != undefined){
          const authUser: IAuthData = JSON.parse(authCookie)
          return ({
            headers: {
              Authorization: `Bearer ${authUser.token}`
            },
            url: '/auth/logout',
            method: "POST",
          })
        }
        return ({
          url: '/auth/logout',
          method: "POST",
        })
      },
      transformResponse: (response: string) => response,
    }),
  }),
});

export const {
    useStartLoginMutation,
    useStartRegisterMutation,
    useStartLogoutMutation
} = authAPI;
