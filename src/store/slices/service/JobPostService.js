import { Constant } from "@/utils/constant/constant"
import axiosInstance from "./axiosInstance"

export const createPost = async(FormData)=>{
    const token = localStorage.getItem(Constant.USER_TOKEN)
    try {
        const response = await axiosInstance.post('/employeer/job-post',
            FormData,{
            headers:{Authorization:token}
        })
        if(response.status === 200){
            return response.data
        }
    } catch (error) {
        console.error("Error while sending auth code:", error);
        throw new Error(error.response?.data || "Authentication failed");
    }
}