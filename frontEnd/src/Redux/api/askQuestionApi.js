import { baseApi } from "./baseApi";

export const askQuestionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAskQuestions: builder.query({
      query: (query) => ({
        url: `api/askQuestion`,
        method: "GET",
        params: query,
      }),
      providesTags: ["askQuestion"],
    }),

    getAskQuestion: builder.query({
      query: (id) => ({
        url: `api/askQuestion/${id}`,
        method: "GET",
      }),
      providesTags: ["askQuestion"],
    }),

    getAskQuestionByUser: builder.query({
      query: () => ({
        url: `api/askQuestion/byuser`,
        method: "GET",
      }),
      providesTags: ["askQuestion"],
    }),

    addAskQuestion: builder.mutation({
      query: (formData) => ({
        url: `api/askQuestion/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["askQuestion"],
    }),

    updateAskQuestion: builder.mutation({
      query: ({ id, formData }) => ({
        url: `api/askQuestion/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["askQuestion"],
    }),

    toggleQuestionStatus: builder.mutation({
      query: ({ id }) => ({
        url: `api/askQuestion/toggle-status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["askQuestion"],
    }),

    deleteAskQuestion: builder.mutation({
      query: (id) => ({
        url: `api/askQuestion/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["askQuestion"],
    }),
  }),
});

export const {
  useAddAskQuestionMutation,
  useDeleteAskQuestionMutation,
  useUpdateAskQuestionMutation,
  useToggleQuestionStatusMutation,
  useGetAskQuestionByUserQuery,
  useGetAskQuestionQuery,
  useGetAskQuestionsQuery,
} = askQuestionApi;
