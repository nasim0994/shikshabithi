import { baseApi } from "../baseApi";

export const subChapterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAcademySubChapters: builder.query({
      query: (query) => ({
        url: `/api/academy/sub-chapter/all`,
        method: "GET",
        params: query,
      }),
      providesTags: ["academySubChapter"],
    }),

    getSingleAcademySubChapter: builder.query({
      query: (id) => ({
        url: `/api/academy/sub-chapter/${id}`,
        method: "GET",
      }),
      providesTags: ["academySubChapter"],
    }),

    addAcademySubChapter: builder.mutation({
      query: (info) => ({
        url: `/api/academy/sub-chapter/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["academySubChapter"],
    }),

    updateAcademySubChapter: builder.mutation({
      query: ({ id, info }) => ({
        url: `/api/academy/sub-chapter/edit/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["academySubChapter"],
    }),

    deleteAcademySubChapter: builder.mutation({
      query: (id) => ({
        url: `/api/academy/sub-chapter/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["academySubChapter"],
    }),
  }),
});

export const {
  useGetAcademySubChaptersQuery,
  useGetSingleAcademySubChapterQuery,
  useAddAcademySubChapterMutation,
  useUpdateAcademySubChapterMutation,
  useDeleteAcademySubChapterMutation,
} = subChapterApi;
