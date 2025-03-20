// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { Constant } from "@/utils/constant/constant";
// // import { toast } from "react-toastify";
// // import TitleAutocomplete from "./TitleDropdown";
// // import LocationSelector from "./LocationSelector";
// // import { useSelector } from "react-redux";

// // const FormInfoBox = () => {
// //   const token = localStorage.getItem(Constant.USER_TOKEN);
// //   const baseurl = "https://api.sentryspot.co.uk/api/employeer/";
// //   const userInfo = useSelector((state) => state.auth.userInfo);

// //   const [logImg, setLogImg] = useState(null);
// //   const [countries, setCountries] = useState([]);
// //   const [states, setStates] = useState([]);
// //   const [cities, setCities] = useState([]);
// //   const [selectedCountry, setSelectedCountry] = useState("");
// //   const [selectedState, setSelectedState] = useState("");
// //   const [selectedCity, setSelectedCity] = useState("");
// //   const [profileData, setProfileData] = useState({});
// //   const [formValues, setFormValues] = useState({});

// //   const [recruiterTypes, setRecruiterTypes] = useState([
// //     { id: 1, name: "Recruitment Firm" },
// //     { id: 2, name: "Direct Employer" },
// //   ]);

// //   // Fetch profile data on component mount
// //   useEffect(() => {
// //     const fetchProfileData = async () => {
// //       try {
// //         const response = await axios.get(`${baseurl}profile`, {
// //           headers: {
// //             Authorization: token,
// //           },
// //         });
// //         const { data } = response.data;
// //         setProfileData(data.employeer_detail);
// //         setFormValues({
// //           first_name: data.employeer_detail.first_name,
// //           last_name: data.employeer_detail.last_name,
// //           email: data.employeer_detail.email,
// //           phone: data.employeer_detail.phone,
// //           website: data.employeer_detail.website,
// //           designation: data.employeer_detail.designation,
// //           organization: data.employeer_detail.organization,
// //           recuiter_type: data.employeer_detail.recuiter_type,
// //           logImg: data.employeer_detail.photo,
// //           location:data.employeer_detail.location
// //         });
// //         //  setLogImg(data.employeer_detail.photo); // Set initial photo URL
// //         setSelectedCountry(data.employeer_detail.current_country_id || "");
// //         setSelectedState(data.employeer_detail.current_state_id || "");
// //         setSelectedCity(data.employeer_detail.current_city_id || "");
// //       } catch (error) {
// //         console.error("Error fetching profile data:", error);
// //       }
// //     };

// //     fetchProfileData();
// //   }, [token]);

// //   // Handle image upload
// //   const logImgHandler = (event) => {
// //     const file = event.target.files[0];
// //     if (file && file.type.match("image.*")) {
// //       const reader = new FileReader();
// //       reader.readAsDataURL(file);
// //       reader.onloadend = () => {
// //         setLogImg(reader.result); // Store the Base64 string of the file
// //       };
// //     } else {
// //       toast.error("Please upload a valid image file.");
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const form = e.target;
// //     const formData = new FormData();

// //     // Convert Base64 to Blob if logImg is a Base64 string
// //     if (logImg && logImg.startsWith("data:image/")) {
// //       const [metadata, base64Data] = logImg.split(",");
// //       const mimeString = metadata.match(/:(.*?);/)[1]; // Extract MIME type
// //       const byteString = atob(base64Data); // Decode base64
// //       const arrayBuffer = new ArrayBuffer(byteString.length);
// //       const uint8Array = new Uint8Array(arrayBuffer);

// //       for (let i = 0; i < byteString.length; i++) {
// //         uint8Array[i] = byteString.charCodeAt(i);
// //       }

// //       const blob = new Blob([uint8Array], { type: mimeString });
// //       formData.append("photo_upload", blob, "photo.jpg"); // Append Blob as a file
// //     }
// //   console.log(formValues.location,"location");
// //     formData.append("first_name", formValues.first_name);
// //     formData.append("last_name", formValues.last_name);
// //     formData.append("email", formValues.email);
// //     formData.append("phone", formValues.phone);
// //     formData.append("website", formValues.website);
// //     formData.append("designation", formValues.designation);
// //     formData.append("location",formValues.location)
// //     formData.append("organization", formValues.organization);
// //     formData.append("recuiter_type", formValues.recuiter_type);
// //     formData.append("current_country_id", selectedCountry);
// //     formData.append("current_state_id", selectedState);
// //     formData.append("current_city_id", selectedCity);

