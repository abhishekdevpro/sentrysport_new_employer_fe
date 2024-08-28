import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, VERS, EndpointSlug } from "@/utils/constant/endPoints";
import { logout } from "../auth";
import { Constant } from "@/utils/constant/constant";

export const Service = createApi({
  reducerPath: "Service",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(Constant.USER_TOKEN) || "";
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
    // Handle unauthorized responses
    fetchFn: async (url, options) => {
      const response = await fetch(url, options);
      if (response.status === 401) {
        // Clear the token if unauthorized
        const { store } = require("../../store");
        localStorage.removeItem(Constant.USER_TOKEN); // delete token from storage
        localStorage.removeItem(Constant.USER_INFO);

        store.dispatch(logout());
      }
      return response;
    },
  }),
  tagTypes: [""], // Add tag type
  endpoints: (builder) => ({
    getDummyData: builder.query({
      query: () => ({
        url: `${EndpointSlug.DUMMY_JSON}`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    }),
    GetJobType: builder.query({
      query: () => ({
        url: `${EndpointSlug.GET_JOB_TYPES}`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    }),
    GetExperienceLevel: builder.query({
      query: () => ({
        url: `${EndpointSlug.GET_EXPERIENCE}`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    }),
    GetJobCategory: builder.query({
      query: () => ({
        url: `${EndpointSlug.GET_JOB_CATEGORIES}`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    }),
    GetSalary: builder.query({
      query: () => ({
        url: `${EndpointSlug.GET_SALARY}`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    }),
    GetFunctionalArea: builder.query({
      query: () => ({
        url: `${EndpointSlug.GET_FUNCTION_AREA}`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    }),
    GetYear: builder.query({
      query: () => ({
        url: `${EndpointSlug.GET_YEARS}`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    }),
    GetPost: builder.query({
      query: () => ({
        url: `${EndpointSlug.GET_POST}`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    }),
    GetPostById: builder.query({
      query: (id) => ({
        url: `${EndpointSlug.GET_POST_BYID}/${id}`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    }),

    createPost: builder.mutation({
      query: (body) => ({
        url: `${EndpointSlug?.CREATE_POST}`,
        method: "POST",
        body: body,
        headers: undefined,
      }),
    }),
  }),
});

export const {
  useGetDummyDataQuery,
  useCreatePostMutation,
  useGetPostQuery,
  useGetJobTypeQuery,
  useGetJobCategoryQuery,
  useGetExperienceLevelQuery,
  useGetSalaryQuery,
  useGetFunctionalAreaQuery,
  useGetYearQuery,
  useGetPostByIdQuery,
} = Service;
