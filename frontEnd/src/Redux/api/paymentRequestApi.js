import { baseApi } from "./baseApi";

export const paymentRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentRequest: builder.query({
      query: () => ({
        url: "/api/payment-request",
        method: "GET",
      }),
      providesTags: ["paymentRequest"],
    }),

    getPaymentRequestById: builder.query({
      query: (id) => ({
        url: `/api/payment-request/${id}`,
        method: "GET",
      }),
      providesTags: ["paymentRequest"],
    }),

    addPaymentRequest: builder.mutation({
      query: (data) => ({
        url: "/api/payment-request/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["paymentRequest"],
    }),

    updatePaymentRequestStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/api/payment-request/update/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["paymentRequest"],
    }),

    deletePaymentRequest: builder.mutation({
      query: (id) => ({
        url: `/api/payment-request/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["paymentRequest"],
    }),
  }),
});

export const {
  useGetPaymentRequestQuery,
  useGetPaymentRequestByIdQuery,
  useAddPaymentRequestMutation,
  useUpdatePaymentRequestStatusMutation,
  useDeletePaymentRequestMutation,
} = paymentRequestApi;
