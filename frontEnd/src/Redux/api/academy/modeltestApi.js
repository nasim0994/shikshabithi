import { baseApi } from "../baseApi";

export const modelTestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAcademyModelTest: builder.query({
      query: (query) => ({
        url: `/api/academy/ondemandtest/all`,
        method: "GET",
        params: query,
      }),
      providesTags: ["ondemandtest"],
    }),

    getSingleAcademyModelTest: builder.query({
      query: (id) => ({
        url: `/api/academy/ondemandtest/${id}`,
        method: "GET",
      }),
      providesTags: ["ondemandtest"],
    }),

    addAcademyModelTest: builder.mutation({
      query: (examInfo) => ({
        url: `/api/academy/ondemandtest/add`,
        method: "POST",
        body: examInfo,
      }),
      invalidatesTags: ["ondemandtest"],
    }),

    updateAcademyModelTest: builder.mutation({
      query: ({ id, info }) => ({
        url: `/api/academy/modelTest/edit/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["modelTest"],
    }),

    deleteAcademyModelTest: builder.mutation({
      query: (id) => ({
        url: `/api/academy/ondemandtest/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ondemandtest"],
    }),
  }),
});

export const {
  useGetAcademyModelTestQuery,
  useGetSingleAcademyModelTestQuery,
  useAddAcademyModelTestMutation,
  useUpdateAcademyModelTestMutation,
  useDeleteAcademyModelTestMutation,
} = modelTestApi;
