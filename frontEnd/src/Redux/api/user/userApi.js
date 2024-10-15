import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allCustomers: builder.query({
      query: () => ({
        url: "/user/allCustomers",
      }),
      providesTags: ["users"],
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/user/all",
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    editUserInfo: builder.mutation({
      query: ({ id, userInfo }) => ({
        url: `/user/update/info/${id}`,
        method: "PUT",
        body: userInfo,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useAllCustomersQuery,
  useEditUserInfoMutation,
} = userApi;
