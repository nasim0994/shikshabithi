import { baseApi } from "./baseApi";

export const featureApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeature: builder.query({
      query: () => ({
        url: `api/feature`,
        method: "GET",
      }),
      providesTags: ["feature"],
    }),

    getSingleFeature: builder.query({
      query: (id) => ({
        url: `api/feature/${id}`,
        method: "GET",
      }),
      providesTags: ["feature"],
    }),

    addFeature: builder.mutation({
      query: (formData) => ({
        url: `api/feature/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["feature"],
    }),

    updateFeature: builder.mutation({
      query: ({ id, formData }) => ({
        url: `api/feature/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["feature"],
    }),

    deleteFeature: builder.mutation({
      query: (id) => ({
        url: `api/feature/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["feature"],
    }),
  }),
});

export const {
  useGetFeatureQuery,
  useGetSingleFeatureQuery,
  useAddFeatureMutation,
  useUpdateFeatureMutation,
  useDeleteFeatureMutation,
} = featureApi;
