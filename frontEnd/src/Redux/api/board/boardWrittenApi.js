import { baseApi } from "../baseApi";

export const boardWrittenApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBoardWrittens: builder.query({
      query: (query) => ({
        url: `/api/board-exam/boardWritten/all`,
        method: "GET",
        params: query,
      }),
      providesTags: ["board-exam"],
    }),

    getSingleBoardWritten: builder.query({
      query: (id) => ({
        url: `/api/board-exam/boardWritten/${id}`,
        method: "GET",
      }),
      providesTags: ["board-exam"],
    }),

    addBoardWritten: builder.mutation({
      query: (info) => ({
        url: `/api/board-exam/boardWritten/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["board-exam"],
    }),

    updateBoardWritten: builder.mutation({
      query: ({ id, info }) => ({
        url: `/api/board-exam/boardWritten/edit/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["board-exam"],
    }),

    deleteBoardWritten: builder.mutation({
      query: (id) => ({
        url: `/api/board-exam/boardWritten/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["board-exam"],
    }),
  }),
});

export const {
  useGetBoardWrittensQuery,
  useGetSingleBoardWrittenQuery,
  useAddBoardWrittenMutation,
  useUpdateBoardWrittenMutation,
  useDeleteBoardWrittenMutation,
} = boardWrittenApi;
