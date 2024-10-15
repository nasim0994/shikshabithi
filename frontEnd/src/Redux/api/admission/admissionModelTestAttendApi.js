import { baseApi } from "../baseApi";

export const admissionModelTestAttendApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addAdmissionMTAttend: builder.mutation({
      query: (info) => ({
        url: `/api/admission/modeltestAttent/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["modeltestAttent"],
    }),

    deleteAdmissionMTAttend: builder.mutation({
      query: (id) => ({
        url: `/api/admission/modeltestAttent/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["modeltestAttent"],
    }),

    getAdmissionMTAttend: builder.query({
      query: (query) => ({
        url: `/api/admission/modeltestAttent/all`,
        method: "GET",
        params: query,
      }),
      providesTags: ["modeltestAttent"],
    }),

    getSingleAdmissionMTAttend: builder.query({
      query: (id) => ({
        url: `/api/admission/modeltestAttent/${id}`,
        method: "GET",
      }),
      providesTags: ["modeltestAttent"],
    }),
  }),
});

export const {
  useGetAdmissionMTAttendQuery,
  useGetSingleAdmissionMTAttendQuery,
  useAddAdmissionMTAttendMutation,
  useDeleteAdmissionMTAttendMutation,
} = admissionModelTestAttendApi;
