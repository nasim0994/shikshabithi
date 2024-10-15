import { baseApi } from "./baseApi";

export const blogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: (query) => ({
        url: `api/blogs`,
        method: "GET",
        params: query,
      }),
      providesTags: ["blogs"],
    }),

    getByViewers: builder.query({
      query: (query) => ({
        url: `api/blogs/get-byview`,
        method: "GET",
        params: query,
      }),
      providesTags: ["blogs"],
    }),

    getBlog: builder.query({
      query: (id) => ({
        url: `api/blogs/${id}`,
        method: "GET",
      }),
      providesTags: ["blogs"],
    }),

    getBlogByUser: builder.query({
      query: () => ({
        url: `api/blogs/byuser`,
        method: "GET",
      }),
      providesTags: ["blogs"],
    }),

    addBlog: builder.mutation({
      query: (formData) => ({
        url: `api/blogs/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["blogs"],
    }),

    addBlogView: builder.mutation({
      query: (blogId) => ({
        url: `api/blogs/add-blogview`,
        method: "POST",
        body: blogId,
      }),
      invalidatesTags: ["blogs"],
    }),

    updateBlog: builder.mutation({
      query: ({ id, formData }) => ({
        url: `api/blogs/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["blogs"],
    }),

    toggleBlogStatus: builder.mutation({
      query: ({ id }) => ({
        url: `api/blogs/toggle-status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["blogs"],
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `api/blogs/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blogs"],
    }),
  }),
});

export const {
  useAddBlogMutation,
  useAddBlogViewMutation,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
  useToggleBlogStatusMutation,
  useGetBlogByUserQuery,
  useGetBlogQuery,
  useGetBlogsQuery,
  useGetByViewersQuery,
} = blogsApi;
