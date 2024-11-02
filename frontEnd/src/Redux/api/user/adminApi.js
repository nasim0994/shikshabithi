import { baseApi } from "../baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addAdmin: builder.mutation({
      query: (info) => ({
        url: "/api/admin/add",
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["user"],
    }),

    getAllAdmins: builder.query({
      query: () => "/api/admin/all",
      providesTags: ["user"],
    }),

    getAdminById: builder.query({
      query: (id) => `/api/admin/${id}`,
      providesTags: ["user"],
    }),

    updateAdmin: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/admin/update/${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["user"],
    }),

    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/api/admin/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useAddAdminMutation,
  useGetAllAdminsQuery,
  useGetAdminByIdQuery,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} = adminApi;
