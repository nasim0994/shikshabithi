import { baseApi } from "./baseApi";

export const noticeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotices: builder.query({
      query: (query) => ({
        url: `api/notice`,
        method: "GET",
        params: query,
      }),
      providesTags: ["notice"],
    }),

    getNotice: builder.query({
      query: (id) => ({
        url: `api/notice/${id}`,
        method: "GET",
      }),
      providesTags: ["notice"],
    }),

    getNoticeByUser: builder.query({
      query: () => ({
        url: `api/notice/byuser`,
        method: "GET",
      }),
      providesTags: ["notice"],
    }),

    addNotice: builder.mutation({
      query: (formData) => ({
        url: `api/notice/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["notice"],
    }),

    updateNotice: builder.mutation({
      query: ({ id, formData }) => ({
        url: `api/notice/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["notice"],
    }),

    toggleNoticeStatus: builder.mutation({
      query: ({ id }) => ({
        url: `api/notice/toggle-status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["notice"],
    }),

    deleteNotice: builder.mutation({
      query: (id) => ({
        url: `api/notice/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["notice"],
    }),
  }),
});

export const {
  useAddNoticeMutation,
  useDeleteNoticeMutation,
  useUpdateNoticeMutation,
  useToggleNoticeStatusMutation,
  useGetNoticeByUserQuery,
  useGetNoticeQuery,
  useGetNoticesQuery,
} = noticeApi;
