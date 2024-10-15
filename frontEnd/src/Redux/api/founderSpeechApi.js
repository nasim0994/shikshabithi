import { baseApi } from "./baseApi";

export const founderSpeechApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFounderSpeech: builder.query({
      query: () => ({
        url: `api/founderSpeech`,
        method: "GET",
      }),
      providesTags: ["founderSpeech"],
    }),

    addFounderSpeech: builder.mutation({
      query: (formData) => ({
        url: `api/founderSpeech/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["founderSpeech"],
    }),

    updateFounderSpeech: builder.mutation({
      query: ({ id, formData }) => ({
        url: `api/founderSpeech/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["founderSpeech"],
    }),
  }),
});

export const {
  useGetFounderSpeechQuery,
  useAddFounderSpeechMutation,
  useUpdateFounderSpeechMutation,
} = founderSpeechApi;
