import { baseApi } from "../baseApi";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProfileImage: builder.mutation({
      query: (formData) => ({
        url: "/api/user/image/update",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["profile"],
    }),

    updateProfileBanner: builder.mutation({
      query: (formData) => ({
        url: "/api/user/banner/update",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["profile"],
    }),

    updateProfileInfo: builder.mutation({
      query: (info) => ({
        url: "/api/user/info/update",
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["profile"],
    }),

    updatePassword: builder.mutation({
      query: (info) => ({
        url: "/api/user/password/update",
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const {
  useUpdateProfileImageMutation,
  useUpdateProfileBannerMutation,
  useUpdateProfileInfoMutation,
  useUpdatePasswordMutation,
} = profileApi;
