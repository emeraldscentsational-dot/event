import { apiSlice } from "./apiSlice";
export const vendorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    completevendorprofile: builder.mutation({
      query: (data) => ({
        url: `${process.env.REACT_APP_VENDOR_API_BASE_URL}/vendors`,
        method: 'POST',
        body: data,
      })

    }),
    verifycac: builder.mutation({
      query: (cac) => ({
        url: `${process.env.REACT_APP_CAC_API_BASE_URL}/validate?cacRegistrationNumber=${cac}`,
        method: "GET"
      })

    }),
  }),
});

export const { useCompletevendorprofileMutation, useVerifycacMutation } = vendorApiSlice;
