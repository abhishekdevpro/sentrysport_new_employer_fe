// import { useEffect, useState } from "react";
// import { Switch } from "@/components/ui/switch";
// import LogoCoverUploader from "./LogoCoverUploader";
// import ReactQuill from "react-quill";
// import { Constant } from "@/utils/constant/constant";
// import { toast, ToastContainer } from "react-toastify";

// const SocialNetworkBox = () => {
//   const [companyData, setCompanyData] = useState({
//     company_name: "",
//     summery: "",
//     about: "",
//     company_size_id: 1,
//     email: "",
//     company_type_id: 1,
//     tagline: "",
//     website_link: "",
//     founded_date: "",
//     phone: "",
//     country_id: 231,
//     state_id: 3919,
//     city_id: 48132,
//     zip_code: "",
//     address: "",
//     facebook_link: "",
//     twitter_link: "",
//     google_link: "",
//     linkedin_link: "",
//     company_industry_id: 1,
//     health_insurance: false,
//     health_insurance_value: "",
//     cafeteria: false,
//     cafeteria_value: "",
//     recreational_area: false,
//     recreational_area_value: "",
//     personal_accident_insurance: false,
//     personal_accident_insurance_value: "",
//     life_insurance: false,
//     life_insurance_value: "",
//     wellness_center: false,
//     wellness_center_value: "",
//     maternity_leave: false,
//     maternity_leave_value: "",
//     join_us: "",
//   });

//   const [makesUsUnique, setMakesUsUnique] = useState([]);

//   const token = localStorage.getItem(Constant.USER_TOKEN);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCompanyData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };



//   useEffect(() => {
//     // Fetch existing data from the API
//     fetch("https://api.sentryspot.co.uk/api/employeer/company", {
//       headers: {
//         Authorization: token
//       }
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setCompanyData(data?.data);
//         setMakesUsUnique([
//           {
//             title: "Health Insurance",
//             key: "health_insurance",
//             toogle: data?.data?.health_insurance || false,
//             value: data?.data?.health_insurance_value || "",
//           },
//           {
//             title: "24 hour Wellness Center",
//             key: "wellness_center",
//             toogle: data?.data?.wellness_center || false,
//             value: data?.data?.wellness_center_value || "",
//           },
//           {
//             title: "Cafeteria",
//             key: "cafeteria",
//             toogle: data?.data?.cafeteria || false,
//             value: data?.data?.cafeteria_value || "",
//           },
//           {
//             title: "Maternity and Paternity Leave",
//             key: "maternity_leave",
//             toogle: data?.data?.maternity_leave || false,
//             value: data?.data?.maternity_leave_value || "",
//           },
//           {
//             title: "Recreational Area",
//             key: "recreational_area",
//             toogle: data?.data?.recreational_area || false,
//             value: data?.data?.recreational_area_value || "",
//           },
//           {
//             title: "Life Insurance",
//             key: "life_insurance",
//             toogle: data?.data?.life_insurance || false,
//             value: data?.data?.life_insurance_value || "",
//           },
//           {
//             title: "Personal Accident Insurance",
//             key: "personal_accident_insurance",
//             toogle: data?.data?.personal_accident_insurance || false,
//             value: data?.data?.personal_accident_insurance_value || "",
//           },
//         ]);
//       })
//       .catch((error) => console.error("Error fetching data: ", error));
//   }, [token]);

//   // Handle the form submission
//   const handleSave = (event) => {
//     event.preventDefault();
  
//     // Prepare data for the PUT request
//     const dataToUpdate = {
//       ...companyData,
//       health_insurance: makesUsUnique.find(item => item.key === "health_insurance")?.toogle || false,
//       health_insurance_value: makesUsUnique.find(item => item.key === "health_insurance")?.value || "",
//       cafeteria: makesUsUnique.find(item => item.key === "cafeteria")?.toogle || false,
//       cafeteria_value: makesUsUnique.find(item => item.key === "cafeteria")?.value || "",
//       recreational_area: makesUsUnique.find(item => item.key === "recreational_area")?.toogle || false,
//       recreational_area_value: makesUsUnique.find(item => item.key === "recreational_area")?.value || "",
//       personal_accident_insurance: makesUsUnique.find(item => item.key === "personal_accident_insurance")?.toogle || false,
//       personal_accident_insurance_value: makesUsUnique.find(item => item.key === "personal_accident_insurance")?.value || "",
//       life_insurance: makesUsUnique.find(item => item.key === "life_insurance")?.toogle || false,
//       life_insurance_value: makesUsUnique.find(item => item.key === "life_insurance")?.value || "",
//       wellness_center: makesUsUnique.find(item => item.key === "wellness_center")?.toogle || false,
//       wellness_center_value: makesUsUnique.find(item => item.key === "wellness_center")?.value || "",
//       maternity_leave: makesUsUnique.find(item => item.key === "maternity_leave")?.toogle || false,
//       maternity_leave_value: makesUsUnique.find(item => item.key === "maternity_leave")?.value || "",
//       company_name:companyData.company_name || "",
//       facebook_link: companyData.facebook_link || "",
//       twitter_link: companyData.twitter_link || "",
//       linkedin_link: companyData.linkedin_link || "",
//       join_us: companyData.join_us || "",
//       website_link: companyData.website_link || "",
//     };
  
