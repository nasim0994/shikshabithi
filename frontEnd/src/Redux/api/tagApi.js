import { baseApi } from "./baseApi";

export const tagApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query({
      query: (query) => ({
        url: `api/tag`,
        method: "GET",
        params: query,
      }),
      providesTags: ["tag"],
    }),

    getTag: builder.query({
      query: (id) => ({
        url: `api/tag/${id}`,
        method: "GET",
      }),
      providesTags: ["tag"],
    }),

    addTag: builder.mutation({
      query: (info) => ({
        url: `api/tag/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["tag"],
    }),

    updateTag: builder.mutation({
      query: ({ id, info }) => ({
        url: `api/tag/update/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["tag"],
    }),

    deleteTag: builder.mutation({
      query: (id) => ({
        url: `api/tag/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tag"],
    }),
  }),
});

export const {
  useAddTagMutation,
  useDeleteTagMutation,
  useUpdateTagMutation,
  useGetTagsQuery,
  useGetTagQuery,
} = tagApi;