// //     try {
// //       const response = await axios.put(
// //         `https://api.sentryspot.co.uk/api/employeer/profile`,
// //         formData, // Send FormDataF
// //         {
// //           headers: {
// //             Authorization: token,
// //             // "Content-Type": "multipart/form-data",
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );
// //       if(response.status == "success"){
// //         console.log(response);
// //         toast.success("Personal Details updated successfully!");

// //       }
// //     } catch (error) {
// //       toast.error("Failed to update profile.");
// //       console.error("Error updating profile:", error);
// //     }
// //   };

// //   // Fetch countries
// //   useEffect(() => {
// //     const fetchCountries = async () => {
// //       try {
// //         const response = await axios.get(`${baseurl}countries`, {
// //           headers: {
// //             Authorization: token,
// //           },
// //         });
// //         setCountries(response.data.data);
// //       } catch (error) {
// //         console.error("Error fetching countries:", error);
// //       }
// //     };

// //     fetchCountries();
// //   }, [token]);

// //   // Fetch states
// //   const fetchStates = async (countryId) => {
// //     try {
// //       const response = await axios.get(`${baseurl}stats/${countryId}`, {
// //         headers: {
// //           Authorization: token,
// //         },
// //       });
// //       setStates(response.data.data);
// //       setCities([]); // Reset cities when country changes
// //     } catch (error) {
// //       console.error("Error fetching states:", error);
// //     }
// //   };

// //   // Fetch cities
// //   const fetchCities = async (stateId) => {
// //     try {
// //       const response = await axios.get(`${baseurl}cities/${stateId}`, {
// //         headers: {
// //           Authorization: token,
// //         },
// //       });
// //       setCities(response.data.data);
// //     } catch (error) {
// //       console.error("Error fetching cities:", error);
// //     }
// //   };

// //   // Handle country change
// //   const handleCountryChange = (e) => {
// //     const countryId = e.target.value;
// //     setSelectedCountry(countryId);
// //     fetchStates(countryId);
// //   };

// //   // Handle state change
// //   const handleStateChange = (e) => {
// //     const stateId = e.target.value;
// //     setSelectedState(stateId);
// //     fetchCities(stateId);
// //   };

// //   // Handle form field changes
// //   const handleChange = (e) => {
// //     setFormValues({
// //       ...formValues,
// //       [e.target.name]: e.target.value,
// //     });
// //   };
// // console.log(userInfo,"userInfo");
// //   return (
// //     <form onSubmit={handleSubmit} className="default-form">
// //       <div className="row">
// //         {/* Profile Picture Upload */}
// //         <div className="form-group col-lg-6 col-md-12 flex justify-center">
// //           <div>
// //             <div className="rounded-full border w-32 h-32 flex items-center justify-center overflow-hidden">
// //               <input
// //                 className="uploadButton-input hidden"
// //                 type="file"
// //                 name="photo"
// //                 accept="image/*"
// //                 id="upload"
// //                 onChange={logImgHandler}
// //               />
// //               <label
// //                 className="uploadButton-button cursor-pointer flex items-center justify-center w-full h-full"
// //                 htmlFor="upload"
// //               >
// //                 {logImg && logImg.startsWith("data:image/") ? (
// //                   <img
// //                     src={logImg}
// //                     alt="Uploaded"
// //                     className="w-full h-full object-cover"
// //                   />
// //                 ) : (
// //                   <div className="flex flex-col items-center justify-center text-center w-full h-full">
// //                     <img
// //                       src={`https://api.sentryspot.co.uk${formValues.logImg}`}
// //                       alt="Uploaded"
// //                     />

// //                     <span className="text-sm mt-2">Upload Image</span>
// //                   </div>
// //                 )}
// //               </label>
// //             </div>
// //             <div className="bg-blue-800 w-28 mt-2 py-1 ms-2 text-white text-sm text-center rounded-lg">
// //               Add Picture
// //             </div>
// //           </div>
// //         </div>
// //         {console.log(`https://api.sentryspot.co.uk${formValues.logImg}`)}

// //         {/* Form Fields */}
// //         <div className="form-group col-lg-6 col-md-12">
// //           <label>First Name</label>
// //           <input
// //             type="text"
// //             name="first_name"
// //             placeholder="e.g. Jerome"
// //             required
// //             className="border rounded-none mb-4"
// //             value={userInfo.first_name || ""}
// //             onChange={handleChange}
// //           />
// //           <label>Last Name</label>
// //           <input
// //             type="text"
// //             name="last_name"
// //             placeholder="e.g. Doe"
// //             required
// //             className="border rounded-none"
// //             value={formValues.last_name || ""}
// //             onChange={handleChange}
// //           />
// //         </div>

