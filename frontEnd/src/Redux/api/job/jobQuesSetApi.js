import { baseApi } from "../baseApi";

export const jobQuesSetApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobQuesSet: builder.query({
      query: (query) => ({
        url: `/api/job/questionSet/all`,
        method: "GET",
        params: query,
      }),
      providesTags: ["jobQuesSet"],
    }),

    getSingleJobQuesSet: builder.query({
      query: (id) => ({
        url: `/api/job/questionSet/${id}`,
        method: "GET",
      }),
      providesTags: ["jobQuesSet"],
    }),

    addJobQuesSet: builder.mutation({
      query: (info) => ({
        url: `/api/job/questionSet/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["jobQuesSet"],
    }),

    updateJobQuesSet: builder.mutation({
      query: ({ id, info }) => ({
        url: `/api/job/questionSet/edit/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["jobQuesSet"],
    }),

    deleteJobQuesSet: builder.mutation({
      query: (id) => ({
        url: `/api/job/questionSet/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["jobQuesSet"],
    }),
  }),
});

export const {
  useGetJobQuesSetQuery,
  useGetSingleJobQuesSetQuery,
  useAddJobQuesSetMutation,
  useUpdateJobQuesSetMutation,
  useDeleteJobQuesSetMutation,
} = jobQuesSetApi;
