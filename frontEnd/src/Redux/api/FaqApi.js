import { baseApi } from "./baseApi";

export const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFaq: builder.query({
      query: () => ({
        url: `api/faq`,
        method: "GET",
      }),
      providesTags: ["faq"],
    }),

    getSingleFaq: builder.query({
      query: (id) => ({
        url: `api/faq/${id}`,
        method: "GET",
      }),
      providesTags: ["faq"],
    }),

    addFaq: builder.mutation({
      query: (info) => ({
        url: `api/faq/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["faq"],
    }),

    updateFaq: builder.mutation({
      query: ({ id, info }) => ({
        url: `api/faq/update/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["faq"],
    }),

    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `api/faq/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["faq"],
    }),
  }),
});

export const {
  useGetFaqQuery,
  useGetSingleFaqQuery,
  useAddFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqApi;