// //         <div className="form-group col-lg-6 col-md-12">
// //           <label>Email</label>
// //           <input
// //             type="email"
// //             name="email"
// //             placeholder="e.g. email@example.com"
// //             required
// //             className="border rounded-none mb-4"
// //             value={formValues.email || ""}
// //             readOnly
// //           />
// //         </div>
// //         <div className="form-group col-lg-6 col-md-12">
// //           <label>Phone</label>
// //           <input
// //             type="text"
// //             name="phone"
// //             placeholder="e.g. +1 234 567 890"
// //             required
// //             className="border rounded-none"
// //             value={formValues.phone || ""}
// //             readOnly
// //           />
// //         </div>

// //         <div className="form-group col-lg-6 col-md-12">
// //           <label>Website</label>
// //           <input
// //             type="text"
// //             name="website"
// //             placeholder="e.g. www.example.com"
// //             className="border rounded-none mb-4"
// //             value={formValues.website || ""}
// //             onChange={handleChange}
// //           />
// //           {/* <label>Designation</label>
// //           <input
// //             type="text"
// //             name="designation"
// //             placeholder="e.g. HR Manager"
// //             className="border rounded-none"
// //             value={formValues.designation || ""}
// //             onChange={handleChange}
// //           /> */}
// //         </div>
// //         {/* <TitleAutocomplete/> */}
// //         <TitleAutocomplete setFormValues={setFormValues} />

// //         <div className="form-group col-lg-12 col-md-12">
// //           <label>Organization</label>
// //           <input
// //             type="text"
// //             name="organization"
// //             placeholder="e.g. Company XYZ"
// //             className="border rounded-none mb-4"
// //             value={formValues.organization || ""}
// //             onChange={handleChange}
// //           />
// //           <label>Recruiter Type</label>
// //           <select
// //             name="recuiter_type"
// //             className="border rounded-none"
// //             value={formValues.recuiter_type || ""}
// //             onChange={handleChange}
// //           >
// //             {recruiterTypes.map((type) => (
// //               <option key={type.id} value={type.id}>
// //                 {type.name}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         {/* <div className="form-group col-lg-4 col-md-12">
// //           <label>Country</label>
// //           <select
// //             name="country"
// //             className="border rounded-none"
// //             value={selectedCountry}
// //             onChange={handleCountryChange}
// //           >
// //             <option value="">Select Country</option>
// //             {countries.map((country) => (
// //               <option key={country.id} value={country.id}>
// //                 {country.name}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         <div className="form-group col-lg-4 col-md-12">
// //           <label>State</label>
// //           <select
// //             name="state"
// //             className="border rounded-none"
// //             value={selectedState}
// //             onChange={handleStateChange}
// //           >
// //             <option value="">Select State</option>
// //             {states.map((state) => (
// //               <option key={state.id} value={state.id}>
// //                 {state.name}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         <div className="form-group col-lg-4 col-md-12">
// //           <label>City</label>
// //           <select
// //             name="city"
// //             className="border rounded-none"
// //             value={selectedCity}
// //             onChange={(e) => setSelectedCity(e.target.value)}
// //           >
// //             <option value="">Select City</option>
// //             {cities.map((city) => (
// //               <option key={city.id} value={city.id}>
// //                 {city.name}
// //               </option>
// //             ))}
// //           </select>
// //         </div> */}
// //        <LocationSelector setFormValues={setFormValues} />
// //         {/* <div className="form-group col-lg-12 col-md-12 relative mt-4">
// //           <label
// //             htmlFor="location"
// //             className="block text-sm font-medium text-gray-700"
// //           >
// //             Location
// //           </label>
// //           <input
// //             type="text"
// //             name="location"
// //             placeholder="+ Add location"
// //             onChange={handleChange("location")}
// //             value={keywords.location}
// //             required
// //             className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
// //           />

// //             <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
// //               {/* {console.log(locations,">>>locations")}
// //               {locations?.length > 0 && (
// //                 <ul>
// //                   {locations.map((item, index) => (
// //                     <li
// //                       key={index}
// //                       onClick={() => handleSelect("location", item)}
// //                       className="cursor-pointer px-4 py-2 hover:bg-gray-100"
// //                     >
// //                       {item}
// //                     </li>
// //                   ))}
// //                 </ul>
// //               )}
// //             </ul>
// //         </div> */}
// //       </div>

