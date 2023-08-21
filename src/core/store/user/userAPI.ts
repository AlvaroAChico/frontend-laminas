/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { settingsAPP } from "../../../config/environments/settings";
import { APP_CONSTANS } from "../../../constants/app";
import { IAuthData } from "../auth/types/auth-types";
import { IUserUpdate, IUserUpdateResponse } from "./types/types";

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
          console.log("URL -> ", `${baseURLUser}/users/${user!.user.id}`);
          return {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
            url: `/users/${user!.user.id}`,
            method: "PATCH",
            body: {
              first_name: firstName != null ? firstName : "",
              last_name: lastName != null ? lastName : "",
              contact_number: contactNumber != null ? contactNumber : "",
              address: address != null ? address : "",
            },
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
  }),
});

export const { useUpdateBasicDataUserMutation } = userAPI;
