import { baseApi } from "./baseApi";

export const bannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBannerCount: builder.query({
      query: () => ({
        url: `api/banner-count/all`,
        method: "GET",
      }),
      providesTags: ["banner"],
    }),

    getBanner: builder.query({
      query: () => ({
        url: `api/banner`,
        method: "GET",
      }),
      providesTags: ["banner"],
    }),

    addBanner: builder.mutation({
      query: (formData) => ({
        url: `api/banner/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["banner"],
    }),

    updateBanner: builder.mutation({
      query: ({ id, formData }) => ({
        url: `api/banner/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["banner"],
    }),
  }),
});

export const {
  useGetBannerQuery,
  useAddBannerMutation,
  useUpdateBannerMutation,

  useGetBannerCountQuery,
} = bannerApi;
