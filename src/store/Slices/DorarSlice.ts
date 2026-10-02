import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";
import { readDorarCache, writeDorarCache } from "../dorarCache";
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
      async queryFn(skey, _api, _extra, fetchWithBQ) {
        const key = skey.trim();
        const saved = await readDorarCache(key);
        if (saved) return { data: parseDorarResponse(saved) };
        const result = await fetchWithBQ({
          url: "/dorar_api.json",
          params: { skey },
          method: "GET",
        });
        if (!result.error && typeof result.data === "string") {
          writeDorarCache(key, result.data);
          return { data: parseDorarResponse(result.data) };
        }
        return { error: result.error! };
      },
    }),
  }),
});

export const { useSearchHadithQuery } = DorarSlice;
