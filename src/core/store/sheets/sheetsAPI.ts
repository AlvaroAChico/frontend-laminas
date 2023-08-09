/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { settingsAPP } from "../../../config/environments/settings";
import {
  IPopularSearch,
  ISheetsResponse,
  ISheets,
  ISheetDefaultProps,
} from "./types/laminas-type";
import { IAuthData } from "../auth/types/auth-types";

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

export const sheetsAPI = createApi({
  reducerPath: "sheetsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURLSheets,
    prepareHeaders: (headers) => {
      const user = Cookies.get("auth_user");

      if (user) {
        const objUser: IAuthData = JSON.parse(user) as IAuthData;
        headers.set("authorization", `Bearer ${objUser.token}`);
      }
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "*/*");

      return headers;
    },
  }),
  endpoints: (build) => ({
    getRecommendedSheets: build.query<ISheetDefaultProps[], any>({
      query: () => ({
        url: "/free-sheets?filter[is_recommended]=1",
        method: "GET",
      }),
      transformResponse: (response: ISheetDefaultProps[]) => response,
    }),
    getPopularSheets: build.query<IPopularSearch[], any>({
      query: () => ({
        url: "/popular-searches",
        method: "GET",
      }),
      transformResponse: (response: IPopularSearch[]) => response,
    }),
    getAllSheetsPaginate: build.mutation<ISheetsResponse, ISheets>({
      query: ({ page, size, word }) => {
        const user = Cookies.get("auth_user");
        console.log({ page, size, word });
        const filtersOptions = `?render=paginate&page=${page}${
          size ? `&size=${size}` : ""
        }${word ? `&filter[name]=${word}` : ""}`;

        if (user != null && user != undefined) {
          console.log("Get Sheets with Token", filtersOptions);
          return {
            url: `/sheets${filtersOptions}`,
            method: "GET",
          };
        }
        console.log("Get Sheets without Token", filtersOptions);

        return {
          url: `/free-sheets${filtersOptions}`,
          method: "GET",
        };
      },
      transformResponse: (response: ISheetsResponse) => response,
    }),
  }),
});

export const {
  useGetRecommendedSheetsQuery,
  useGetPopularSheetsQuery,
  useGetAllSheetsPaginateMutation,
} = sheetsAPI;
