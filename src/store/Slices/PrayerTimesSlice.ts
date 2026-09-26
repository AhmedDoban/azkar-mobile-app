import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PrayerTimesResponse } from "@/features/prayer-times/_data/types";

// The API locates the caller from their IP, so no coordinates are sent
export const PrayerTimesSlice = createApi({
  reducerPath: "PrayerTimesSlice",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.EXPO_PUBLIC_PRAYER_API ?? "https://quran.yousefheiba.com/api",
  }),
  endpoints: (builder) => ({
    /** `day` (YYYY-MM-DD) only keys the cache so the times refresh every day */
    GetPrayerTimes: builder.query<PrayerTimesResponse, string>({
      query: () => ({ url: "/getPrayerTimes", method: "GET" }),
      keepUnusedDataFor: 60 * 60,
    }),
  }),
});

export const { useGetPrayerTimesQuery } = PrayerTimesSlice;
