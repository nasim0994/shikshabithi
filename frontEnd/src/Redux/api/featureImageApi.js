import { baseApi } from "./baseApi";

export const featureImageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeatureImage: builder.query({
      query: () => ({
        url: `api/featureImage/all`,
        method: "GET",
      }),
      providesTags: ["featureImage"],
    }),

    addFeatureImage: builder.mutation({
      query: (formData) => ({
        url: `api/featureImage/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["featureImage"],
    }),

    updateFeatureImage: builder.mutation({
      query: ({ id, formData }) => ({
        url: `api/featureImage/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["featureImage"],
    }),
  }),
});

export const {
  useGetFeatureImageQuery,
  useAddFeatureImageMutation,
  useUpdateFeatureImageMutation,
} = featureImageApi;
