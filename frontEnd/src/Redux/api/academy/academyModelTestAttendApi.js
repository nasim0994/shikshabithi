import { baseApi } from "../baseApi";

export const academyModelTestAttendApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addModelTestAttend: builder.mutation({
      query: (info) => ({
        url: `/api/modeltestAttend/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["modeltestAttend"],
    }),

    deleteModelTestAttend: builder.mutation({
      query: (id) => ({
        url: `/api/modeltestAttend/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["modeltestAttend"],
    }),

    getModelTestAttend: builder.query({
      query: (query) => ({
        url: `/api/modeltestAttend/all`,
        method: "GET",
        params: query,
      }),
      providesTags: ["modeltestAttend"],
    }),

    getSingleModelTestAttend: builder.query({
      query: (id) => ({
        url: `/api/modeltestAttend/${id}`,
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
} = academyModelTestAttendApi;
