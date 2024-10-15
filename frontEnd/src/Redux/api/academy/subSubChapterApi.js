import { baseApi } from "../baseApi";

export const subChapterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAcademySubSubChapters: builder.query({
      query: (query) => ({
        url: `/api/academy/sub-sub-chapter/all`,
        method: "GET",
        params: query,
      }),
      providesTags: ["academySubSubChapter"],
    }),

    getSingleAcademySubSubChapter: builder.query({
      query: (id) => ({
        url: `/api/academy/sub-sub-chapter/${id}`,
        method: "GET",
      }),
      providesTags: ["academySubSubChapter"],
    }),

    addAcademySubSubChapter: builder.mutation({
      query: (info) => ({
        url: `/api/academy/sub-sub-chapter/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["academySubSubChapter"],
    }),

    updateAcademySubSubChapter: builder.mutation({
      query: ({ id, info }) => ({
        url: `/api/academy/sub-sub-chapter/edit/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["academySubSubChapter"],
    }),

    deleteAcademySubSubChapter: builder.mutation({
      query: (id) => ({
        url: `/api/academy/sub-sub-chapter/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["academySubSubChapter"],
    }),
  }),
});

export const {
  useGetAcademySubSubChaptersQuery,
  useGetSingleAcademySubSubChapterQuery,
  useAddAcademySubSubChapterMutation,
  useUpdateAcademySubSubChapterMutation,
  useDeleteAcademySubSubChapterMutation,
} = subChapterApi;
