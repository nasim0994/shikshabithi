import { baseApi } from "../baseApi";

export const contentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAcademyContents: builder.query({
      query: (query) => ({
        url: `/api/academy/content/all`,
        method: "GET",
        params: query,
      }),
      providesTags: ["academyContent"],
    }),

    getSingleAcademyContent: builder.query({
      query: (id) => ({
        url: `/api/academy/content/${id}`,
        method: "GET",
      }),
      providesTags: ["academyContent"],
    }),

    addAcademyContent: builder.mutation({
      query: (info) => ({
        url: `/api/academy/content/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["academyContent"],
    }),

    updateAcademyContent: builder.mutation({
      query: ({ id, info }) => ({
        url: `/api/academy/content/edit/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["academyContent"],
    }),

    deleteAcademyContent: builder.mutation({
      query: (id) => ({
        url: `/api/academy/content/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["academyContent"],
    }),
  }),
});

export const {
  useGetAcademyContentsQuery,
  useGetSingleAcademyContentQuery,
  useAddAcademyContentMutation,
  useUpdateAcademyContentMutation,
  useDeleteAcademyContentMutation,
} = contentApi;
