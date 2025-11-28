import { apiSlice } from "./apiSlice";
export const customerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
      completecustomerprofile: builder.mutation({
        query: (data) => ({
          url: `${process.env.REACT_APP_CUSTOMER_API_BASE_URL}`,
           method: 'POST',
        body: data,
        })
      }),
      completecustomeronboarding: builder.mutation({
        query: (data) => ({
          url: `${process.env.REACT_APP_CUSTOMER_API_BASE_URL}/onboarding`,
           method: 'POST',
        body: data,
        })
      }),
          uploadImage: builder.mutation<any, any>({
      query: ({ file, ...fields }) => {
        const formData = new FormData();

       
        Object.entries(fields).forEach(([key, value]) =>
  formData.append(key, String(value))
);
        formData.append('ImageFile', file);

        return {
          url: 'fotos',      
          method: 'POST',
          body: formData,    
        };
      },
    }),
      verifynin: builder.mutation({
        query: (nin) => ({
          url: `${process.env.REACT_APP_NIN_API_BASE_URL}/${nin}`

        })
      }),
      getprofile: builder.query({
        query: (id) => ({
          url: `${process.env.REACT_APP_CUSTOMER_API_BASE_URL}/${id}`
        })
      }),
      getsecurityquestions: builder.query({
        query: (id) => ({
          url: `${process.env.REACT_APP_SECURITY_API_BASE_URL}`
        })
      }),
  }),
});

export const { useCompletecustomerprofileMutation,useUploadImageMutation,useVerifyninMutation,useGetprofileQuery,useCompletecustomeronboardingMutation,useGetsecurityquestionsQuery } = customerApiSlice;
