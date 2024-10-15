import { baseApi } from "./baseApi";

export const feedbackApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeedback: builder.query({
      query: () => ({
        url: `api/feedback`,
        method: "GET",
      }),
      providesTags: ["feedback"],
    }),

    getSingleFeedback: builder.query({
      query: (id) => ({
        url: `api/feedback/${id}`,
        method: "GET",
      }),
      providesTags: ["feedback"],
    }),

    addFeedback: builder.mutation({
      query: (info) => ({
        url: `api/feedback/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["feedback"],
    }),

    updateFeedback: builder.mutation({
      query: ({ id, info }) => ({
        url: `api/feedback/update/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["feedback"],
    }),

    deleteFeedback: builder.mutation({
      query: (id) => ({
        url: `api/feedback/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["feedback"],
    }),
  }),
});

export const {
  useGetFeedbackQuery,
  useGetSingleFeedbackQuery,
  useAddFeedbackMutation,
  useUpdateFeedbackMutation,
  useDeleteFeedbackMutation,
} = feedbackApi;
