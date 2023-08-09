/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { settingsAPP } from "../../../config/environments/settings";
import { ICategoriesResponse } from "./types/categories-type";

const baseURLCategories = settingsAPP.api.categories;

export const categoriesAPI = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURLCategories,
    prepareHeaders: (headers) => {
      const token = Cookies.get("jwt_token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "*/*");

      return headers;
    },
  }),
  endpoints: (build) => ({
    getCategories: build.query<ICategoriesResponse[], any>({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      transformResponse: (response: ICategoriesResponse[]) => response,
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesAPI;
