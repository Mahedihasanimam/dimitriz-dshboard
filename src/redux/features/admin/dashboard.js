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



    getMostEarning: builder.query({
      query: ( year ) => ({
        url: `/most-earning`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetStatisticsQuery,useGetAnalyticsQuery,useGetMostEarningQuery } = statisticsSlice;
