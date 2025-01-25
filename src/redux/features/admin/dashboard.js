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
      query: (filter) => ({
        url: `/course/get-user-course-transaction-statistcs/67358c5759b6e770a39ca863?filter=${filter}`,
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
