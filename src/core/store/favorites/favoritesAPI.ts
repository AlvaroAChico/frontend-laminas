/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { settingsAPP } from "../../../config/environments/settings";
import { IAuthData } from "../auth/types/auth-types";
import { APP_CONSTANS } from "../../../constants/app";
import { ISheetsResponse } from "../sheets/types/laminas-type";

const baseURLSheets = settingsAPP.api.sheets;

export interface LaminaResponse {
  [x: string]: any;
  currentPage: number;
  data: LaminaDefaultProps[];
  firstPageUrl: string;
  from: number;
  lastPage: number;
  lastPageUrl: string;
  nextPageUrl: string;
  path: string;
  perPage: number;
  prevPageUrl: string;
  to: number;
  total: number;
}
export interface LaminaDefaultProps {
  tbllmnacdgo: number;
  tbllmnacoda: string;
  tbllmnanomb: string;
  tbllmnaimgo: string;
}
export interface ISearchByWorPerPage {
  word?: string;
  page: number;
}

export const favoritesAPI = createApi({
  reducerPath: "favoritesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURLSheets,
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
    postAddFavoriteSheet: build.mutation<any, string>({
      query: (uuid) => ({
        url: "/favorites",
        method: "POST",
        body: {
          sheet_id: uuid,
        },
      }),
      transformResponse: (response: any) => response,
    }),
    deleteFavoriteSheet: build.mutation<any, string>({
      query: (uuid) => ({
        url: `/favorites/${uuid}`,
        method: "DELETE",
      }),
      transformResponse: (response: any) => response,
    }),
    getAllFavoritesPaginate: build.mutation<ISheetsResponse, any>({
      query: ({ page = 1, size = 10 }) => {
        console.log("1 FavoritePaginated");
        return {
          url: `/sheets?render=paginate&page=${page}${
            size ? `&size=${size}` : ""
          }&filter[is_favorite]=1&include=categories,tags`,
          method: "GET",
        };
      },
      transformResponse: (response: ISheetsResponse) => response,
    }),
  }),
});

export const {
  usePostAddFavoriteSheetMutation,
  useDeleteFavoriteSheetMutation,
  useGetAllFavoritesPaginateMutation,
} = favoritesAPI;
