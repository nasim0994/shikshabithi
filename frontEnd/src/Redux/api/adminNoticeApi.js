import { baseApi } from "./baseApi";

export const adminNoticeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminNotice: builder.query({
      query: () => ({
        url: `api/adminNotice/all`,
        method: "GET",
      }),
      providesTags: ["adminNotice"],
    }),

    getActiveAdminNotice: builder.query({
      query: () => ({
        url: `api/adminNotice/active`,
        method: "GET",
      }),
      providesTags: ["adminNotice"],
    }),

    getSingleAdminNotice: builder.query({
      query: (id) => ({
        url: `api/adminNotice/${id}`,
        method: "GET",
      }),
      providesTags: ["adminNotice"],
    }),

    addAdminNotice: builder.mutation({
      query: (info) => ({
        url: `api/adminNotice/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["adminNotice"],
    }),

    updateAdminNotice: builder.mutation({
      query: ({ id, info }) => ({
        url: `api/adminNotice/update/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["adminNotice"],
    }),

    updateAdminNoticeStatus: builder.mutation({
      query: (id) => ({
        url: `api/adminNotice/update/status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["adminNotice"],
    }),

    deleteAdminNotice: builder.mutation({
      query: (id) => ({
        url: `api/adminNotice/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["adminNotice"],
    }),
  }),
});

export const {
  useGetAdminNoticeQuery,
  useGetSingleAdminNoticeQuery,
  useAddAdminNoticeMutation,
  useUpdateAdminNoticeMutation,
  useDeleteAdminNoticeMutation,
  useUpdateAdminNoticeStatusMutation,
  useGetActiveAdminNoticeQuery,
} = adminNoticeApi;
