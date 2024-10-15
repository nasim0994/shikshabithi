import { baseApi } from "../baseApi";

export const examModelTestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addExamModelTest: builder.mutation({
      query: (info) => ({
        url: `/api/examModelTest/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["examModelTest"],
    }),

    updateExamModelTest: builder.mutation({
      query: ({ id, info }) => ({
        url: `/api/examModelTest/update/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["examModelTest"],
    }),

    deleteExamModelTest: builder.mutation({
      query: (id) => ({
        url: `/api/examModelTest/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["examModelTest"],
    }),

    getExamModelTest: builder.query({
      query: () => ({
        url: `/api/examModelTest/all`,
        method: "GET",
      }),
      providesTags: ["examModelTest"],
    }),

    getSingleExamModelTest: builder.query({
      query: (id) => ({
        url: `/api/examModelTest/${id}`,
        method: "GET",
      }),
      providesTags: ["examModelTest"],
    }),
  }),
});

export const {
  useAddExamModelTestMutation,
  useUpdateExamModelTestMutation,
  useDeleteExamModelTestMutation,
  useGetExamModelTestQuery,
  useGetSingleExamModelTestQuery,
} = examModelTestApi;
