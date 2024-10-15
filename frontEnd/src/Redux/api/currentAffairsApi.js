import { baseApi } from "./baseApi";

export const currentAffairsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentAffairs: builder.query({
      query: (query) => ({
        url: `api/currentAffairs`,
        method: "GET",
        params: query,
      }),
      providesTags: ["currentAffairs"],
    }),

    getCurrentAffair: builder.query({
      query: (id) => ({
        url: `api/currentAffairs/${id}`,
        method: "GET",
      }),
      providesTags: ["currentAffairs"],
    }),

    getCurrentAffairByUser: builder.query({
      query: () => ({
        url: `api/currentAffairs/byuser`,
        method: "GET",
      }),
      providesTags: ["currentAffairs"],
    }),

    addCurrentAffair: builder.mutation({
      query: (info) => ({
        url: `api/currentAffairs/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["currentAffairs"],
    }),

    updateCurrentAffair: builder.mutation({
      query: ({ id, info }) => ({
        url: `api/currentAffairs/update/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["currentAffairs"],
    }),

    deleteCurrentAffair: builder.mutation({
      query: (id) => ({
        url: `api/currentAffairs/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["currentAffairs"],
    }),
  }),
});

export const {
  useAddCurrentAffairMutation,
  useDeleteCurrentAffairMutation,
  useUpdateCurrentAffairMutation,
  useGetCurrentAffairByUserQuery,
  useGetCurrentAffairQuery,
  useGetCurrentAffairsQuery,
} = currentAffairsApi;
