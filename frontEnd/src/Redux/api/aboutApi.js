import { baseApi } from "./baseApi";

export const aboutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAbout: builder.query({
      query: () => ({
        url: "/api/about",
        method: "GET",
      }),
      providesTags: ["about"],
    }),

    addAbout: builder.mutation({
      query: (data) => ({
        url: "/api/about/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["about"],
    }),

    updateAbout: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/about/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["about"],
    }),
  }),
});

export const { useGetAboutQuery, useAddAboutMutation, useUpdateAboutMutation } =
  aboutApi;