// //       <div className="form-group col-lg-12">
// //         <button type="submit" className="btn bg-blue-800 text-white">
// //           Save
// //         </button>
// //       </div>
// //     </form>
// //   );
// // };

// // export default FormInfoBox;
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useSelector, useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import TitleAutocomplete from "./TitleDropdown";
// import LocationSelector from "./LocationSelector";
// import { Constant } from "@/utils/constant/constant";
// import { updateUserProfile } from "@/store/slices/authSlice";

// const FormInfoBox = () => {
//   const dispatch = useDispatch();
//   const { userInfo, loading, error } = useSelector((state) => state.auth);

//   const [logImg, setLogImg] = useState(null);
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [selectedState, setSelectedState] = useState("");
//   const [selectedCity, setSelectedCity] = useState("");

//   const [recruiterTypes, setRecruiterTypes] = useState([
//     { id: 1, name: "Recruitment Firm" },
//     { id: 2, name: "Direct Employer" },
//   ]);

//   const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm({
//     defaultValues: {
//       first_name: "",
//       last_name: "",
//       email: "",
//       phone: "",
//       website: "",
//       designation: "",
//       location: "",
//       organization: "",
//       recuiter_type: ""
//     }
//   });

//   // Initialize form with data from Redux store
//   useEffect(() => {
//     if (userInfo) {
//       reset({
//         first_name: userInfo.first_name || "",
//         last_name: userInfo.last_name || "",
//         email: userInfo.email || "",
//         phone: userInfo.phone || "",
//         website: userInfo.website || "",
//         designation: userInfo.designation || "",
//         organization: userInfo.organization || "",
//         recuiter_type: userInfo.recuiter_type || "",
//         location: userInfo.location || ""
//       });

//       // Set location data
//       setSelectedCountry(userInfo.current_country_id || "");
//       setSelectedState(userInfo.current_state_id || "");
//       setSelectedCity(userInfo.current_city_id || "");

//       // Handle profile image
//       if (userInfo.photo) {
//         setLogImg(`https://api.sentryspot.co.uk${userInfo.photo}`);
//       }
//     }
//   }, [userInfo, reset]);

//   // Handle image upload
//   const logImgHandler = (event) => {
//     const file = event.target.files[0];
//     if (file && file.type.match("image.*")) {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onloadend = () => {
//         setLogImg(reader.result); // Store the Base64 string of the file
//       };
//     } else {
//       toast.error("Please upload a valid image file.");
//     }
//   };

//   const onSubmit = async (data) => {
//     const formData = new FormData();

//     // Convert Base64 to Blob if logImg is a Base64 string
//     if (logImg && logImg.startsWith("data:image/")) {
//       const [metadata, base64Data] = logImg.split(",");
//       const mimeString = metadata.match(/:(.*?);/)[1]; // Extract MIME type
//       const byteString = atob(base64Data); // Decode base64
//       const arrayBuffer = new ArrayBuffer(byteString.length);
//       const uint8Array = new Uint8Array(arrayBuffer);

//       for (let i = 0; i < byteString.length; i++) {
//         uint8Array[i] = byteString.charCodeAt(i);
//       }

//       const blob = new Blob([uint8Array], { type: mimeString });
//       formData.append("photo_upload", blob, "photo.jpg"); // Append Blob as a file
//     }

//     // Append all form fields to FormData
//     Object.keys(data).forEach(key => {
//       formData.append(key, data[key]);
//     });

//     // Append location fields
//     formData.append("current_country_id", selectedCountry);
//     formData.append("current_state_id", selectedState);
//     formData.append("current_city_id", selectedCity);

