import { baseApi } from "../baseApi";

export const jobModelTestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addJobModelTest: builder.mutation({
      query: (info) => ({
        url: `/api/job/modelTest/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["jobModelTest"],
    }),

    updateJobModelTest: builder.mutation({
      query: ({ id, info }) => ({
        url: `/api/job/modelTest/update/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["jobModelTest"],
    }),

    deleteJobModelTest: builder.mutation({
      query: (id) => ({
        url: `/api/job/modelTest/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["jobModelTest"],
    }),

    getJobModelTest: builder.query({
      query: () => ({
        url: `/api/job/modelTest/all`,
        method: "GET",
      }),
      providesTags: ["jobModelTest"],
    }),

    getSingleJobModelTest: builder.query({
      query: (id) => ({
        url: `/api/job/modelTest/${id}`,
        method: "GET",
      }),
      providesTags: ["jobModelTest"],
    }),
  }),
});

export const {
  useAddJobModelTestMutation,
  useUpdateJobModelTestMutation,
  useDeleteJobModelTestMutation,
  useGetJobModelTestQuery,
  useGetSingleJobModelTestQuery,
} = jobModelTestApi;
