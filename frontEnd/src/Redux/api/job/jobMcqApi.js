import { baseApi } from "../baseApi";

export const jobMcqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobAllMcq: builder.query({
      query: (query) => ({
        url: `/api/job/mcq/all`,
        method: "GET",
        params: query,
      }),
      providesTags: ["jobMcq"],
    }),

    getSingleJobMcq: builder.query({
      query: (id) => ({
        url: `/api/job/mcq/${id}`,
        method: "GET",
      }),
      providesTags: ["jobMcq"],
    }),

    addJobMcq: builder.mutation({
      query: (info) => ({
        url: `/api/job/mcq/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["jobMcq"],
    }),

    updateJobMcq: builder.mutation({
      query: ({ id, info }) => ({
        url: `/api/job/mcq/edit/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["jobMcq"],
    }),

    deleteJobMcq: builder.mutation({
      query: (id) => ({
        url: `/api/job/mcq/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["jobMcq"],
    }),
  }),
});

export const {
  useGetJobAllMcqQuery,
  useGetSingleJobMcqQuery,
  useAddJobMcqMutation,
  useUpdateJobMcqMutation,
  useDeleteJobMcqMutation,
} = jobMcqApi;
