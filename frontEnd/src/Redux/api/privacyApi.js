import { baseApi } from "./baseApi";

export const privacyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacy: builder.query({
      query: () => ({
        url: "/api/privacy",
        method: "GET",
      }),
      providesTags: ["privacy"],
    }),

    addPrivacy: builder.mutation({
      query: (data) => ({
        url: "/api/privacy/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["privacy"],
    }),

    updatePrivacy: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/privacy/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["privacy"],
    }),
  }),
});

export const {
  useGetPrivacyQuery,
  useAddPrivacyMutation,
  useUpdatePrivacyMutation,
} = privacyApi;
