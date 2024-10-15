import { baseApi } from "./baseApi";

export const blogsCommentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogsComments: builder.query({
      query: (query) => ({
        url: `api/blogComment`,
        method: "GET",
        params: query,
      }),
      providesTags: ["blogComment"],
    }),

    getSingleBlogComment: builder.query({
      query: (id) => ({
        url: `api/blogComment/${id}`,
        method: "GET",
      }),
      providesTags: ["blogComment"],
    }),

    getBlogCommentsByUser: builder.query({
      query: () => ({
        url: `api/blogComment/user`,
        method: "GET",
      }),
      providesTags: ["blogComment"],
    }),

    addBlogComment: builder.mutation({
      query: (info) => ({
        url: `api/blogComment/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["blogComment"],
    }),

    updateBlogComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `api/blogComment/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["blogComment"],
    }),

    deleteBlogComment: builder.mutation({
      query: (id) => ({
        url: `api/blogComment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blogComment"],
    }),
  }),
});

export const {
  useGetBlogsCommentsQuery,
  useGetSingleBlogCommentQuery,
  useGetBlogCommentsByUserQuery,
  useAddBlogCommentMutation,
  useUpdateBlogCommentMutation,
  useDeleteBlogCommentMutation,
} = blogsCommentApi;
