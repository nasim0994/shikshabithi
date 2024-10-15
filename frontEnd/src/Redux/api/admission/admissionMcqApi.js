import { baseApi } from "../baseApi";

export const admissionMcqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdmissionAllMcq: builder.query({
      query: (query) => ({
        url: `/api/admission/mcq/all`,
        method: "GET",
        params: query,
      }),
      providesTags: ["mcq"],
    }),

    getSingleAdmissionMcq: builder.query({
      query: (id) => ({
        url: `/api/admission/mcq/${id}`,
        method: "GET",
      }),
      providesTags: ["mcq"],
    }),

    addAdmissionMcq: builder.mutation({
      query: (info) => ({
        url: `/api/admission/mcq/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["mcq"],
    }),

    updateAdmissionMcq: builder.mutation({
      query: ({ id, info }) => ({
        url: `/api/admission/mcq/edit/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["mcq"],
    }),

    deleteAdmissionMcq: builder.mutation({
      query: (id) => ({
        url: `/api/admission/mcq/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["mcq"],
    }),
  }),
});

export const {
  useGetAdmissionAllMcqQuery,
  useGetSingleAdmissionMcqQuery,
  useAddAdmissionMcqMutation,
  useUpdateAdmissionMcqMutation,
  useDeleteAdmissionMcqMutation,
} = admissionMcqApi;
