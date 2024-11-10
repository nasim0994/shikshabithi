import { baseApi } from "./baseApi";

export const modelTestAttendApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addModelTestAttend: builder.mutation({
      query: (info) => ({
        url: `/api/modeltest-attend/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["modeltestAttend"],
    }),

    deleteModelTestAttend: builder.mutation({
      query: (id) => ({
        url: `/api/modeltest-attend/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["modeltestAttend"],
    }),

    getModelTestAttend: builder.query({
      query: (query) => ({
        url: `/api/modeltest-attend/all`,
        method: "GET",
        params: query,
      }),
      providesTags: ["modeltestAttend"],
    }),

    getSingleModelTestAttend: builder.query({
      query: (id) => ({
        url: `/api/modeltest-attend/${id}`,
        method: "GET",
      }),
      providesTags: ["modeltestAttend"],
    }),
  }),
});

export const {
  useGetModelTestAttendQuery,
  useGetSingleModelTestAttendQuery,
  useAddModelTestAttendMutation,
  useDeleteModelTestAttendMutation,
} = modelTestAttendApi;
