import { baseApi } from "./baseApi";

export const logoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLogo: builder.query({
      query: () => ({
        url: `api/logo`,
        method: "GET",
      }),
      providesTags: ["logo"],
    }),

    addLogo: builder.mutation({
      query: (formData) => ({
        url: `api/logo/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["logo"],
    }),

    updateLogo: builder.mutation({
      query: ({ id, formData }) => ({
        url: `api/logo/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["logo"],
    }),
  }),
});

export const { useGetLogoQuery, useAddLogoMutation, useUpdateLogoMutation } =
  logoApi;
