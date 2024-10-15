import { baseApi } from "./baseApi";
const URL = "contact";

export const contactUsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContactUs: builder.query({
      query: () => ({
        url: `${URL}`,
        method: "GET",
      }),
      providesTags: ["contactUs"],
    }),
    updateContactUsById: builder.mutation({
      query: ({ id, data }) => ({
        url: `${URL}/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["contactUs"],
    }),
    addContactUs: builder.mutation({
      query: (data) => ({
        url: `${URL}/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["contactUs"],
    }),
  }),
});

export const {
  useGetContactUsQuery,
  useUpdateContactUsByIdMutation,
  useAddContactUsMutation,
} = contactUsApi;
