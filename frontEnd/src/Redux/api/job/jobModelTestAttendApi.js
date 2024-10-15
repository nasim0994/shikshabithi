import { baseApi } from "../baseApi";

export const jobModelTestAttendApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addJobModelTestAttend: builder.mutation({
      query: (info) => ({
        url: `/api/job/modelTestAttend/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["modelTestAttend"],
    }),

    deleteJobModelTestAttend: builder.mutation({
      query: (id) => ({
        url: `/api/job/modelTestAttend/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["modelTestAttend"],
    }),

    getJobModelTestAttend: builder.query({
      query: (query) => ({
        url: `/api/job/modelTestAttend/all`,
        method: "GET",
        params: query,
      }),
      providesTags: ["modelTestAttend"],
    }),

    getSingleJobModelTestAttend: builder.query({
      query: (id) => ({
        url: `/api/job/modelTestAttend/${id}`,
        method: "GET",
      }),
      providesTags: ["modelTestAttend"],
    }),
  }),
});

export const {
  useGetJobModelTestAttendQuery,
  useGetSingleJobModelTestAttendQuery,
  useAddJobModelTestAttendMutation,
  useDeleteJobModelTestAttendMutation,
} = jobModelTestAttendApi;
