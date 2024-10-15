import { baseApi } from "../baseApi";

export const instituteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInstitutes: builder.query({
      query: () => ({
        url: `/api/job/institute/all`,
        method: "GET",
      }),
      providesTags: ["institute"],
    }),

    getSingleInstitute: builder.query({
      query: (id) => ({
        url: `/api/job/institute/${id}`,
        method: "GET",
      }),
      providesTags: ["university"],
    }),

    addInstitute: builder.mutation({
      query: (info) => ({
        url: `/api/job/institute/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["institute"],
    }),

    updateInstitute: builder.mutation({
      query: ({ id, info }) => ({
        url: `/api/job/institute/edit/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["institute"],
    }),

    deleteInstitute: builder.mutation({
      query: (id) => ({
        url: `/api/job/institute/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["institute"],
    }),
  }),
});

export const {
  useGetInstitutesQuery,
  useGetSingleInstituteQuery,
  useAddInstituteMutation,
  useUpdateInstituteMutation,
  useDeleteInstituteMutation,
} = instituteApi;
