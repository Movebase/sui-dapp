import { api } from "..";

const accountApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (payload) => ({
        url: "accounts/login",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation } = accountApi;
