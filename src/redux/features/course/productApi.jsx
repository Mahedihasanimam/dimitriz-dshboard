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



    getallCategory: builder.query({
      query: () => ({
        url: `/course/get-all-categories`,
        method: "GET",
      }),
      
    }),



    createCourse: builder.mutation({
      query: (body) => ({
        url: `/course/add-course`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["course"],
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

    CreateCourseSection : builder.mutation({
      query: (body) => ({
        url: `/section/add-section`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["course"],
    }),
    


    getSectionbyCourseId: builder.query({
      query: (id) => ({
        url: `/section/get-all-sections/${id}`,
        method: "GET",
      }),
      providesTags: ["sections"],
    }),

    addSection : builder.mutation({
      query: (body) => ({
        url: `/section/add-section`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["sections"],
    }),
    createALecture : builder.mutation({
      query: (body) => ({
        url: `/lecture/add-lecture`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["sections"],
    }),

  }),
});

export const {
  useGetSingleCourseByidQuery,
  useGetallcourseQuery,
  useDelteCourseMutation,
  useApproveCourseMutation,
  useGetallCategoryQuery,
  useCreateCourseMutation,
  useCreateCourseSectionMutation,
  useGetSectionbyCourseIdQuery,
  useAddSectionMutation,
  useCreateALectureMutation,
 
} = courseApi;
