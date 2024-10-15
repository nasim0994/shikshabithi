import { baseApi } from "../baseApi";

export const classApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAcademyClasses: builder.query({
      query: (query) => ({
        url: `/api/academy/class/all`,
        method: "GET",
        params: query,
      }),
      providesTags: ["academyClass"],
    }),

    getSingleAcademyClass: builder.query({
      query: (id) => ({
        url: `/api/academy/class/${id}`,
        method: "GET",
      }),
      providesTags: ["academyClass"],
    }),

    addAcademyClass: builder.mutation({
      query: (info) => ({
        url: `/api/academy/class/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["academyClass"],
    }),

    updateAcademyClass: builder.mutation({
      query: ({ id, info }) => ({
        url: `/api/academy/class/edit/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["academyClass"],
    }),

    deleteAcademyClass: builder.mutation({
      query: (id) => ({
        url: `/api/academy/class/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["academyClass"],
    }),
  }),
});

export const {
  useGetAcademyClassesQuery,
  useGetSingleAcademyClassQuery,
  useAddAcademyClassMutation,
  useUpdateAcademyClassMutation,
  useDeleteAcademyClassMutation,
} = classApi;
