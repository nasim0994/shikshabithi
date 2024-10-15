import { baseApi } from "../baseApi";

export const boardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBoards: builder.query({
      query: () => ({
        url: `/api/board-exam/board/all`,
        method: "GET",
      }),
      providesTags: ["board-exam"],
    }),

    getSingleBoard: builder.query({
      query: (id) => ({
        url: `/api/board-exam/board/${id}`,
        method: "GET",
      }),
      providesTags: ["board-exam"],
    }),

    addBoard: builder.mutation({
      query: (info) => ({
        url: `/api/board-exam/board/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["board-exam"],
    }),

    updateBoard: builder.mutation({
      query: ({ id, info }) => ({
        url: `/api/board-exam/board/edit/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["board-exam"],
    }),

    deleteBoard: builder.mutation({
      query: (id) => ({
        url: `/api/board-exam/board/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["board-exam"],
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useGetSingleBoardQuery,
  useAddBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
} = boardApi;
