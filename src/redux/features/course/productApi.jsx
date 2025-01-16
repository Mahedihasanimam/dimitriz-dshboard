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
 
    


  }),
});

export const {
  useGetSingleCourseByidQuery,
} = courseApi;
