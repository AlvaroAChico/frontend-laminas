/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { settingsAPP } from "../../../config/environments/settings";
import {
  IPopularSearch,
  ISheetsResponse,
  ISheets,
  ISheetDefaultProps,
  ISheetsEditorResponse,
} from "./types/laminas-type";
import { IAuthData } from "../auth/types/auth-types";
import { APP_CONSTANS } from "../../../constants/app";

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
      const dataUser = Cookies.get(APP_CONSTANS.AUTH_USER_DATA);
      if (dataUser != null && dataUser != undefined) {
        const user = JSON.parse(dataUser) as IAuthData;
        headers.set("authorization", `Bearer ${user.token}`);
      }
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "*/*");
      headers.set("Access-Control-Allow-Origin", "*");

      return headers;
    },
  }),
  endpoints: (build) => ({
    getRecommendedSheets: build.query<ISheetDefaultProps[], any>({
      query: () => {
        return {
          url: `/sheets?filter[is_recommended]=1`,
          method: "GET",
        };
      },

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
      query: ({ page, size, word, category }) => {
        const filtersOptions = `?render=paginate&page=${page}${
          size ? `&size=${size}` : ""
        }${word ? `&filter[name]=${word}` : ""}${
          category ? `&filter[category]=${category}` : ""
        }&include=tags,categories`;

        return {
          url: `/sheets${filtersOptions}`,
          method: "GET",
        };
        // sort=sheets.id
      },
      transformResponse: (response: ISheetsResponse) => response,
    }),
    getAllEditorSheets: build.mutation<ISheetsEditorResponse, ISheets>({
      query: ({ page, size, word }) => {
        const filtersOptions = `?render=paginate&page=${page}${
          size ? `&size=${size}` : ""
        }${word ? `&filter[name]=${word}` : ""}`;

        // http://localhost:8000/api/sheets?render=paginate&page=1&size=10&filter[name]=incas&include=tags,categories
        return {
          url: `/laminas/editor${filtersOptions}`,
          method: "GET",
        };
      },
      transformResponse: (response: ISheetsEditorResponse) => response,
    }),
  }),
});

export const {
  useGetRecommendedSheetsQuery,
  useGetPopularSheetsQuery,
  useGetAllSheetsPaginateMutation,
  useGetAllEditorSheetsMutation,
} = sheetsAPI;
