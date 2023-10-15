/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { settingsAPP } from "../../../config/environments/settings";
import { APP_CONSTANS } from "../../../constants/app";
import { IAuthData } from "../auth/types/auth-types";
import {
  IResetPassRequest,
  IResetResponse,
  IUserUpdate,
  IUserUpdateResponse,
} from "./types/types";

const baseURLUser = settingsAPP.api.user;

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURLUser,
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
    updateBasicDataUser: build.mutation<IUserUpdateResponse, IUserUpdate>({
      query: ({ firstName, lastName, contactNumber, address }) => {
        const dataUser = Cookies.get(APP_CONSTANS.AUTH_USER_DATA);
        if (dataUser != null && dataUser != undefined) {
          const user = JSON.parse(dataUser) as IAuthData;
          let data = {};
          if (firstName != "") {
            data = { ...data, first_name: firstName };
          }
          if (lastName != "") {
            data = { ...data, last_name: lastName };
          }
          if (contactNumber != "") {
            data = { ...data, contact_number: contactNumber };
          }
          if (address != "") {
            data = { ...data, address: address };
          }
          return {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
            url: `/users/${user!.user.id}`,
            method: "PATCH",
            body: data,
          };
        }
        return {
          url: `/users/`,
          method: "PATCH",
          body: {
            first_name: firstName,
            last_name: lastName,
            contact_number: contactNumber,
            address: address,
          },
        };
      },
      transformResponse: (response: IUserUpdateResponse) => response,
    }),
    updatePasswordRecovery: build.mutation<IResetResponse, IResetPassRequest>({
      query: ({ token, email, pass }) => ({
        url: `/auth/reset-password`,
        method: "POST",
        body: {
          token: token,
          email: email,
          password: pass,
          password_confirmation: pass,
        },
      }),
      transformResponse: (response: IResetResponse) => response,
    }),
  }),
});

export const {
  useUpdateBasicDataUserMutation,
  useUpdatePasswordRecoveryMutation,
} = userAPI;
