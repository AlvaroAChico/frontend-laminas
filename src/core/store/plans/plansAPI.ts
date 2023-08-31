/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { settingsAPP } from "../../../config/environments/settings";
import { IAuthData } from "../auth/types/auth-types";
import { APP_CONSTANS } from "../../../constants/app";
import {
  IAccessTokenResponse,
  IAuthorizationRequest,
  IAuthorizationResponse,
  ISessionTokenRequest,
  ISessionTokenResponse,
} from "./types/plans-types";

const baseURLPlans = settingsAPP.api.plans;

export interface IPlanResponse {
  currentPage: number;
  data: IPlansDefaultProps[];
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
export interface IPlansDefaultProps {
  id: string;
  planId: string;
  userId: string;
  download: number;
  isActive: number;
  status: string;
  createdAt: string;
  plan: IPlanData;
}
export interface IPlanData {
  id: string;
  name: string;
  description: string;
  cost: string;
  quantity: number;
  periodTime: string;
  period: string;
  typePeriod: string;
  totalDownload: number;
  isVisible: boolean;
  isDefault: boolean;
  templateQuantity: number;
  isWatermark: boolean;
  planTypeId: string;
  status: string;
  isActive: boolean;
  createdAt: string;
  descargas: string;
  usuarios: number;
}

export const plansAPI = createApi({
  reducerPath: "plansApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURLPlans,
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
    getAccessToken: build.mutation<IAccessTokenResponse, any>({
      query: () => ({
        url: "/niubiz/access-token",
        method: "GET",
      }),
      transformResponse: (response: IAccessTokenResponse) => response,
    }),
    getSessionToken: build.mutation<
      ISessionTokenResponse,
      ISessionTokenRequest
    >({
      query: ({ accessToken, planId }) => ({
        url: "/niubiz/session-token",
        method: "POST",
        body: {
          channel: "web",
          plan_id: planId,
          access_token: accessToken,
        },
      }),
      transformResponse: (response: ISessionTokenResponse) => response,
    }),
    getAuthorizationPayment: build.mutation<
      IAuthorizationResponse,
      IAuthorizationRequest
    >({
      query: ({ accessToken, purchaseNumber, transactionToken }) => ({
        url: "/niubiz/request-authorization",
        method: "POST",
        body: {
          access_token: accessToken,
          purchase_number: purchaseNumber,
          transaction_token: transactionToken,
        },
      }),
      transformResponse: (response: IAuthorizationResponse) => response,
    }),
    getListAllPlans: build.mutation<IPlanResponse, any>({
      query: () => {
        const dataUser = Cookies.get(APP_CONSTANS.AUTH_USER_DATA);
        if (dataUser != null && dataUser != undefined) {
          const user = JSON.parse(dataUser) as IAuthData;
          return {
            url: `/plan-users?render=paginate&filter[user_id]=${user.user.id}&include=plan`,
            method: "GET",
          };
        }
        return {
          url: "/plan-users?render=paginate&filter[user_id]=&include=plan",
          method: "GET",
        };
      },
      transformResponse: (response: IPlanResponse) => response,
    }),
  }),
});

export const {
  useGetAccessTokenMutation,
  useGetSessionTokenMutation,
  useGetAuthorizationPaymentMutation,
  useGetListAllPlansMutation,
} = plansAPI;
