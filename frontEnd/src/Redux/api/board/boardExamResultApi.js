import { baseApi } from "../baseApi";

export const boardExamResultApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addBoardExamResult: builder.mutation({
      query: (info) => ({
        url: `/api/boardExamResult/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["boardExamResult"],
    }),

    deleteBoardExamResult: builder.mutation({
      query: (id) => ({
        url: `/api/boardExamResult/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["boardExamResult"],
    }),

    getBoardExamResult: builder.query({
      query: (query) => ({
        url: `/api/boardExamResult/all`,
        method: "GET",
        params: query,
      }),
      providesTags: ["boardExamResult"],
    }),

    getSingleBoardExamResult: builder.query({
      query: (id) => ({
        url: `/api/boardExamResult/${id}`,
        method: "GET",
      }),
      providesTags: ["boardExamResult"],
    }),
  }),
});

export const {
  useGetBoardExamResultQuery,
  useGetSingleBoardExamResultQuery,
  useAddBoardExamResultMutation,
  useDeleteBoardExamResultMutation,
} = boardExamResultApi;
