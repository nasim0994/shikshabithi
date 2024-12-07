import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allCustomers: builder.query({
      query: () => ({
        url: "/api/user/allCustomers",
      }),
      providesTags: ["user"],
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: "/api/user/all",
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    getAllUsersOnly: builder.query({
      query: (query) => ({
        url: "/api/user/all/user",
        method: "GET",
        params: query,
      }),
      providesTags: ["user"],
    }),

    editUserInfo: builder.mutation({
      query: ({ id, userInfo }) => ({
        url: `/api/user/update/info/${id}`,
        method: "PUT",
        body: userInfo,
      }),
      invalidatesTags: ["user"],
    }),

    updateUserStatus: builder.mutation({
      query: (id) => ({
        url: `/api/user/update-status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetAllUsersOnlyQuery,
  useAllCustomersQuery,
  useEditUserInfoMutation,
  useUpdateUserStatusMutation,
} = userApi;