//     // Make PUT request to update the company data
//     fetch("https://api.sentryspot.co.uk/api/employeer/company", {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token,
//       },
//       body: JSON.stringify(dataToUpdate),
//     })
//       .then((response) => response.json())
//       .then((result) => {
//         toast.success("Data successfully updated", result);
//       })
//       .catch((error) => {
//         toast.error("Error updating data: ", error);
//       });
//   };

//   const handleQuillChange = (value) => {
//     setCompanyData(prevData => ({
//       ...prevData,
//       join_us: value
//     }));
//   };
  

//   return (
//     <form className="default-form" onSubmit={handleSave}>
//       <div className="row">
// <ToastContainer/>
//       <div className="form-group col-lg-12   col-md-12">
//           <label>Company Name</label>
//           <input
//             type="text"
//             name="facebook_link"
//             value={companyData.company_name}
//             onChange={handleInputChange}
//             placeholder="company_name"
//           />
//         </div>
//       <div className="form-group col-lg-12 col-md-12">
//           <label htmlFor="name">main paragraph (summary)</label>
//           <ReactQuill
//             theme="snow"
//             // modules={modules}
           
//             placeholder=" Describe the role and responsiblities, skills required for the job and help the candidates understand the role better"
//             className="h-36 mb-5 text-lg " 
//           />
//           {/* {errors.name && (
//             <p className="!text-red-500 text-sm">{errors.name.message}</p>
//           )} */}
//         </div>
//            {/* About Company Section */}
//         <h4 className="text-2xl text-black capitalize mb-2">
//           About Company
//         </h4>

//         <div className="form-group col-lg-12 col-md-12">
//           <label>Section Title</label>
//           <input
//             type="text"
//             name="about_title"
//             value={companyData.about_title}
//             onChange={handleInputChange}
//             placeholder="Enter section title"
//             className="mb-4"
//           />
//         </div>

//         <div className="form-group col-lg-12 col-md-12">
//           <label>About Description</label>
//           <ReactQuill
//             theme="snow"
//             value={companyData.about_description}
//             onChange={(value) => setCompanyData(prev => ({...prev, about_description: value}))}
//             placeholder="Describe your company's story, mission, and values"
//             className="h-36 mb-5 text-lg"
//           />
//         </div>

//         <div className="form-group col-lg-12 col-md-12">
//           <label className="block mb-2">Upload Images (Max 3)</label>
//           <div className="flex flex-col gap-4">
//             <div className="flex items-center gap-4">
//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 // onChange={handleAboutImagesUpload}
//                 className="hidden"
//                 id="about-images-upload"
//                 // disabled={companyData.about_images.length >= 3}
//               />
//               <label
//                 htmlFor="about-images-upload"
//                 className={`cursor-pointer px-4 py-2 rounded-md  text-white transition-colors`}
//               >
//                 Upload Images
//               </label>
//               <span className="text-sm text-gray-500">
//                 {/* {3 - companyData.about_images.length} slots remaining */}
//               </span>
//             </div>
            
//             <div className="flex flex-wrap gap-4">
//               {/* {companyData.about_images.map((image, index) => (
//                 <div key={index} className="relative">
//                   <img
//                     src={URL.createObjectURL(image)}
//                     alt={`About ${index + 1}`}
//                     className="w-32 h-32 object-cover rounded-lg"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => removeAboutImage(index)}
//                     className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
//                   >
//                     ×
//                   </button>
//                 </div>
//               ))} */}
//                <LogoCoverUploader />
//             </div>
//           </div>
//         </div>

//         {/*  */}
//         <h4 className="text-2xl text-black capitalize mb-2">
//           Info About company
//         </h4>

//         <LogoCoverUploader />

//         <div className="form-group col-lg-12 col-md-12">
//           <label htmlFor="name">Info about Company</label>
//           <ReactQuill
//             theme="snow"
//             // modules={modules}
           
//             placeholder=" Describe the role and responsiblities, skills required for the job and help the candidates understand the role better"
//             className="h-36 mb-5 text-lg " 
//           />
//           {/* {errors.name && (
//             <p className="!text-red-500 text-sm">{errors.name.message}</p>
//           )} */}
//         </div>
//         {/* culter/event */}
//         <h4 className="text-2xl text-black capitalize mb-2">
//           Info About Event
//         </h4>
//         <div className="form-group col-lg-12 col-md-12">
//           {/* <label htmlFor="name">main paragraph</label> */}
//           <ReactQuill
//             theme="snow"
//             // modules={modules}
           
//             placeholder=" Describe the role and responsiblities, skills required for the job and help the candidates understand the role better"
//             className="h-36 mb-5 text-lg " 
//           />
//           {/* {errors.name && (
//             <p className="!text-red-500 text-sm">{errors.name.message}</p>
//           )} */}
//         </div>
//         <div className=" flex justify-between form-group col-lg-12 col-md-12">
//           {/* <label htmlFor="name">main paragraph</label> */}
//           {/* <LogoCoverUploader /> */}
//           <div className="form-group col-lg-6 col-md-6">
//             <LogoCoverUploader text="Add Video" />
//           </div>
//           <div className="form-group col-lg-6 col-md-6">
//             <LogoCoverUploader />
//           </div>
//         </div>

//         <h4 className="text-2xl text-black capitalize mb-2">Add Your Team</h4>
//         <LogoCoverUploader text="upload multiple images" />

