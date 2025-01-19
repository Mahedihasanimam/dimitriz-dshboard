import { api } from "../../baseApi";


const userSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () =>
        `/users`,
      providesTags: ["user"],
    }),
  
    




    deleteUsers: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useDeleteUsersMutation, useGetAllUsersQuery } = userSlice;
