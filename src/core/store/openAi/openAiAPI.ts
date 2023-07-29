/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { settingsAPP } from "../../../config/environments/settings";

const baseURLOpenIA = settingsAPP.api.openai;

export interface ArturitoChoicesResponse {
  text: string;
}
export interface ArturitoResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: ArturitoChoicesResponse[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export const openAiAPI = createApi({
  reducerPath: "openAiAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURLOpenIA,
    prepareHeaders: (headers) => {
      const token = "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";
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        headers.set("Content-Type", "application/json");
        headers.set("Accept", "text/html,image/apng,application/pdf");
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    postIAForApp: build.mutation<ArturitoResponse, string>({
      query: (text) => ({
        url: `/completions`,
        method: "POST",
        body: {
          model: "text-davinci-003",
          prompt: text,
          max_tokens: 250,
          temperature: 0.7,
        },
      }),
      transformResponse: (response: ArturitoResponse) => response,
    }),
  }),
});

export const { usePostIAForAppMutation } = openAiAPI;
