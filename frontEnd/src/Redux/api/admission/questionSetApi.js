import { baseApi } from "../baseApi";

export const questionSetApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdmissionAllQuestionSet: builder.query({
      query: (query) => ({
        url: `/api/admission/questionSet/all`,
        method: "GET",
        params: query,
      }),
      providesTags: ["questionSet"],
    }),

    getSingleAdmissionQuestionSet: builder.query({
      query: (id) => ({
        url: `/api/admission/questionSet/${id}`,
        method: "GET",
      }),
      providesTags: ["questionSet"],
    }),

    addAdmissionQuestionSet: builder.mutation({
      query: (info) => ({
        url: `/api/admission/questionSet/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["questionSet"],
    }),

    updateAdmissionQuestionSet: builder.mutation({
      query: ({ id, info }) => ({
        url: `/api/admission/questionSet/edit/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["questionSet"],
    }),

    deleteAdmissionQuestionSet: builder.mutation({
      query: (id) => ({
        url: `/api/admission/questionSet/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["questionSet"],
    }),
  }),
});

export const {
  useGetAdmissionAllQuestionSetQuery,
  useGetSingleAdmissionQuestionSetQuery,
  useAddAdmissionQuestionSetMutation,
  useUpdateAdmissionQuestionSetMutation,
  useDeleteAdmissionQuestionSetMutation,
} = questionSetApi;
