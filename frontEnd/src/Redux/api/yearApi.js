import { baseApi } from "./baseApi";

export const yearApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getYears: builder.query({
      query: (query) => ({
        url: `api/year`,
        method: "GET",
        params: query,
      }),
      providesTags: ["year"],
    }),

    getYear: builder.query({
      query: (id) => ({
        url: `api/year/${id}`,
        method: "GET",
      }),
      providesTags: ["year"],
    }),

    addYear: builder.mutation({
      query: (info) => ({
        url: `api/year/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["year"],
    }),

    updateYear: builder.mutation({
      query: ({ id, info }) => ({
        url: `api/year/update/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["year"],
    }),

    deleteYear: builder.mutation({
      query: (id) => ({
        url: `api/year/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["year"],
    }),
  }),
});

export const {
  useAddYearMutation,
  useDeleteYearMutation,
  useUpdateYearMutation,
  useGetYearsQuery,
  useGetYearQuery,
} = yearApi;