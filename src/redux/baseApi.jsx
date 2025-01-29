import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dimitristzitzi-backend.onrender.com/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token"); // Correct usage
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("Accept", `*/*`);
        // headers.set("Content-Type", `application/json`);
        headers.set("Access-Control-Allow-Origin", `*/*`);
      }
      return headers;
    },
  }),
  tagTypes: ["user", "blog", "faq", "about","notification"],
  endpoints: () => ({}),
});

export const imageUrl = "https://dimitristzitzi-backend.onrender.com/";
export const websiteUrl = "https://pantagonostis.vercel.app/";