//     try {
//       const resultAction = await dispatch(updateUserProfile(formData));
//       if (updateUserProfile.fulfilled.match(resultAction)) {
//         toast.success("Personal Details updated successfully!");
//       }
//     } catch (err) {
//       toast.error("Failed to update profile.");
//       console.error("Error updating profile:", err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="default-form">
//       <div className="row">
//         {/* Profile Picture Upload */}
//         <div className="form-group col-lg-6 col-md-12 flex justify-center">
//           <div>
//             <div className="rounded-full border w-32 h-32 flex items-center justify-center overflow-hidden">
//               <input
//                 className="uploadButton-input hidden"
//                 type="file"
//                 name="photo"
//                 accept="image/*"
//                 id="upload"
//                 onChange={logImgHandler}
//               />
//               <label
//                 className="uploadButton-button cursor-pointer flex items-center justify-center w-full h-full"
//                 htmlFor="upload"
//               >
//                 {logImg && logImg.startsWith("data:image/") ? (
//                   <img
//                     src={logImg}
//                     alt="Uploaded"
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="flex flex-col items-center justify-center text-center w-full h-full">
//                     {logImg ? (
//                       <img
//                         src={logImg}
//                         alt="Profile"
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <span className="text-sm mt-2">Upload Image</span>
//                     )}
//                   </div>
//                 )}
//               </label>
//             </div>
//             <div className="bg-blue-800 w-28 mt-2 py-1 ms-2 text-white text-sm text-center rounded-lg">
//               Add Picture
//             </div>
//           </div>
//         </div>

//         {/* Form Fields */}
//         <div className="form-group col-lg-6 col-md-12">
//           <label>First Name</label>
//           <input
//             type="text"
//             placeholder="e.g. Jerome"
//             className="border rounded-none mb-4"
//             {...register("first_name", { required: "First name is required" })}
//           />
//           {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}

//           <label>Last Name</label>
//           <input
//             type="text"
//             placeholder="e.g. Doe"
//             className="border rounded-none"
//             {...register("last_name", { required: "Last name is required" })}
//           />
//           {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name.message}</p>}
//         </div>

//         <div className="form-group col-lg-6 col-md-12">
//           <label>Email</label>
//           <input
//             type="email"
//             placeholder="e.g. email@example.com"
//             className="border rounded-none mb-4"
//             {...register("email")}
//             readOnly
//           />
//         </div>

//         <div className="form-group col-lg-6 col-md-12">
//           <label>Phone</label>
//           <input
//             type="text"
//             placeholder="e.g. +1 234 567 890"
//             className="border rounded-none"
//             {...register("phone")}
//             readOnly
//           />
//         </div>

//         <div className="form-group col-lg-6 col-md-12">
//           <label>Website</label>
//           <input
//             type="text"
//             placeholder="e.g. www.example.com"
//             className="border rounded-none mb-4"
//             {...register("website")}
//           />
//         </div>

//         {/* Title Autocomplete - passes setValue to update form */}
//         <TitleAutocomplete
//           setFormValues={(values) => {
//             if (values.designation) {
//               setValue("designation", values.designation);
//             }
//           }}
//           defaultValue={watch("designation")}
//         />

//         <div className="form-group col-lg-12 col-md-12">
//           <label>Organization</label>
//           <input
//             type="text"
//             placeholder="e.g. Company XYZ"
//             className="border rounded-none mb-4"
//             {...register("organization")}
//           />

//           <label>Recruiter Type</label>
//           <select
//             className="border rounded-none"
//             {...register("recuiter_type")}
//           >
//             {recruiterTypes.map((type) => (
//               <option key={type.id} value={type.id}>
//                 {type.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Location Selector - passes setValue to update form */}
//         {/* <LocationSelector
//           setFormValues={(values) => {
//             if (values.location) {
//               setValue("location", values.location);
//             }
//           }}
//           setSelectedCountry={setSelectedCountry}
//           setSelectedState={setSelectedState}
//           setSelectedCity={setSelectedCity}
//           selectedCountry={selectedCountry}
//           selectedState={selectedState}
//           selectedCity={selectedCity}
//           defaultLocation={watch("location")}
//         /> */}
//       </div>

//       <div className="form-group col-lg-12">
//         <button
//           type="submit"
//           className="btn bg-blue-800 text-white"
//           disabled={loading}
//         >
//           {loading ? "Saving..." : "Save"}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default FormInfoBox;

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import TitleAutocomplete from "./TitleDropdown";
import LocationSelector from "./LocationSelector";
import { Constant } from "@/utils/constant/constant";
import Input from "@/UI-Components/Input";
import SelectInput from "@/UI-Components/SelectInput";
import { updateUserProfile } from "@/store/slices/authSlice";

