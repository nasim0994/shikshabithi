import { baseApi } from "../baseApi";

export const writtenApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAcademyWritten: builder.query({
      query: (query) => ({
        url: `/api/academy/written/all`,
        method: "GET",
        params: query,
      }),
      providesTags: ["written"],
    }),

    getSingleAcademyWritten: builder.query({
      query: (id) => ({
        url: `/api/academy/written/${id}`,
        method: "GET",
      }),
      providesTags: ["written"],
    }),

    addAcademyWritten: builder.mutation({
      query: (info) => ({
        url: `/api/academy/written/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["written"],
    }),

    updateAcademyWritten: builder.mutation({
      query: ({ id, info }) => ({
        url: `/api/academy/written/edit/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["written"],
    }),

    deleteAcademyWritten: builder.mutation({
      query: (id) => ({
        url: `/api/academy/written/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["written"],
    }),
  }),
});

export const {
  useGetAcademyWrittenQuery,
  useGetSingleAcademyWrittenQuery,
  useAddAcademyWrittenMutation,
  useUpdateAcademyWrittenMutation,
  useDeleteAcademyWrittenMutation,
} = writtenApi;
