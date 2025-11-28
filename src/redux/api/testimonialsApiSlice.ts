import { apiSlice } from "./apiSlice";

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const testimonialsApiSlice = apiSlice.injectEndpoints({
  
  endpoints: (builder) => {
    return {
      getTestimonials: builder.query({
        query: () => ({
          url: `/testimonials/getByApprovalStatus?ApprovalStatus=Approved`,
          providesTags: ["testimonials"],
          keepUnusedDataFor: 5,
          
        })
      }),
    
    };
  },
});

export const { useGetTestimonialsQuery } = testimonialsApiSlice;
