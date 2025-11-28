// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./apiSlice";
export const faqsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
      getFaqs: builder.query({
        query: () => ({
          url: `/faqs/getByApprovalStatus?ApprovalStatus=Approved`,
          providesTags: ["faq"],
         keepUnusedDataFor: 5,
        })

      }),
  }),
});

export const { useGetFaqsQuery } = faqsApiSlice;
