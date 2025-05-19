import { Constant } from "@/utils/constant/constant";
import axiosInstance from "./service/axiosInstance";
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const token = localStorage.getItem(Constant.USER_TOKEN)

export const fetchExperienceYears = createAsyncThunk("data/experince",
    async(_,{rejectWithValue})=>{
      try {
        const response = await axiosInstance.get("/employeer/experience",{
            headers:{Authorization:token}
        })
        return response.data.data
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
)
export const fetchExpectedExperienceYears = createAsyncThunk("data/expectedexperince",
    async(_,{rejectWithValue})=>{
      try {
        const response = await axiosInstance.get("/employeer/experience",{
            headers:{Authorization:token}
        })
        return response.data.data
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
)
export const fetchCategories = createAsyncThunk("data/categories",
    async(_,{rejectWithValue})=>{
      try {
        const response = await axiosInstance.get("/employeer/job-categories",{
            headers:{Authorization:token}
        })
        return response.data.data
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
)
export const fetchFunctionalTypes = createAsyncThunk("data/functional-area",
    async(_,{rejectWithValue})=>{
      try {
        const response = await axiosInstance.get("/employeer/functional-area",{
            headers:{Authorization:token}
        })
        return response.data.data
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
)
export const fetchSalaryTypes = createAsyncThunk("data/salary-range",
    async(_,{rejectWithValue})=>{
      try {
        const response = await axiosInstance.get("/employeer/salary-range",{
            headers:{Authorization:token}
        })
        return response.data.data
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
)
export const fetchIndustries = createAsyncThunk("data/industries",
    async(_,{rejectWithValue})=>{
      try {
        const response = await axiosInstance.get("/employeer/industries",{
            headers:{Authorization:token}
        })
        return response.data.data
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
)
export const fetchJobTypes = createAsyncThunk("data/job-types",
    async(_,{rejectWithValue})=>{
      try {
        const response = await axiosInstance.get("/employeer/job-types",{
            headers:{Authorization:token}
        })
        return response.data.data
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
)
const initialState = {
    experienceYears: [],
    expectedExperienceYears: [],
    categories: [],
    functionalTypes: [],
    salaryTypes: [],
    industries: [],
    jobTypes: [],
    status: "idle", 
    error: null,
  };
const dataSlice = createSlice({
    name:"data",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
          .addCase(fetchExperienceYears.fulfilled, (state, action) => {
            state.experienceYears = action.payload;
          })
          .addCase(fetchExpectedExperienceYears.fulfilled, (state, action) => {
            state.expectedExperienceYears = action.payload;
          })
          .addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
          })
          .addCase(fetchFunctionalTypes.fulfilled, (state, action) => {
            state.functionalTypes = action.payload;
          })
          .addCase(fetchSalaryTypes.fulfilled, (state, action) => {
            state.salaryTypes = action.payload;
          })
          .addCase(fetchIndustries.fulfilled, (state, action) => {
            state.industries = action.payload;
          })
          .addCase(fetchJobTypes.fulfilled, (state, action) => {
            state.jobTypes = action.payload;
          });
      },
})
export default dataSlice.reducer;