//         <div className="form-group col-lg-12 col-md-12 ">
//         <ReactQuill
//             theme="snow"
//             // modules={modules}
           
//             placeholder=" Describe the role and responsiblities, skills required for the job and help the candidates understand the role better"
//             className="h-36 mb-5 text-lg " 
//           />
//           {/* {errors.name && (
//             <p className="!text-red-500 text-sm">{errors.name.message}</p>
//           )} */}
//         </div>

        // <h4 className="text-2xl text-black capitalize mb-2">
        //   Watch what we have to say
        // </h4>
        // <div className=" flex justify-between form-group col-lg-12 col-md-12">
        //   {/* <label htmlFor="name">main paragraph</label> */}
        //   {/* <LogoCoverUploader /> */}
        //   <div className="form-group col-lg-6 col-md-6">
        //     <LogoCoverUploader text="Add Video" />
        //   </div>
        //   <div className="form-group col-lg-6 col-md-6">
        //     <LogoCoverUploader />
        //   </div>
        // </div>
        // <div className="form-group col-lg-12 col-md-12 ">
        // <ReactQuill
        //     theme="snow"
        //     // modules={modules}
           
        //     placeholder=" Describe the role and responsiblities, skills required for the job and help the candidates understand the role better"
        //     className="h-36 mb-5 text-lg " 
        //   />
        //   {/* {errors.name && (
        //     <p className="!text-red-500 text-sm">{errors.name.message}</p>
        //   )} */}
        // </div>

   

       



//         {/* What Makes Us Unique */}
//         <h4 className="text-2xl text-black capitalize mb-2">What Makes Us Unique</h4>
//         {makesUsUnique.map((item, index) => (
//           <div className="form-group col-lg-6 col-md-12" key={index}>
//             <div className="flex justify-between items-center mb-2">
//               <label className="text-[15px] font-semibold">{item.title}</label>
//               <Switch
//                 className="rounded-xl data-[state=checked]:bg-[#0292e6]"
//                 checked={item.toogle}
//                 onCheckedChange={(e) => {
//                   setMakesUsUnique((prev) =>
//                     prev.map((val, i) =>
//                       i === index ? { ...val, toogle: e } : val
//                     )
//                   );
//                 }}
//               />
//             </div>
//             {item.toogle && (
//               <input
//                 type="text"
//                 value={item.value}
//                 onChange={(e) => {
//                   setMakesUsUnique((prev) =>
//                     prev.map((val, i) =>
//                       i === index ? { ...val, value: e.target.value } : val
//                     )
//                   );
//                 }}
//               />
//             )}
//           </div>
//         ))}


// <h4 className="text-2xl text-black capitalize mb-2">Join Us</h4>
//         <div className="form-group col-lg-12 col-md-12">
//           <label htmlFor="name">Added a link to show new opportunity </label>
//           <ReactQuill
//             theme="snow"
//             // modules={modules}
//             value={companyData.join_us}
//     onChange={handleQuillChange}
//             placeholder=" Describe the role and responsiblities, skills required for the job and help the candidates understand the role better"
//             className="h-36 mb-5 text-lg " 
//           />
//           {/* {errors.name && (
//             <p className="!text-red-500 text-sm">{errors.name.message}</p>
//           )} */}
//         </div>

//         <h4 className="text-2xl text-black capitalize my-2">
//           Footer (Contact)
//         </h4>

//         {/* Facebook */}
//         <div className="form-group col-lg-6 col-md-12">
//           <label>Facebook</label>
//           <input
//             type="text"
//             name="facebook_link"
//             value={companyData.facebook_link}
//             onChange={handleInputChange}
//             placeholder="www.facebook.com/your-company"
//           />
//         </div>

//         {/* LinkedIn */}
//         <div className="form-group col-lg-6 col-md-12">
//           <label>LinkedIn</label>
//           <input
//             type="text"
//             name="linkedin_link"
//             value={companyData.linkedin_link}
//             onChange={handleInputChange}
//             placeholder="www.linkedin.com/company/your-company"
//           />
//         </div>

//         {/* Twitter */}
//         <div className="form-group col-lg-6 col-md-12">
//           <label>Twitter</label>
//           <input
//             type="text"
//             name="twitter_link"
//             value={companyData.twitter_link}
//             onChange={handleInputChange}
//             placeholder="www.twitter.com/your-company"
//           />
//         </div>

//         <h4 className="text-2xl text-black capitalize my-2">
//           Add Website
//         </h4>

//         {/* Facebook */}
//         <div className="form-group col-lg-12 col-md-12">
          
//           <input
//             type="text"
//             name="facebook_link"
//             value={companyData.website_link}
//             onChange={handleInputChange}
//             placeholder="www.facebook.com/your-company"
//           />
//         </div>
//         {/* Submit Button */}
//         <div className="form-group col-lg-12 col-md-12">
//           <button type="submit" className="theme-btn btn-style-one">
//             Save
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default SocialNetworkBox;
// import { useEffect, useState } from "react";
// import { Switch } from "@/components/ui/switch";
// import LogoCoverUploader from "./LogoCoverUploader";
// import ReactQuill from "react-quill";
// import { Constant } from "@/utils/constant/constant";
// import { toast, ToastContainer } from "react-toastify";

