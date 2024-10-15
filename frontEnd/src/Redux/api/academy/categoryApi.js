import { baseApi } from "../baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAcademyCategories: builder.query({
      query: () => ({
        url: `/api/academy/category/all`,
        method: "GET",
      }),
      providesTags: ["academyCategory"],
    }),

    getSingleAcademyCategory: builder.query({
      query: (id) => ({
        url: `/api/academy/category/${id}`,
        method: "GET",
      }),
      providesTags: ["academyCategory"],
    }),

    addAcademyCategory: builder.mutation({
      query: (info) => ({
        url: `/api/academy/category/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["academyCategory"],
    }),

    updateAcademyCategory: builder.mutation({
      query: ({ id, info }) => ({
        url: `/api/academy/category/edit/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["academyCategory"],
    }),

    deleteAcademyCategory: builder.mutation({
      query: (id) => ({
        url: `/api/academy/category/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["academyCategory"],
    }),
  }),
});

export const {
  useGetAcademyCategoriesQuery,
  useGetSingleAcademyCategoryQuery,
  useAddAcademyCategoryMutation,
  useUpdateAcademyCategoryMutation,
  useDeleteAcademyCategoryMutation,
} = categoryApi;
