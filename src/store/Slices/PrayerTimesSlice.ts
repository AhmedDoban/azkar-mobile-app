import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PrayerTimesResponse } from "@/features/prayer-times/_data/types";

export const PrayerTimesSlice = createApi({
  reducerPath: "PrayerTimesSlice",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.EXPO_PUBLIC_PRAYER_API ?? "https://quran.yousefheiba.com/api",
  }),
  endpoints: (builder) => ({
    GetPrayerTimes: builder.query<PrayerTimesResponse, string>({
      query: () => ({ url: "/getPrayerTimes", method: "GET" }),
      keepUnusedDataFor: 60 * 60,
    }),
  }),
});

export const { useGetPrayerTimesQuery } = PrayerTimesSlice;
