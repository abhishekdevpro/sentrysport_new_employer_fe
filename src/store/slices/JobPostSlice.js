// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import { createPost } from "./service/JobPostService"
// import { toast } from "react-toastify"

// export const createJobPost = createAsyncThunk('/employeer/jobpost',
//     async(FormData,{rejectWithValue})=>{
//         try {
//            const response = await createPost(FormData) 
//            if(response){
//             toast.success(response.message || "JobPosted SuccessFully!")
//             console.log(response);
//             return response.data
//            }
//            else{
//             toast.error(response.message || "Errror While Posting Job")
//            }
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// )
// const initialState ={
//     jobPost: null,
//     loading: false,
//     error: null,
// }

// const JobPostSlice = createSlice({
//   name:"JobPost",
//   initialState,
//   reducers:{},
//   extraReducers: (builder) => {
//     builder
//       .addCase(createJobPost.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createJobPost.fulfilled, (state, action) => {
//         state.loading = false;
//         state.jobPost = action.payload;
//         state.error = null;
//       })
//       .addCase(createJobPost.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// })

// export default JobPostSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createPost } from "./service/JobPostService";
import { toast } from "react-toastify";

export const createJobPost = createAsyncThunk(
  "employeer/jobpost",
  async (FormData, { rejectWithValue }) => {
    try {
      const response = await createPost(FormData);
      
      if (response) {
        toast.success(response.message || "Job posted successfully!");
        console.log(response,"from jobSlive");
        return response.data; // 🔹 No need for `.data`, since `createPost` already returns `data`
      } else {
        toast.error("Error while posting job");
        return rejectWithValue("Error while posting job");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error posting job");
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

const initialState = {
  jobPost: null,
  loading: false,
  error: null,
};

const JobPostSlice = createSlice({
  name: "JobPost",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createJobPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createJobPost.fulfilled, (state, action) => {
        state.loading = false;
        state.jobPost = action.payload;
        state.error = null;
      })
      .addCase(createJobPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default JobPostSlice.reducer;
