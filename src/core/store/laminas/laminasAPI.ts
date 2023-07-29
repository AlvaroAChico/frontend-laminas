/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { settingsAPP } from "../../../config/environments/settings";

const baseURLLaminas = settingsAPP.api.laminas;

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

export const laminasApi = createApi({
  reducerPath: "openAiAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURLLaminas,
    prepareHeaders: (headers) => {
      const token = Cookies.get("jwt_token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        headers.set("Content-Type", "application/json");
        headers.set("Accept", "text/html,image/apng,application/pdf");
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    getStatusUserDownloads: build.query<LaminaResponse, any>({
      query: () => ({
        url: `/auth/descargas`,
        method: "GET",
      }),
      transformResponse: (response: LaminaResponse) => response,
    }),
    getListLaminas: build.mutation<LaminaResponse, any>({
      query: () => ({
        url: `/laminas?sort=tbllmnacdgo&render=paginate`,
        method: "GET",
      }),
      transformResponse: (response: LaminaResponse) => response,
    }),
    postLaminasByWord: build.mutation<LaminaResponse, ISearchByWorPerPage>({
      query: ({ word, page }) => ({
        url: `/laminas?sort=tbllmnacdgo&render=paginate&page=${page}&filter[tbllmnanomb]=${word}`,
        method: "GET",
      }),
      transformResponse: (response: LaminaResponse) => response,
    }),
    postLaminasByUUID: build.mutation<LaminaResponse, string>({
      query: (uuid) => ({
        url: `/laminas?sort=tbllmnacdgo&render=paginate&filter[tbllmnauuid]=${uuid}`,
        method: "GET",
      }),
      transformResponse: (response: LaminaResponse) => response,
    }),
    postLaminasPerPage: build.mutation<LaminaResponse, number>({
      query: (page) => ({
        url: `/laminas?sort=tbllmnacdgo&render=paginate&page=${page}`,
        method: "GET",
      }),
      transformResponse: (response: LaminaResponse) => response,
    }),
    postUpdateDownloadBySheet: build.mutation<IResponseDownload, string>({
      query: (sheet) => ({
        url: `/auth/actualizar-descargas/${sheet}`,
        method: "GET",
      }),
      transformResponse: (response: IResponseDownload) => response,
    }),
    getVerifyPlan: build.query<string, string>({
      query: () => ({
        url: `/auth/verificar-plan`,
        method: "GET",
      }),
      transformResponse: (response: string) => response,
    }),
  }),
});

export const {
  useGetStatusUserDownloadsQuery,
  useGetListLaminasMutation,
  usePostLaminasByWordMutation,
  usePostLaminasByUUIDMutation,
  usePostLaminasPerPageMutation,
  usePostUpdateDownloadBySheetMutation,
  useGetVerifyPlanQuery,
} = laminasApi;
