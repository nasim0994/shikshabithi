import { baseApi } from "../baseApi";
import { userLoggedIn } from "./userSlice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (info) => ({
        url: "/api/user/processRegister",
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["user"],
    }),

    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/api/user/forgotPassword",
        method: "POST",
        body: email,
      }),
      invalidatesTags: ["user"],
    }),

    setNewPassword: builder.mutation({
      query: (info) => ({
        url: "/api/user/recoverPassword",
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["user"],
    }),

    login: builder.mutation({
      query: (info) => ({
        url: "api/user/login",
        method: "POST",
        body: info,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result?.data?.success) {
            localStorage.setItem("token", result?.data?.token);
            dispatch(
              userLoggedIn({
                token: result?.data?.token,
                data: result?.data,
              })
            );
          }
        } catch (error) {
          // Do not any thing , handel error from ui
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useForgotPasswordMutation,
  useSetNewPasswordMutation,
  useLoginMutation,
} = authApi;
