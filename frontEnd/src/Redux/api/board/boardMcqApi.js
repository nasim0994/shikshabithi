import { baseApi } from "../baseApi";

export const boardMcqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBoardMcqs: builder.query({
      query: (query) => ({
        url: `/api/board-exam/boardMcq/all`,
        method: "GET",
        params: query,
      }),
      providesTags: ["board-exam"],
    }),

    getSingleBoardMcq: builder.query({
      query: (id) => ({
        url: `/api/board-exam/boardMcq/${id}`,
        method: "GET",
      }),
      providesTags: ["board-exam"],
    }),

    addBoardMcq: builder.mutation({
      query: (info) => ({
        url: `/api/board-exam/boardMcq/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["board-exam"],
    }),

    updateBoardMcq: builder.mutation({
      query: ({ id, info }) => ({
        url: `/api/board-exam/boardMcq/edit/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["board-exam"],
    }),

    deleteBoardMcq: builder.mutation({
      query: (id) => ({
        url: `/api/board-exam/boardMcq/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["board-exam"],
    }),
  }),
});

export const {
  useGetBoardMcqsQuery,
  useGetSingleBoardMcqQuery,
  useAddBoardMcqMutation,
  useUpdateBoardMcqMutation,
  useDeleteBoardMcqMutation,
} = boardMcqApi;
