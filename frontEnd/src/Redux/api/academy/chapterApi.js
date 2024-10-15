import { baseApi } from "../baseApi";

export const chapterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAcademyChapters: builder.query({
      query: (query) => ({
        url: `/api/academy/chapter/all`,
        method: "GET",
        params: query,
      }),
      providesTags: ["academyChapter"],
    }),

    getSingleAcademyChapter: builder.query({
      query: (id) => ({
        url: `/api/academy/chapter/${id}`,
        method: "GET",
      }),
      providesTags: ["academyChapter"],
    }),

    addAcademyChapter: builder.mutation({
      query: (info) => ({
        url: `/api/academy/chapter/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["academyChapter"],
    }),

    updateAcademyChapter: builder.mutation({
      query: ({ id, info }) => ({
        url: `/api/academy/chapter/edit/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["academyChapter"],
    }),

    deleteAcademyChapter: builder.mutation({
      query: (id) => ({
        url: `/api/academy/chapter/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["academyChapter"],
    }),
  }),
});

export const {
  useGetAcademyChaptersQuery,
  useGetSingleAcademyChapterQuery,
  useAddAcademyChapterMutation,
  useUpdateAcademyChapterMutation,
  useDeleteAcademyChapterMutation,
} = chapterApi;
