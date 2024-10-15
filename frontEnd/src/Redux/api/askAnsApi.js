import { baseApi } from "./baseApi";

export const askAnsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAskAns: builder.query({
      query: (query) => ({
        url: `api/askAns`,
        method: "GET",
        params: query,
      }),
      providesTags: ["askAns"],
    }),

    getAskSingleAns: builder.query({
      query: (id) => ({
        url: `api/askAns/${id}`,
        method: "GET",
      }),
      providesTags: ["askAns"],
    }),

    getAskAnsByUser: builder.query({
      query: () => ({
        url: `api/askAns/byuser`,
        method: "GET",
      }),
      providesTags: ["askAns"],
    }),

    addAskAns: builder.mutation({
      query: (info) => ({
        url: `api/askAns/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["askAns"],
    }),

    updateAskAns: builder.mutation({
      query: ({ id, info }) => ({
        url: `api/askAns/update/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["askAns"],
    }),

    deleteAskAns: builder.mutation({
      query: (id) => ({
        url: `api/askAns/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["askAns"],
    }),
  }),
});

export const {
  useAddAskAnsMutation,
  useDeleteAskAnsMutation,
  useUpdateAskAnsMutation,
  useGetAskAnsByUserQuery,
  useGetAskAnsQuery,
  useGetAskSingleAnsQuery,
} = askAnsApi;
