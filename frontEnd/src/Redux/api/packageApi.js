import { baseApi } from "./baseApi";

export const packageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPackages: builder.query({
      query: () => ({
        url: `api/package`,
        method: "GET",
      }),
      providesTags: ["package"],
    }),

    getSinglePackage: builder.query({
      query: (id) => ({
        url: `api/package/${id}`,
        method: "GET",
      }),
      providesTags: ["package"],
    }),

    addPackage: builder.mutation({
      query: (info) => ({
        url: `api/package/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["package"],
    }),

    updatePackage: builder.mutation({
      query: ({ id, info }) => ({
        url: `api/package/update/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["package"],
    }),

    deletePackage: builder.mutation({
      query: (id) => ({
        url: `api/package/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["package"],
    }),
  }),
});

export const {
  useGetPackagesQuery,
  useGetSinglePackageQuery,
  useAddPackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
} = packageApi;
