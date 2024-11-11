import { baseApi } from "./baseApi";

export const modelTestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addModelTest: builder.mutation({
      query: (info) => ({
        url: `/api/modeltest/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["modelTest"],
    }),

    updateModelTest: builder.mutation({
      query: ({ id, info }) => ({
        url: `/api/modeltest/update/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["modelTest"],
    }),

    deleteModelTest: builder.mutation({
      query: (id) => ({
        url: `/api/modeltest/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["modelTest"],
    }),

    getModelTest: builder.query({
      query: (query) => ({
        url: `/api/modeltest/all`,
        method: "GET",
        params: query,
      }),
      providesTags: ["modelTest"],
    }),

    getSingleModelTest: builder.query({
      query: (id) => ({
        url: `/api/modeltest/${id}`,
        method: "GET",
      }),
      providesTags: ["modelTest"],
    }),

    getTotalLengthByVendor: builder.query({
      query: () => ({
        url: `/api/modeltest/length`,
        method: "GET",
      }),
    }),

    updateModelTestStatus: builder.mutation({
      query: (id) => ({
        url: `/api/modeltest/update/status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["modelTest"],
    }),
  }),
});

export const {
  useAddModelTestMutation,
  useUpdateModelTestMutation,
  useDeleteModelTestMutation,
  useGetModelTestQuery,
  useGetSingleModelTestQuery,
  useGetTotalLengthByVendorQuery,
  useUpdateModelTestStatusMutation,
} = modelTestApi;
