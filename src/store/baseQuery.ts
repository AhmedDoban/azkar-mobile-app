import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Dorar answers with JSON (or JSONP when a callback is passed), so read the body
// as text and let each endpoint parse it
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.EXPO_PUBLIC_DORAR_API ?? "https://dorar.net",
  responseHandler: "text",
  prepareHeaders: (headers) => {
    headers.set("Accept", "application/json, text/javascript, */*");
    return headers;
  },
});

export default baseQuery;