// const SocialNetworkBox = () => {
//   const [companyData, setCompanyData] = useState({
//     company_name: "",
//     summary: "",
//     about_title: "",
//     about_description: "",
//     company_size_id: 1,
//     email: "",
//     company_type_id: 1,
//     tagline: "",
//     website_link: "",
//     founded_date: "",
//     phone: "",
//     country_id: 231,
//     state_id: 3919,
//     city_id: 48132,
//     zip_code: "",
//     address: "",
//     facebook_link: "",
//     twitter_link: "",
//     google_link: "",
//     linkedin_link: "",
//     company_industry_id: 1,
//     join_us: "",
//   });

//   const [makesUsUnique, setMakesUsUnique] = useState([]);
//   const token = localStorage.getItem(Constant.USER_TOKEN);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCompanyData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   useEffect(() => {
//     fetch("https://api.sentryspot.co.uk/api/employeer/company", {
//       headers: { Authorization: token }
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setCompanyData(data?.data);
//         setMakesUsUnique([
//           {
//             title: "Health Insurance",
//             key: "health_insurance",
//             toogle: data?.data?.health_insurance || false,
//             value: data?.data?.health_insurance_value || "",
//           },
//           {
//             title: "24 hour Wellness Center",
//             key: "wellness_center",
//             toogle: data?.data?.wellness_center || false,
//             value: data?.data?.wellness_center_value || "",
//           },
//           {
//             title: "Cafeteria",
//             key: "cafeteria",
//             toogle: data?.data?.cafeteria || false,
//             value: data?.data?.cafeteria_value || "",
//           },
//           {
//             title: "Maternity and Paternity Leave",
//             key: "maternity_leave",
//             toogle: data?.data?.maternity_leave || false,
//             value: data?.data?.maternity_leave_value || "",
//           },
//           {
//             title: "Recreational Area",
//             key: "recreational_area",
//             toogle: data?.data?.recreational_area || false,
//             value: data?.data?.recreational_area_value || "",
//           },
//           {
//             title: "Life Insurance",
//             key: "life_insurance",
//             toogle: data?.data?.life_insurance || false,
//             value: data?.data?.life_insurance_value || "",
//           },
//           {
//             title: "Personal Accident Insurance",
//             key: "personal_accident_insurance",
//             toogle: data?.data?.personal_accident_insurance || false,
//             value: data?.data?.personal_accident_insurance_value || "",
//           },
//         ]);
//       })
//       .catch((error) => toast.error("Error fetching data"));
//   }, [token]);

//   const handleSave = (event) => {
//     event.preventDefault();
    
//     const dataToUpdate = {
//       ...companyData,
//       ...makesUsUnique.reduce((acc, item) => ({
//         ...acc,
//         [item.key]: item.toogle,
//         [`${item.key}_value`]: item.value,
//       }), {}),
//     };
  
//     fetch("https://api.sentryspot.co.uk/api/employeer/company", {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token,
//       },
//       body: JSON.stringify(dataToUpdate),
//     })
//       .then((response) => response.json())
//       .then(() => toast.success("Company data updated successfully"))
//       .catch(() => toast.error("Error updating company data"));
//   };

//   const SectionTitle = ({ children }) => (
//     <h4 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">{children}</h4>
//   );

//   const FormSection = ({ children, className = "" }) => (
//     <div className={`space-y-6 mb-8 ${className}`}>{children}</div>
//   );

//   return (
//     <form className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg" onSubmit={handleSave}>
//       <ToastContainer />
      
//       {/* Basic Info Section */}
//       <FormSection>
//         <SectionTitle>Basic Information</SectionTitle>
//         <div className="grid gap-6">
//           <div className="col-span-full">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
//             <input
//               type="text"
//               name="company_name"
//               value={companyData.company_name}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="Enter company name"
//             />
//           </div>
//         </div>
//       </FormSection>

//       {/* About Section */}
//       <FormSection>
//         <SectionTitle>About Company</SectionTitle>
//         <div className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
//             <input
//               type="text"
//               name="about_title"
//               value={companyData.about_title}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter section title"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//             <ReactQuill
//               theme="snow"
//               value={companyData.about_description}
//               onChange={(value) => setCompanyData(prev => ({...prev, about_description: value}))}
//               className="h-48 mb-12"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Summary </label>
//             <ReactQuill
//               theme="snow"
//               value={companyData.about_description}
//               onChange={(value) => setCompanyData(prev => ({...prev, about_description: value}))}
//               className="h-48 mb-12"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Company Images</label>
//             {/* <LogoCoverUploader /> */}
//           </div>
//         </div>
//       </FormSection>
      
//       <h4 className="text-2xl text-black capitalize mb-2">
//           Watch what we have to say
//         </h4>
//         <div className=" flex justify-between form-group col-lg-12 col-md-12">
//           {/* <label htmlFor="name">main paragraph</label> */}
//           {/* <LogoCoverUploader /> */}
//           <div className="form-group col-lg-6 col-md-6">
//             <LogoCoverUploader text="Add Video" />
//           </div>
//           <div className="form-group col-lg-6 col-md-6">
//             <LogoCoverUploader />
//           </div>
//         </div>
//         <div className="form-group col-lg-12 col-md-12 ">
//         <ReactQuill
//             theme="snow"
//             // modules={modules}
           
