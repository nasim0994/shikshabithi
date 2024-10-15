import { baseApi } from "../baseApi";

export const subjectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAcademySubjects: builder.query({
      query: (query) => ({
        url: `/api/academy/subject/all`,
        method: "GET",
        params: query,
      }),
      providesTags: ["academySubject"],
    }),

    getSingleAcademySubject: builder.query({
      query: (id) => ({
        url: `/api/academy/subject/${id}`,
        method: "GET",
      }),
      providesTags: ["academySubject"],
    }),

    addAcademySubject: builder.mutation({
      query: (info) => ({
        url: `/api/academy/subject/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["academySubject"],
    }),

    updateAcademySubject: builder.mutation({
      query: ({ id, info }) => ({
        url: `/api/academy/subject/edit/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["academySubject"],
    }),

    deleteAcademySubject: builder.mutation({
      query: (id) => ({
        url: `/api/academy/subject/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["academySubject"],
    }),
  }),
});

export const {
  useGetAcademySubjectsQuery,
  useGetSingleAcademySubjectQuery,
  useAddAcademySubjectMutation,
  useUpdateAcademySubjectMutation,
  useDeleteAcademySubjectMutation,
} = subjectApi;
