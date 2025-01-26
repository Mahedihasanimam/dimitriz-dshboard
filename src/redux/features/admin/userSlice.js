import { api } from "../../baseApi";


const userSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () =>
        `/users`,
      providesTags: ["user"],
    }),
  
    approveInstructor : builder.mutation({
      query: (body) => ({
        url: `/users/auth/approve-instructor`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["user"],
    }),
    




    deleteUsers: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),


    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `users/${userId}`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: ["user"],
    }),


    UpdateOwnProfile: builder.mutation({
      query: (body) => ({
        url: `/users/update-profile-by-user`,
        method: "PATCH",
        body,
      }),
    })


  }),
});

export const { useDeleteUsersMutation, useGetAllUsersQuery, useUpdateUserRoleMutation, useUpdateOwnProfileMutation,useApproveInstructorMutation, } = userSlice;
