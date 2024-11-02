import { baseApi } from "./baseApi";

export const paymentInstructionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentInstruction: builder.query({
      query: () => ({
        url: "/api/payment-instruction",
        method: "GET",
      }),
      providesTags: ["paymentInstruction"],
    }),

    addPaymentInstruction: builder.mutation({
      query: (data) => ({
        url: "/api/payment-instruction/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["paymentInstruction"],
    }),

    updatePaymentInstruction: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/payment-instruction/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["paymentInstruction"],
    }),
  }),
});

export const {
  useGetPaymentInstructionQuery,
  useAddPaymentInstructionMutation,
  useUpdatePaymentInstructionMutation,
} = paymentInstructionApi;
