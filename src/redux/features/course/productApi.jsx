import { api } from "../../baseApi";


const courseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSingleCourseByid: builder.query({
      query: (id) => ({
        url: `/course/get-course-by-id/${id}`,
        method: "GET",
      }),
      providesTags: ["course"],
    }),
    
    getallcourse: builder.query({
      query: () => ({
        url: `/course/get-all-courses`,
        method: "GET",
      }),
      providesTags: ["course"],
    }),

    delteCourse: builder.mutation({
      query: (id) => ({
        url: `/course/delete-course-by-id/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["course"],
    }),

    approveCourse : builder.mutation({
      query: (id) => ({
        url: `/course/toggle-approve-cancel-course/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["course"],
    }),
    


  }),
});

export const {
  useGetSingleCourseByidQuery,
  useGetallcourseQuery,
  useDelteCourseMutation,
  useApproveCourseMutation
} = courseApi;
