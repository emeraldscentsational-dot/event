import { apiSlice } from "./apiSlice";

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const featurdImageApiSlice = apiSlice.injectEndpoints({
  
  endpoints: (builder) => {
    return {
      getfeaturdImage: builder.query({
        query: () => ({
          url: `/fotos/getByApprovalStatus?ApprovalStatus=Approved`,
          providesTags: ["featured_image"],
          keepUnusedDataFor: 5,
          
        })
      }),
    
    };
  },
});

export const { useGetfeaturdImageQuery } = featurdImageApiSlice;
