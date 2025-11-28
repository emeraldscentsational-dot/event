import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: process.env.REACT_APP_LANDING_API_BASE_URL});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["faqs","testimonials","featured_image"],
  endpoints: () => ({}),
});