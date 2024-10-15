import { baseApi } from "./baseApi";

export const handnotesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHandNotes: builder.query({
      query: (query) => ({
        url: `api/handnotes`,
        method: "GET",
        params: query,
      }),
      providesTags: ["handnotes"],
    }),

    getHandNote: builder.query({
      query: (id) => ({
        url: `api/handnotes/${id}`,
        method: "GET",
      }),
      providesTags: ["handnotes"],
    }),

    getHandNoteByUser: builder.query({
      query: () => ({
        url: `api/handnotes/byuser`,
        method: "GET",
      }),
      providesTags: ["handnotes"],
    }),

    addHandNote: builder.mutation({
      query: (formData) => ({
        url: `api/handnotes/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["handnotes"],
    }),

    updateHandNote: builder.mutation({
      query: ({ id, formData }) => ({
        url: `api/handnotes/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["handnotes"],
    }),

    toggleHandNoteStatus: builder.mutation({
      query: ({ id }) => ({
        url: `api/handnotes/toggle-status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["handnotes"],
    }),

    deleteHandNote: builder.mutation({
      query: (id) => ({
        url: `api/handnotes/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["handnotes"],
    }),
  }),
});

export const {
  useAddHandNoteMutation,
  useDeleteHandNoteMutation,
  useUpdateHandNoteMutation,
  useToggleHandNoteStatusMutation,
  useGetHandNoteByUserQuery,
  useGetHandNoteQuery,
  useGetHandNotesQuery,
} = handnotesApi;