//             placeholder=" Describe the role and responsiblities, skills required for the job and help the candidates understand the role better"
//             className="h-36 mb-5 text-lg " 
//           />
//           {/* {errors.name && (
//             <p className="!text-red-500 text-sm">{errors.name.message}</p>
//           )} */}
//         </div>


//       {/* What Makes Us Unique Section */}
//       <FormSection>
//         <SectionTitle>What Makes Us Unique</SectionTitle>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {makesUsUnique.map((item, index) => (
//             <div key={index} className="p-4 bg-gray-50 rounded-lg">
//               <div className="flex justify-between items-center mb-3">
//                 <label className="text-sm font-medium text-gray-700">{item.title}</label>
//                 <Switch
//                   checked={item.toogle}
//                   onCheckedChange={(checked) => {
//                     setMakesUsUnique(prev =>
//                       prev.map((val, i) =>
//                         i === index ? { ...val, toogle: checked } : val
//                       )
//                     );
//                   }}
//                   className="data-[state=checked]:bg-blue-600"
//                 />
//               </div>
//               {item.toogle && (
//                 <input
//                   type="text"
//                   value={item.value}
//                   onChange={(e) => {
//                     setMakesUsUnique(prev =>
//                       prev.map((val, i) =>
//                         i === index ? { ...val, value: e.target.value } : val
//                       )
//                     );
//                   }}
//                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                   placeholder={`Describe ${item.title}`}
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       </FormSection>

//       {/* Join Us Section */}
//       <FormSection>
//         <SectionTitle>Join Us</SectionTitle>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Career Opportunities</label>
//           <ReactQuill
//             theme="snow"
//             value={companyData.join_us}
//             onChange={(value) => setCompanyData(prev => ({...prev, join_us: value}))}
//             className="h-48 mb-12"
//           />
//         </div>
//       </FormSection>

//       {/* Social Links Section */}
//       <FormSection>
//         <SectionTitle>Social Media & Website</SectionTitle>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
//             <input
//               type="text"
//               name="facebook_link"
//               value={companyData.facebook_link}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//               placeholder="Facebook profile URL"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
//             <input
//               type="text"
//               name="linkedin_link"
//               value={companyData.linkedin_link}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//               placeholder="LinkedIn profile URL"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
//             <input
//               type="text"
//               name="twitter_link"
//               value={companyData.twitter_link}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//               placeholder="Twitter profile URL"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
//             <input
//               type="text"
//               name="website_link"
//               value={companyData.website_link}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//               placeholder="Company website URL"
//             />
//           </div>
//         </div>
//       </FormSection>

//       {/* Submit Button */}
//       <div className="mt-8">
//         <button
//           type="submit"
//           className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
//         >
//           Save Changes
//         </button>
//       </div>
//     </form>
//   );
// };

// export default SocialNetworkBox;

// import { useEffect, useState } from "react";
// import { Switch } from "@/components/ui/switch";
// import { Plus, Trash2 } from "lucide-react";
// import LogoCoverUploader from "./LogoCoverUploader";
// import ReactQuill from "react-quill";
// import { Constant } from "@/utils/constant/constant";
// import { toast, ToastContainer } from "react-toastify";

// const SocialNetworkBox = () => {
//   const [companyData, setCompanyData] = useState({
//     company_name: "",
//     summery: "",
//     about_title: "",
//     about: "",
//     company_size_id: 1,
//     email: "",
//     company_type_id: 1,
//     tagline: "",
//     website_link: "",
//     founded_date: "",
//     phone: "",
//     country_id: 231,
//     state_id: 3919,
//     city_id: 48132,
//     zip_code: "",
//     address: "",
//     facebook_link: "",
//     twitter_link: "",
//     google_link: "",
//     linkedin_link: "",
//     company_industry_id: 1,
//     join_us: "",
//     media_content: [], // New field for storing media content
//   });

//   const [makesUsUnique, setMakesUsUnique] = useState([]);
//   const token = localStorage.getItem(Constant.USER_TOKEN);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCompanyData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle adding new media content
//   const addMediaContent = () => {
//     setCompanyData(prev => ({
//       ...prev,
//       media_content: [
//         ...prev.media_content,
//         {
//           id: Date.now(),
//           type: 'video', // Default to video, can be changed
//           file: null,
//           description: '',
//         }
//       ]
//     }));
//   };

//   // Handle removing media content
//   const removeMediaContent = (id) => {
//     setCompanyData(prev => ({
//       ...prev,
//       media_content: prev.media_content.filter(item => item.id !== id)
//     }));
//   };

//   // Handle media content type change
//   const handleMediaTypeChange = (id, type) => {
//     setCompanyData(prev => ({
//       ...prev,
//       media_content: prev.media_content.map(item =>
//         item.id === id ? { ...item, type } : item
//       )
//     }));
//   };

//   // Handle media description change
//   const handleMediaDescriptionChange = (id, description) => {
//     setCompanyData(prev => ({
//       ...prev,
//       media_content: prev.media_content.map(item =>
//         item.id === id ? { ...item, description } : item
//       )
//     }));
//   };

