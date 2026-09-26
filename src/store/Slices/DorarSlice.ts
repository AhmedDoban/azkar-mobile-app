import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";
import {
  DorarHadith,
  parseDorarResponse,
} from "@/features/hadith/_components/parseDorar";

export const DorarSlice = createApi({
  reducerPath: "DorarSlice",
  baseQuery,
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    SearchHadith: builder.query<DorarHadith[], string>({
      query: (skey) => ({
        url: "/dorar_api.json",
        params: { skey },
        method: "GET",
      }),
      transformResponse: (raw: string) => parseDorarResponse(raw),
    }),
  }),
});

export const { useSearchHadithQuery } = DorarSlice;
