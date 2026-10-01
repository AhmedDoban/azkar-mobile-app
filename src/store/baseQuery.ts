import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.EXPO_PUBLIC_DORAR_API ?? "https://dorar.net",
  responseHandler: "text",
  prepareHeaders: (headers) => {
    headers.set("Accept", "application/json, text/javascript, */*");
    return headers;
  },
});

export default baseQuery;
