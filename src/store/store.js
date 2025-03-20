import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import jobSlice from "../features/job/jobSlice";
import toggleSlice from "../features/toggle/toggleSlice";
import filterSlice from "../features/filter/filterSlice";
import employerSlice from "../features/employer/employerSlice";
import employerFilterSlice from "../features/filter/employerFilterSlice";
import candidateSlice from "../features/candidate/candidateSlice";
import candidateFilterSlice from "../features/filter/candidateFilterSlice";
import shopSlice from "../features/shop/shopSlice";
// custom
// import AuthSlice from "./slices/auth";
import { Service } from "./slices/service/index";
import AuthSlice from "./slices/authSlice"
import DataSlice from './slices/dataSlice'
import JobPostSlice from "./slices/JobPostSlice"
export const store = configureStore({
  reducer: {
    job: jobSlice,
    toggle: toggleSlice,
    filter: filterSlice,
    employer: employerSlice,
    employerFilter: employerFilterSlice,
    candidate: candidateSlice,
    candidateFilter: candidateFilterSlice,
    shop: shopSlice,
    // custom
    auth: AuthSlice,
    data:DataSlice,
    jobPost:JobPostSlice,
    [Service.reducerPath]: Service.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Service.middleware),
});

setupListeners(store.dispatch);
