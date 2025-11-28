import { apiSlice } from "./apiSlice";
export const eventApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
      getEvents: builder.query({
        query: () => ({
          url: `${process.env.REACT_APP_EVENT_API_BASE_URL}/eventVenues?Page=1&IsDeleted=false`,
          providesTags: ["event"],
         keepUnusedDataFor: 5,
        })

      }),
  
  }),
});

export const { useGetEventsQuery } = eventApiSlice;
