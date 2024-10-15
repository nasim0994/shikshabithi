import { baseApi } from "../baseApi";

export const universityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdmissionUniversities: builder.query({
      query: () => ({
        url: `/api/admission/university/all`,
        method: "GET",
      }),
      providesTags: ["university"],
    }),

    getSingleAdmissionUniversity: builder.query({
      query: (id) => ({
        url: `/api/admission/university/${id}`,
        method: "GET",
      }),
      providesTags: ["university"],
    }),

    addAdmissionUniversity: builder.mutation({
      query: (info) => ({
        url: `/api/admission/university/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["university"],
    }),

    updateAdmissionUniversity: builder.mutation({
      query: ({ id, info }) => ({
        url: `/api/admission/university/edit/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["university"],
    }),

    deleteAdmissionUniversity: builder.mutation({
      query: (id) => ({
        url: `/api/admission/university/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["university"],
    }),
  }),
});

export const {
  useGetAdmissionUniversitiesQuery,
  useGetSingleAdmissionUniversityQuery,
  useAddAdmissionUniversityMutation,
  useUpdateAdmissionUniversityMutation,
  useDeleteAdmissionUniversityMutation,
} = universityApi;