const FormInfoBox = () => {
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.auth);

  const [logImg, setLogImg] = useState(null);


  const recruiterTypes = [
    { id: 1, name: "Recruitment Firm" },
    { id: 2, name: "Direct Employer" },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      website: "",
      designation: "",
      location_name: "",
      organization: "",
      recuiter_type: "",
    },
  });

  // Initialize form with data from Redux store
  useEffect(() => {
    if (userInfo) {
      reset({
        first_name: userInfo.first_name || "",
        last_name: userInfo.last_name || "",
        email: userInfo.email || "",
        phone: userInfo.phone || "",
        website: userInfo.website || "",
        designation: userInfo.designation || "",
        organization: userInfo.organization || "",
        recuiter_type: userInfo.recruiter_type_id || "",
        location_name: userInfo.location_name || "",
      });

      // Set location data

      // Handle profile image
      if (userInfo.photo) {
        setLogImg(`https://api.sentryspot.co.uk${userInfo.photo}`);
      }
    }
  }, [userInfo, reset]);

  // Handle image upload
  const logImgHandler = (event) => {
    const file = event.target.files[0];
    if (file && file.type.match("image.*")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setLogImg(reader.result); // Store the Base64 string of the file
      };
    } else {
      toast.error("Please upload a valid image file.");
    }
  };

  const onSubmit = async (data) => {
    console.log("Called on");
    const formData = new FormData();

    // Convert Base64 to Blob if logImg is a Base64 string
    if (logImg && logImg.startsWith("data:image/")) {
      const [metadata, base64Data] = logImg.split(",");
      const mimeString = metadata.match(/:(.*?);/)[1]; // Extract MIME type
      const byteString = atob(base64Data); // Decode base64
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uint8Array = new Uint8Array(arrayBuffer);

      for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([uint8Array], { type: mimeString });
      formData.append("photo_upload", blob, "photo.jpg"); // Append Blob as a file
    }

    // Append all form fields to FormData
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    // Append location fields

    try {
      const resultAction = await dispatch(updateUserProfile(formData));
      if (updateUserProfile.fulfilled.match(resultAction)) {
        toast.success("Personal Details updated successfully!");
      }
    } catch (err) {
      toast.error("Failed to update profile.");
      console.error("Error updating profile:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="default-form">
      <div className="row">
        {/* Profile Picture Upload */}
        <div className="form-group col-lg-6 col-md-12 flex justify-center">
          <div>
            <div className="rounded-full border w-32 h-32 flex items-center justify-center overflow-hidden">
              <input
                className="uploadButton-input hidden"
                type="file"
                name="photo"
                accept="image/*"
                id="upload"
                onChange={logImgHandler}
              />
              <label
                className="uploadButton-button cursor-pointer flex items-center justify-center w-full h-full"
                htmlFor="upload"
              >
                {logImg && logImg.startsWith("data:image/") ? (
                  <img
                    src={logImg}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center w-full h-full">
                    {logImg ? (
                      <img
                        src={logImg}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-sm mt-2">Upload Image</span>
                    )}
                  </div>
                )}
              </label>
            </div>
            <div className="bg-blue-800 w-28 mt-2 py-1 ms-2 text-white text-sm text-center rounded-lg">
              Add Picture
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="form-group col-lg-6 col-md-12">
          <Input
            label="First Name"
            placeholder="e.g. Jerome"
            className="mb-4"
            error={errors.first_name?.message}
            {...register("first_name", { required: "First name is required" })}
          />

          <Input
            label="Last Name"
            placeholder="e.g. Doe"
            error={errors.last_name?.message}
            {...register("last_name", { required: "Last name is required" })}
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <Input
            label="Email"
            type="email"
            placeholder="e.g. email@example.com"
            className="mb-4"
            readOnly
            {...register("email")}
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <Input
            type="tel"
            label="Phone"
            placeholder="e.g. +1 234 567 890"
            className="mb-4"
            {...register("phone")}
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <Input
            label="Website"
            placeholder="e.g. www.example.com"
            className="mb-4"
            {...register("website")}
          />
        </div>

        {/* Title Autocomplete - passes setValue to update form */}
        <TitleAutocomplete
          register={register}
          setValue={setValue}
          defaultValue={watch("designation")}
        />

        <div className="form-group col-lg-12 col-md-12">
          <Input
            label="Organization"
            placeholder="e.g. Company XYZ"
            className="mb-4"
            {...register("organization")}
          />

          <SelectInput
            label="Recruiter Type"
            options={recruiterTypes}
            error={errors.recuiter_type?.message}
            {...register("recruiter_type_id")}
          />
        </div>

       
        <LocationSelector
          register={register}
          setValue={setValue}
          defaultLocation={watch("location_name")}
        />
      </div>

      <div className="form-group col-lg-12">
        <button
          type="submit"
          className="py-2 px-4 rounded-md bg-blue-800 text-white"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default FormInfoBox;
