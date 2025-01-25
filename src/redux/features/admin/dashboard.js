import { api } from "../../baseApi";


const statisticsSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getStatistics: builder.query({
      query: (filter) => ({
        url: `/statistics?period=${filter}`,
        method: "GET",
      }),
    }),



    getAnalytics: builder.query({
      query: ({filter,id}) => ({
        url: `/course/get-instructor-transactions/${id}?period=${filter}`,
        method: "GET",
      }),
    }),
    getAdminTransections: builder.query({
      query: ({filter}) => ({
        url: `/payment/get-all-transactions?period=${filter}`,
        method: "GET",
      }),
    }),



    getMostEarning: builder.query({
      query: ( year ) => ({
        url: `/most-earning`,
        method: "GET",
      }),
    }),


    support : builder.mutation({
      query: (data) => ({
        url: `/support/send-mail-to-support`,
        method: "POST",
        body: data,
      }),
    }),
    addWebiner : builder.mutation({
      query: (data) => ({
        url: `/webinar/add-webinar`,
        method: "POST",
        body: data,
      }),
    }),



  }),
});

export const { useGetStatisticsQuery,useGetAnalyticsQuery,useGetMostEarningQuery,useSupportMutation,useAddWebinerMutation,useGetAdminTransectionsQuery } = statisticsSlice;