//   useEffect(() => {
//     fetch("https://api.sentryspot.co.uk/api/employeer/company", {
//       headers: { Authorization: token }
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setCompanyData(prev => ({
//           ...data?.data,
//           media_content: data?.data?.media_content || []
//         }));
//         setMakesUsUnique([
//           {
//             title: "Health Insurance",
//             key: "health_insurance",
//             toogle: data?.data?.health_insurance || false,
//             value: data?.data?.health_insurance_value || "",
//           },
//           {
//             title: "24 hour Wellness Center",
//             key: "wellness_center",
//             toogle: data?.data?.wellness_center || false,
//             value: data?.data?.wellness_center_value || "",
//           },
//           {
//             title: "Cafeteria",
//             key: "cafeteria",
//             toogle: data?.data?.cafeteria || false,
//             value: data?.data?.cafeteria_value || "",
//           },
//           {
//             title: "Maternity and Paternity Leave",
//             key: "maternity_leave",
//             toogle: data?.data?.maternity_leave || false,
//             value: data?.data?.maternity_leave_value || "",
//           },
//           {
//             title: "Recreational Area",
//             key: "recreational_area",
//             toogle: data?.data?.recreational_area || false,
//             value: data?.data?.recreational_area_value || "",
//           },
//           {
//             title: "Life Insurance",
//             key: "life_insurance",
//             toogle: data?.data?.life_insurance || false,
//             value: data?.data?.life_insurance_value || "",
//           },
//           {
//             title: "Personal Accident Insurance",
//             key: "personal_accident_insurance",
//             toogle: data?.data?.personal_accident_insurance || false,
//             value: data?.data?.personal_accident_insurance_value || "",
//           },
//         ]);
//       })
//       .catch((error) => toast.error("Error fetching data"));
//   }, [token]);

//   const handleSave = (event) => {
//     event.preventDefault();
    
//     const dataToUpdate = {
//       ...companyData,
//       ...makesUsUnique.reduce((acc, item) => ({
//         ...acc,
//         [item.key]: item.toogle,
//         [`${item.key}_value`]: item.value,
//       }), {}),
//     };
  
//     fetch("https://api.sentryspot.co.uk/api/employeer/company", {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token,
//       },
//       body: JSON.stringify(dataToUpdate),
//     })
//       .then((response) => response.json())
//       .then(() => toast.success("Company data updated successfully"))
//       .catch(() => toast.error("Error updating company data"));
//   };

//   const SectionTitle = ({ children }) => (
//     <h4 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">{children}</h4>
//   );

//   const FormSection = ({ children, className = "" }) => (
//     <div className={`space-y-6 mb-8 ${className}`}>{children}</div>
//   );

//   console.log(companyData,"<<<<");

//   return (
//     <form className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg" onSubmit={handleSave}>
//       <ToastContainer />
      
//       {/* Basic Info Section */}
//       <FormSection>
//         <SectionTitle>Basic Information</SectionTitle>
//         <div className="grid gap-6">
//           <div className="col-span-full">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
//             <input
//               type="text"
//               name="company_name"
//               value={companyData.company_name}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="Enter company name"
//             />
//           </div>
//         </div>
//       </FormSection>

//       {/* About Section */}
//       <FormSection>
//         <SectionTitle>About Company</SectionTitle>
//         <div className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Company Title</label>
//             <input
//               type="text"
//               name="about_title"
//               value={companyData.title}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter section title"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//             <ReactQuill
//               theme="snow"
//               value={companyData.about}
//               onChange={(value) => setCompanyData(prev => ({...prev, about: value}))}
//               className="h-48 mb-12"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
//             <ReactQuill
//               theme="snow"
//               value={companyData.summery}
//               onChange={(value) => setCompanyData(prev => ({...prev, summary: value}))}
//               className="h-48 mb-12"
//             />
//           </div>
//         </div>
//       </FormSection>

//       {/* Watch What We Have to Say Section */}
//       <FormSection>
//         <SectionTitle>Watch What We Have to Say</SectionTitle>
//         <div className="space-y-8">
//           {companyData.media_content.map((content, index) => (
//             <div key={content.id} className="p-6 bg-gray-50 rounded-lg">
//               <div className="flex justify-between items-center mb-4">
//                 <h5 className="text-lg font-medium text-gray-900">Media Content #{index + 1}</h5>
//                 <button
//                   type="button"
//                   onClick={() => removeMediaContent(content.id)}
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   <Trash2 className="w-5 h-5" />
//                 </button>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
//                   <select
//                     value={content.type}
//                     onChange={(e) => handleMediaTypeChange(content.id, e.target.value)}
//                     className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="video">Video</option>
//                     <option value="image">Image</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Upload {content.type === 'video' ? 'Video' : 'Image'}
//                   </label>
//                   <LogoCoverUploader
//                     text={`Add ${content.type === 'video' ? 'Video' : 'Image'}`}
//                     accept={content.type === 'video' ? 'video/*' : 'image/*'}
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                 <ReactQuill
//                   theme="snow"
//                   value={content.description}
//                   onChange={(value) => handleMediaDescriptionChange(content.id, value)}
//                   className="h-36 mb-12"
//                   placeholder="Describe this media content..."
//                 />
//               </div>
//             </div>
//           ))}
          
//           <button
//             type="button"
//             onClick={addMediaContent}
//             className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors duration-200"
//           >
//             <Plus className="w-5 h-5 mr-2" />
//             Add New Media          </button>
//         </div>
//       </FormSection>

//       {/* What Makes Us Unique Section */}
//       <FormSection>
//         <SectionTitle>What Makes Us Unique</SectionTitle>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {makesUsUnique.map((item, index) => (
//             <div key={index} className="p-4 bg-gray-50 rounded-lg">
//               <div className="flex justify-between items-center mb-3">
//                 <label className="text-sm font-medium text-gray-700">{item.title}</label>
//                 <Switch
//                   checked={item.toogle}
//                   onCheckedChange={(checked) => {
//                     setMakesUsUnique(prev =>
//                       prev.map((val, i) =>
//                         i === index ? { ...val, toogle: checked } : val
//                       )
//                     );
//                   }}
//                   className="data-[state=checked]:bg-blue-600"
//                 />
//               </div>
//               {item.toogle && (
//                 <input
//                   type="text"
//                   value={item.value}
//                   onChange={(e) => {
//                     setMakesUsUnique(prev =>
//                       prev.map((val, i) =>
//                         i === index ? { ...val, value: e.target.value } : val
//                       )
//                     );
//                   }}
//                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                   placeholder={`Describe ${item.title}`}
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       </FormSection>

//       {/* Join Us Section */}
//       <FormSection>
//         <SectionTitle>Join Us</SectionTitle>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Career Opportunities</label>
//           <ReactQuill
//             theme="snow"
//             value={companyData.join_us}
//             onChange={(value) => setCompanyData(prev => ({...prev, join_us: value}))}
//             className="h-48 mb-12"
//           />
//         </div>
//       </FormSection>

//       {/* Social Links Section */}
//       <FormSection>
//         <SectionTitle>Social Media & Website</SectionTitle>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
//             <input
//               type="text"
//               name="facebook_link"
//               value={companyData.facebook_link}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//               placeholder="Facebook profile URL"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
//             <input
//               type="text"
//               name="linkedin_link"
//               value={companyData.linkedin_link}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//               placeholder="LinkedIn profile URL"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
//             <input
//               type="text"
//               name="twitter_link"
//               value={companyData.twitter_link}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//               placeholder="Twitter profile URL"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
//             <input
//               type="text"
//               name="website_link"
//               value={companyData.website_link}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//               placeholder="Company website URL"
//             />
//           </div>
//         </div>
//       </FormSection>

//       {/* Submit Button */}
//       <div className="mt-8 flex justify-end">
//         <button
//           type="submit"
//           className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
//         >
//           Save Changes
//         </button>
//       </div>
//     </form>
//   );
// };

// export default SocialNetworkBox;

import { useEffect, useState } from "react";
import axios from "axios";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2 } from 'lucide-react';
import LogoCoverUploader from "./LogoCoverUploader";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Constant } from "@/utils/constant/constant";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SocialNetworkBox = () => {
  const [companyData, setCompanyData] = useState({
    company_name: "",
    summery: "",
    title: "",
    about: "",
    company_size_id: 1,
    email: "",
    company_type_id: 1,
    tagline: "",
    website_link: "",
    founded_date: "",
    phone: "",
    country_id: 231,
    state_id: 3919,
    city_id: 48132,
    zip_code: "",
    address: "",
    facebook_link: "",
    twitter_link: "",
    google_link: "",
    linkedin_link: "",
    company_industry_id: 1,
    join_us: "",
    media_content: [],
  });

  const [makesUsUnique, setMakesUsUnique] = useState([]);
  const token = localStorage.getItem(Constant.USER_TOKEN);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addMediaContent = () => {
    setCompanyData(prev => ({
      ...prev,
    
      media_content: [
        ...prev.media_content,
        {
          id: Date.now(),
          type: 'video',
          file: null,
          description: '',
        }
      ]
    }));
  };

  const removeMediaContent = (id) => {
    setCompanyData(prev => ({
      ...prev,
      media_content: prev.media_content.filter(item => item.id !== id)
    }));
  };

  const handleMediaTypeChange = (id, type) => {
    setCompanyData(prev => ({
      ...prev,
      media_content: prev.media_content.map(item =>
        item.id === id ? { ...item, type } : item
      )
    }));
  };

  const handleMediaDescriptionChange = (id, description) => {
    setCompanyData(prev => ({
      ...prev,
      media_content: prev.media_content.map(item =>
        item.id === id ? { ...item, description } : item
      )
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.sentryspot.co.uk/api/employeer/company", {
          headers: { Authorization: token }
        });
        const data = response.data?.data || {};
        setCompanyData(prev => ({
          ...prev,
          ...data,
          // media_content: data.media_content || []
        }));
        setMakesUsUnique([
          {
            title: "Health Insurance",
            key: "health_insurance",
            toogle: data.health_insurance || false,
            value: data.health_insurance_value || "",
          },
          {
            title: "24 hour Wellness Center",
            key: "wellness_center",
            toogle: data.wellness_center || false,
            value: data.wellness_center_value || "",
          },
          {
            title: "Cafeteria",
            key: "cafeteria",
            toogle: data.cafeteria || false,
            value: data.cafeteria_value || "",
          },
          {
            title: "Maternity and Paternity Leave",
            key: "maternity_leave",
            toogle: data.maternity_leave || false,
            value: data.maternity_leave_value || "",
          },
          {
            title: "Recreational Area",
            key: "recreational_area",
            toogle: data.recreational_area || false,
            value: data.recreational_area_value || "",
          },
          {
            title: "Life Insurance",
            key: "life_insurance",
            toogle: data.life_insurance || false,
            value: data.life_insurance_value || "",
          },
          {
            title: "Personal Accident Insurance",
            key: "personal_accident_insurance",
            toogle: data.personal_accident_insurance || false,
            value: data.personal_accident_insurance_value || "",
          },
        ]);
      } catch (error) {
        toast.error("Error fetching data");
      }
    };

    fetchData();
  }, [token]);

  const handleSave = async (event) => {
    event.preventDefault();
    
    const dataToUpdate = {
      ...companyData,
      ...makesUsUnique.reduce((acc, item) => ({
        ...acc,
        [item.key]: item.toogle,
        [`${item.key}_value`]: item.value,
      }), {}),
    };
   console.log(dataToUpdate,">>>>");
    try {
      await axios.put("https://api.sentryspot.co.uk/api/employeer/company", dataToUpdate, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      toast.success("Company data updated successfully");
    } catch (error) {
      toast.error("Error updating company data");
    }
  };

  const SectionTitle = ({ children }) => (
    <h4 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">{children}</h4>
  );

  const FormSection = ({ children, className = "" }) => (
    <div className={`space-y-6 mb-8 ${className}`}>{children}</div>
  );

  return (
    <form className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg" onSubmit={handleSave}>
      <ToastContainer />
      
      {/* Basic Info Section */}
      <FormSection>
        <SectionTitle>Basic Information</SectionTitle>
        <div className="grid gap-6">
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input
              type="text"
              name="company_name"
              value={companyData.company_name || ""}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter company name"
            />
          </div>
        </div>
      </FormSection>

      {/* About Section */}
      <FormSection>
        <SectionTitle>About Company</SectionTitle>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Title</label>
            <input
              type="text"
              name="title"
              value={companyData.title || ""}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Company title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <ReactQuill
              theme="snow"
              value={companyData.about || ""}
              onChange={(value) => setCompanyData(prev => ({...prev, about: value}))}
              className="h-48 mb-12"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
            <ReactQuill
              theme="snow"
              value={companyData.summery || ""}
              onChange={(value) => setCompanyData(prev => ({...prev, summery: value}))}
              className="h-48 mb-12"
            />
          </div>
        </div>
      </FormSection>

      {/* Watch What We Have to Say Section */}
      <FormSection>
        <SectionTitle>Watch What We Have to Say</SectionTitle>
        <div className="space-y-8">
          {companyData.media_content.map((content, index) => (
            <div key={content.id} className="p-6 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h5 className="text-lg font-medium text-gray-900">Media Content #{index + 1}</h5>
                <button
                  type="button"
                  onClick={() => removeMediaContent(content.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={content.type}
                    onChange={(e) => handleMediaTypeChange(content.id, e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="video">Video</option>
                    <option value="image">Image</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload {content.type === 'video' ? 'Video' : 'Image'}
                  </label>
                  <LogoCoverUploader
                    text={`Add ${content.type === 'video' ? 'Video' : 'Image'}`}
                    accept={content.type === 'video' ? 'video/*' : 'image/*'}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <ReactQuill
                  theme="snow"
                  value={content.description || ""}
                  onChange={(value) => handleMediaDescriptionChange(content.id, value)}
                  className="h-36 mb-12"
                  placeholder="Describe this media content..."
                />
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={addMediaContent}
            className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Media
          </button>
        </div>
      </FormSection>

      {/* What Makes Us Unique Section */}
      <FormSection>
        <SectionTitle>What Makes Us Unique</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {makesUsUnique.map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-gray-700">{item.title}</label>
                <Switch
                  checked={item.toogle}
                  onCheckedChange={(checked) => {
                    setMakesUsUnique(prev =>
                      prev.map((val, i) =>
                        i === index ? { ...val, toogle: checked } : val
                      )
                    );
                  }}
                  className="data-[state=checked]:bg-blue-600"
                />
              </div>
              {item.toogle && (
                <input
                  type="text"
                  value={item.value}
                  onChange={(e) => {
                    setMakesUsUnique(prev =>
                      prev.map((val, i) =>
                        i === index ? { ...val, value: e.target.value } : val
                      )
                    );
                  }}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder={`Describe ${item.title}`}
                />
              )}
            </div>
          ))}
        </div>
      </FormSection>

      {/* Join Us Section */}
      <FormSection>
        <SectionTitle>Join Us</SectionTitle>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Career Opportunities</label>
          <ReactQuill
            theme="snow"
            value={companyData.join_us || ""}
            onChange={(value) => setCompanyData(prev => ({...prev, join_us: value}))}
            className="h-48 mb-12"
          />
        </div>
      </FormSection>

      {/* Social Links Section */}
      <FormSection>
        <SectionTitle>Social Media & Website</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
            <input
              type="text"
              name="facebook_link"
              value={companyData.facebook_link || ""}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Facebook profile URL"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
            <input
              type="text"
              name="linkedin_link"
              value={companyData.linkedin_link || ""}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="LinkedIn profile URL"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
            <input
              type="text"
              name="twitter_link"
              value={companyData.twitter_link || ""}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Twitter profile URL"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input
              type="text"
              name="website_link"
              value={companyData.website_link || ""}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Company website URL"
            />
          </div>
        </div>
      </FormSection>

      {/* Submit Button */}
      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default SocialNetworkBox;
