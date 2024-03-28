// Or from '@reduxjs/toolkit/query/react'
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api-easm.zepto.vn",
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as RootState).accountReducer.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery("/refreshToken", api, extraOptions);
    if (refreshResult.data) {
      // store the new token
      //   api.dispatch(tokenReceived(refreshResult.data));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      //   api.dispatch(loggedOut());
    }
  }
  return result;
};
export const api = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Post"],

  endpoints: (build) => ({
    // The query accepts a number and returns a Post
    getBill: build.query({
      query: () => `billing/prepare`,
    }),
  }),
});

export const { useGetBillQuery } = api;
