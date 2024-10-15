import { baseApi } from "../baseApi";

export const admissionModelTestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addAdmissionModelTest: builder.mutation({
      query: (info) => ({
        url: `/api/admission/modelTest/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["admissionModelTest"],
    }),

    updateAdmissionModelTest: builder.mutation({
      query: ({ id, info }) => ({
        url: `/api/admission/modelTest/update/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["admissionModelTest"],
    }),

    deleteAdmissionModelTest: builder.mutation({
      query: (id) => ({
        url: `/api/admission/modelTest/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admissionModelTest"],
    }),

    getAdmissionModelTest: builder.query({
      query: () => ({
        url: `/api/admission/modelTest/all`,
        method: "GET",
      }),
      providesTags: ["admissionModelTest"],
    }),

    getSingleAdmissionModelTest: builder.query({
      query: (id) => ({
        url: `/api/admission/modelTest/${id}`,
        method: "GET",
      }),
      providesTags: ["admissionModelTest"],
    }),
  }),
});

export const {
  useAddAdmissionModelTestMutation,
  useUpdateAdmissionModelTestMutation,
  useDeleteAdmissionModelTestMutation,
  useGetAdmissionModelTestQuery,
  useGetSingleAdmissionModelTestQuery,
} = admissionModelTestApi;
