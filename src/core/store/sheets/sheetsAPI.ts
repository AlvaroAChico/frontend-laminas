/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { settingsAPP } from "../../../config/environments/settings";
import { ISheetResponse,IPopularSearch } from './types/laminas-type'

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
interface IResponseDownload {
  status: string;
}

export const sheetsAPI = createApi({
  reducerPath: "sheetsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURLSheets,
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
    getRecommendedSheets: build.query<ISheetResponse[], any>({
      query: () => ({
        url: '/free-sheets?filter[is_recommended]=1',
        method: "GET"
      }),
      transformResponse: (response: ISheetResponse[]) => response,
    }),
    getPopularSheets: build.query<IPopularSearch[], any>({
      query: () => ({
        url: '/popular-searches',
        method: "GET",
      }),
      transformResponse: (response: IPopularSearch[]) => response,
    })
  }),
}); 

export const {
  useGetRecommendedSheetsQuery,
  useGetPopularSheetsQuery,
} = sheetsAPI;
