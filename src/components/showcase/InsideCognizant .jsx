// // import React, { useState } from "react";
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // import {
// //     Card,
// //     CardContent,
// //     CardDescription,
// //     CardFooter,
// //     CardHeader,
// //     CardTitle,
// //   } from "@/components/ui/card"; // Replace with your Card component import

// // const InsideCognizant = ({companyData}) => {
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [formData, setFormData] = useState({
// //     cultureText: "Culture description here.",
// //     cultureImgs: [
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //     ],
// //     peopleText: "People description here.",
// //     peopleImgs: [
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //     ],
// //     workplaceText: "Workplace description here.",
// //     workplaceImgs: [
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //     ],
// //   });

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: value,
// //     });
// //   };

// //   const handleImageChange = (e, field, index) => {
// //     const file = e.target.files[0];
// //     const imageUrl = URL.createObjectURL(file);
// //     const updatedImgs = [...formData[field]];
// //     updatedImgs[index] = imageUrl;
// //     setFormData({ ...formData, [field]: updatedImgs });
// //   };

// //   const handleUpdate = () => {
// //     setIsEditing(false);
// //     // Make an API call to save the updated text and images.
// //     console.log("Updated Data: ", formData);
// //   };

// //   const toggleEdit = () => {
// //     setIsEditing(!isEditing);
// //   };
// //   console.log(companyData,"insidee<<<<<");

// //   return (
// //     <section className="inside-cognizant">
// //       <div className="auto-container w-[90%]">
// //         <div className="sec-title text-center">
// //           <p className="font-bold text-xl sm:text-3xl text-black">Inside {companyData.company_name}</p>
// //         </div>

// //         <button onClick={toggleEdit} className="text-white bg-blue-950 border p-2 rounded-lg px-4 ">
// //           {isEditing ? "Cancel" : "Edit"}
// //         </button>

// //         <Tabs defaultValue="culture" className="w-full flex flex-col justify-center align-middle">
// //           <div className="w-full flex justify-center">
// //             <TabsList className="grid w-[600px] grid-cols-3 bg-none">
// //               <TabsTrigger value="culture">Culture</TabsTrigger>
// //               <TabsTrigger value="people">People</TabsTrigger>
// //               <TabsTrigger value="workplace">Workplace</TabsTrigger>
// //             </TabsList>
// //           </div>

// //           {/* Culture Tab */}
// //           <TabsContent value="culture">
// //           {!isEditing ? (
// //              <Card className="w-full grid grid-cols-2 gap-2">
// //                 <div>
// //                <img src={formData.cultureImgs[2]} alt="Culture 3" className="object-cover w-full " />
// //              </div>
// //              <div className="grid grid-rows-2 gap-2">
// //                <img src={formData.cultureImgs[0]} alt="Culture 1" className=" w-full h-[250px] " />
// //                <img src={formData.cultureImgs[1]} alt="Culture 2" className=" w-full h-[250px]" />
// //              </div>
           
            
// //            </Card>
// //             ) : (
// //               <div className="w-full flex flex-col gap-4 mt-4 border p-4 bg-blue-200 rounded-lg">
              
// //                 <div className="flex justify-around ">
// //                   {formData.cultureImgs.map((img, index) => (
// //                     <div key={index} className="flex flex-col gap-2 border p-2 rounded-lg bg-white">
// //                       <input
// //                         type="file"
// //                         accept="image/*"
// //                         onChange={(e) => handleImageChange(e, "cultureImgs", index)}
// //                         className="mt-1 block w-full"
// //                       />
// //                       <div className="w-[300px] h-[200px] mt-4">
// //                         <img src={img} alt={`Culture Preview ${index}`} className="object-cover w-full h-full" />
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </TabsContent>

// //           {/* People Tab */}
// //           <TabsContent value="people">
// //             {!isEditing ? (
             
// //               <Card className="w-full grid grid-cols-2 gap-2">
// //               <div>
// //              <img src={formData.peopleImgs[2]} alt="Culture 3" className="object-cover w-full " />
// //            </div>
// //            <div className="grid grid-rows-2 gap-2">
// //              <img src={formData.peopleImgs[0]} alt="Culture 1" className=" w-full h-[250px] " />
// //              <img src={formData.peopleImgs[1]} alt="Culture 2" className=" w-full h-[250px]" />
// //            </div>
         
          
// //          </Card>
// //             ) : (
// //                 <div className="w-full flex flex-col gap-4 mt-4 border p-4 bg-green-200 rounded-lg">
                

// //                 <div className="flex justify-around ">
// //                   {formData.peopleImgs.map((img, index) => (
// //                              <div key={index} className="flex flex-col gap-2 border p-2 rounded-lg bg-white">
// //                       <input
// //                         type="file"
// //                         accept="image/*"
// //                         onChange={(e) => handleImageChange(e, "peopleImgs", index)}
// //                         className="mt-1 block w-full"
// //                       />
// //                       <div className="w-[300px] h-[200px] mt-4">
// //                         <img src={img} alt={`People Preview ${index}`} className="object-cover w-full h-full" />
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </TabsContent>

// //           {/* Workplace Tab */}
// //           <TabsContent value="workplace">
// //             {!isEditing ? (
              

// // <Card className="w-full grid grid-cols-2 gap-2">
// // <div>
// // <img src={formData.workplaceImgs[2]} alt="Culture 3" className="object-cover w-full " />
// // </div>
// // <div className="grid grid-rows-2 gap-2">
// // <img src={formData.workplaceImgs[0]} alt="Culture 1" className=" w-full h-[250px] " />
// // <img src={formData.workplaceImgs[1]} alt="Culture 2" className=" w-full h-[250px]" />
// // </div>


// // </Card>
// //             ) : (
// //                 <div className="w-full flex flex-col gap-4 mt-4 border p-4 bg-red-200 rounded-lg">
                
// //                 <div className="flex justify-around ">
// //                   {formData.workplaceImgs.map((img, index) => (
// //                    <div key={index} className="flex flex-col gap-2 border p-2 rounded-lg bg-white">
// //                       <input
// //                         type="file"
// //                         accept="image/*"
// //                         onChange={(e) => handleImageChange(e, "workplaceImgs", index)}
// //                         className="mt-1 block w-full"
// //                       />
// //                       <div className="w-[300px] h-[200px] mt-4">
// //                         <img src={img} alt={`Workplace Preview ${index}`} className="object-cover w-full h-full" />
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </TabsContent>
// //         </Tabs>

// //         {/* Update Button */}
// //         {isEditing && (
// //           <button
// //             onClick={handleUpdate}
// //             className="mt-6 px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-600"
// //           >
// //             Update
// //           </button>
// //         )}
// //       </div>
// //     </section>
// //   );
// // };

// // export default InsideCognizant;
// // import React, { useState } from "react";
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardFooter,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import { Constant } from "@/utils/constant/constant";

// // const InsideCognizant = ({ companyData }) => {
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [formData, setFormData] = useState({
// //     cultureText: "Culture description here.",
// //     cultureImgs: [
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //     ],
// //     peopleText: "People description here.",
// //     peopleImgs: [
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //     ],
// //     workplaceText: "Workplace description here.",
// //     workplaceImgs: [
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //     ],
// //   });
// //   const BASEURL = "https://api.sentryspot.co.uk/api/employeer/"
// //   const BASEIMAGEURL = "https://api.sentryspot.co.uk"

// //   const token = localStorage.getItem(Constant.USER_TOKEN)
// //   const toggleEdit = () => {
// //     setIsEditing(!isEditing);
// //   };

// //   const handleUpdate = () => {
// //     setIsEditing(false);
// //     console.log("Updated Data: ", formData);
// //     // Additional logic for saving data.
// //   };

// //   const uploadImage = async (field, index, file) => {
// //     const formData = new FormData();
// //     formData.append("image", file);

// //     let apiUrl = "";
// //     if (field === "cultureImgs") apiUrl = `${BASEURL}/company-inside-culture  `;
// //     if (field === "peopleImgs") apiUrl = `${BASEURL}/company-inside-people`;
// //     if (field === "workplaceImgs") apiUrl = `${BASEURL}/company-inside-workplace `;

// //     try {
// //       const response = await fetch(apiUrl, {
// //         method: "PATCH",
// //         headers: {
// //           Authorization: ` ${token}`,
// //         },
// //         body: formData,
// //       });
  

// //       if (!response.ok) {
// //         throw new Error("Failed to upload image");
// //       }

// //       const data = await response.json();

// //       // Update the image URL in the local state
// //       const updatedImgs = [...formData[field]];
// //       updatedImgs[index] = data.imageUrl; 
// //       setFormData((prevState) => ({
// //         ...prevState,
// //         [field]: updatedImgs,
// //       }));
// //     } catch (error) {
// //       console.error("Image upload failed:", error);
// //     }
// //   };

// //   const handleImageChange = (e, field, index) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       uploadImage(field, index, file);
// //     }
// //   };

// //   return (
// //     <section className="inside-cognizant">
// //       <div className="auto-container w-[90%]">
// //         <div className="sec-title text-center">
// //           <p className="font-bold text-xl sm:text-3xl text-black">Inside {companyData.company_name}</p>
// //         </div>

// //         <button onClick={toggleEdit} className="text-white bg-blue-950 border p-2 rounded-lg px-4">
// //           {isEditing ? "Cancel" : "Edit"}
// //         </button>

// //         <Tabs defaultValue="culture" className="w-full flex flex-col justify-center align-middle">
// //           <div className="w-full flex justify-center">
// //             <TabsList className="grid w-[600px] grid-cols-3 bg-none">
// //               <TabsTrigger value="culture">Culture</TabsTrigger>
// //               <TabsTrigger value="people">People</TabsTrigger>
// //               <TabsTrigger value="workplace">Workplace</TabsTrigger>
// //             </TabsList>
// //           </div>

// //           {/* Culture Tab */}
// //           <TabsContent value="culture">
// //             {isEditing ? (
// //               <div className="w-full flex flex-col gap-4 mt-4 border p-4 bg-blue-200 rounded-lg">
// //                 <div className="flex justify-around">
// //                   {formData.cultureImgs.map((img, index) => (
// //                     <div key={index} className="flex flex-col gap-2 border p-2 rounded-lg bg-white">
// //                       <input
// //                         type="file"
// //                         accept="image/*"
// //                         onChange={(e) => handleImageChange(e, "cultureImgs", index)}
// //                         className="mt-1 block w-full"
// //                       />
// //                       <div className="w-[300px] h-[200px] mt-4">
// //                         <img src={img} alt={`Culture Preview ${index}`} className="object-cover w-full h-full" />
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             ) : (
// //               <Card className="w-full grid grid-cols-2 gap-2">
// //                 <div>
// //                   <img src={formData.cultureImgs[2]} alt="Culture 3" className="object-cover w-full" />
// //                 </div>
// //                 <div className="grid grid-rows-2 gap-2">
// //                   <img src={formData.cultureImgs[0]} alt="Culture 1" className="w-full h-[250px]" />
// //                   <img src={formData.cultureImgs[1]} alt="Culture 2" className="w-full h-[250px]" />
// //                 </div>
// //               </Card>
// //             )}
// //           </TabsContent>

// //           {/* Other Tabs (Similar Logic) */}
// //           {/* People and Workplace logic follows similarly */}
// //         </Tabs>

// //         {isEditing && (
// //           <button
// //             onClick={handleUpdate}
// //             className="mt-6 px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-600"
// //           >
// //             Update
// //           </button>
// //         )}
// //       </div>
// //     </section>
// //   );
// // };

// // export default InsideCognizant;
// // import React, { useState } from "react";
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // import {
// //   Card,
// //   CardContent,
// // } from "@/components/ui/card";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// // } from "@/components/ui/dialog";
// // import { Constant } from "@/utils/constant/constant";

// // const InsideCognizant = ({ companyData }) => {
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [showModal, setShowModal] = useState(false);
// //   const [activeTab, setActiveTab] = useState("culture");
// //   const [selectedImageIndex, setSelectedImageIndex] = useState(null);
// //   const [tempImageFiles, setTempImageFiles] = useState({
// //     cultureImgs: Array(3).fill(null),
// //     peopleImgs: Array(3).fill(null),
// //     workplaceImgs: Array(3).fill(null),
// //   });
  
// //   const [formData, setFormData] = useState({
// //     cultureText: "Culture description here.",
// //     cultureImgs: [
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //     ],
// //     peopleText: "People description here.",
// //     peopleImgs: [
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //     ],
// //     workplaceText: "Workplace description here.",
// //     workplaceImgs: [
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //     ],
// //   });

// //   const BASEURL = "https://api.sentryspot.co.uk/api/employeer";
// //   const BASEIMAGEURL = "https://api.sentryspot.co.uk";
// //   const token = localStorage.getItem(Constant.USER_TOKEN);

// //   const toggleEdit = () => {
// //     setIsEditing(!isEditing);
// //     if (!isEditing) {
// //       setTempImageFiles({
// //         cultureImgs: Array(3).fill(null),
// //         peopleImgs: Array(3).fill(null),
// //         workplaceImgs: Array(3).fill(null),
// //       });
// //     }
// //   };

// //   const openImageModal = (index) => {
// //     setSelectedImageIndex(index);
// //     setShowModal(true);
// //   };

// //   const handleImageChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       // Create a preview URL
// //       const previewUrl = URL.createObjectURL(file);
      
// //       // Update temp files
// //       setTempImageFiles(prev => ({
// //         ...prev,
// //         [`${activeTab}Imgs`]: prev[`${activeTab}Imgs`].map((item, i) => 
// //           i === selectedImageIndex ? file : item
// //         )
// //       }));

// //       // Update preview in formData
// //       setFormData(prev => ({
// //         ...prev,
// //         [`${activeTab}Imgs`]: prev[`${activeTab}Imgs`].map((item, i) =>
// //           i === selectedImageIndex ? previewUrl : item
// //         )
// //       }));
// //     }
// //     setShowModal(false);
// //   };

// //   const handleUpdate = async () => {
// //     try {
// //       // Upload all changed images
// //       for (const tab of ['culture', 'people', 'workplace']) {
// //         const files = tempImageFiles[`${tab}Imgs`];
// //         for (let i = 0; i < files.length; i++) {
// //           if (files[i]) {
// //             const formData = new FormData();
// //             formData.append("inside_culture_images_upload", files[i]);

// //             const apiUrl = `${BASEURL}/company-inside-${tab}`;
// //             const response = await fetch(apiUrl, {
// //               method: "PATCH",
// //               headers: {
// //                 Authorization: `${token}`,
// //               },
// //               body: formData,
// //             });

// //             if (!response.ok) {
// //               throw new Error(`Failed to upload ${tab} image ${i}`);
// //             }

// //             const data = await response.json();
// //             console.log(data,">>>>");
// //             // Update the actual image URL with the one from backend
// //             setFormData(prev => ({
// //               ...prev,
// //               [`${tab}Imgs`]: prev[`${tab}Imgs`].map((url, index) =>
// //                 index === i ? `${BASEIMAGEURL}${companyData.inside_culture_images[0]}` : url
// //               )
// //             }));
// //           }
// //         }
// //       }

// //       // Reset temp files
// //       setTempImageFiles({
// //         cultureImgs: Array(3).fill(null),
// //         peopleImgs: Array(3).fill(null),
// //         workplaceImgs: Array(3).fill(null),
// //       });
      
// //       setIsEditing(false);
// //     } catch (error) {
// //       console.error("Update failed:", error);
// //     }
// //   };
// //   console.log(formData,"<<<form");
// //   console.log(companyData,"<<<comapny");

// //   return (
// //     <section className="inside-cognizant">
// //       <div className="auto-container w-[90%]">
// //         <div className="sec-title text-center">
// //           <p className="font-bold text-xl sm:text-3xl text-black">
// //             Inside {companyData.company_name}
// //           </p>
// //         </div>

// //         <button onClick={toggleEdit} className="text-white bg-blue-950 border p-2 rounded-lg px-4">
// //           {isEditing ? "Cancel" : "Edit"}
// //         </button>

// //         <Tabs defaultValue="culture" className="w-full flex flex-col justify-center align-middle" 
// //               onValueChange={(value) => setActiveTab(value)}>
// //           <div className="w-full flex justify-center">
// //             <TabsList className="grid w-[600px] grid-cols-3 bg-none">
// //               <TabsTrigger value="culture">Culture</TabsTrigger>
// //               <TabsTrigger value="people">People</TabsTrigger>
// //               <TabsTrigger value="workplace">Workplace</TabsTrigger>
// //             </TabsList>
// //           </div>

// //           <TabsContent value="culture">
// //             <Card className="w-full grid grid-cols-2 gap-2">
// //               <div>
// //                 <div className="relative">
// //                   <img 
// //                     src={companyData.inside_culture_images[2]?`${BASEIMAGEURL}${companyData.inside_culture_images[2]}`:formData.cultureImgs[2]} 
// //                     alt="Culture 3" 
// //                     className="object-fit w-full "
// //                   />
// //                   {isEditing && (
// //                     <button
// //                       onClick={() => openImageModal(2)}
// //                       className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded"
// //                     >
// //                       Change Image
// //                     </button>
// //                   )}
// //                 </div>
// //               </div>
// //               <div className="grid grid-rows-2 gap-2">
// //                 {[0, 1].map((index) => (
// //                   <div key={index} className="relative">
// //                     <img 
// //                       src={companyData.inside_culture_images[index]?`${BASEIMAGEURL}${companyData.inside_culture_images[index]}`:formData.cultureImgs[index]} 
// //                       alt={`Culture ${index + 1}`} 
// //                       className="w-full h-[250px]"
// //                     />
// //                     {isEditing && (
// //                       <button
// //                         onClick={() => openImageModal(index)}
// //                         className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded"
// //                       >
// //                         Change Image
// //                       </button>
// //                     )}
// //                   </div>
// //                 ))}
// //               </div>
// //             </Card>
// //           </TabsContent>

// //           {/* Similar TabsContent for people and workplace */}
// //         </Tabs>

// //         {isEditing && (
// //           <button
// //             onClick={handleUpdate}
// //             className="mt-6 px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-600"
// //           >
// //             Update
// //           </button>
// //         )}

// //         <Dialog open={showModal} onOpenChange={setShowModal}>
// //           <DialogContent>
// //             <DialogHeader>
// //               <DialogTitle>Change Image</DialogTitle>
// //             </DialogHeader>
// //             <div className="p-4">
// //               <input
// //                 type="file"
// //                 accept="image/*"
// //                 onChange={handleImageChange}
// //                 className="w-full"
// //               />
// //             </div>
// //           </DialogContent>
// //         </Dialog>
// //       </div>
// //     </section>
// //   );
// // };

// // export default InsideCognizant;


// // "https://api.sentryspot.co.uk/etc/sentryspot_ai_portal/employeer/compnay_inside/15/hero-bg-1735050647.png"

// import React, { useState } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Card,
//   CardContent,
// } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Constant } from "@/utils/constant/constant";

// const InsideCognizant = ({ companyData }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [activeTab, setActiveTab] = useState("culture");
//   const [selectedImageIndex, setSelectedImageIndex] = useState(null);
//   const [tempImageFiles, setTempImageFiles] = useState({
//     cultureImgs: Array(3).fill(null),
//     peopleImgs: Array(3).fill(null),
//     workplaceImgs: Array(3).fill(null),
//   });
  
//   const [formData, setFormData] = useState({
//     cultureText: "Culture description here.",
//     cultureImgs: [
//       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
//       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
//       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
//     ],
//     peopleText: "People description here.",
//     peopleImgs: [
//       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
//       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
//       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
//     ],
//     workplaceText: "Workplace description here.",
//     workplaceImgs: [
//       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
//       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
//       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
//     ],
//   });

//   const BASEURL = "https://api.sentryspot.co.uk/api/employeer";
//   const BASEIMAGEURL = "https://api.sentryspot.co.uk";
//   const token = localStorage.getItem(Constant.USER_TOKEN);

//   const toggleEdit = () => {
//     setIsEditing(!isEditing);
//     if (!isEditing) {
//       setTempImageFiles({
//         cultureImgs: Array(3).fill(null),
//         peopleImgs: Array(3).fill(null),
//         workplaceImgs: Array(3).fill(null),
//       });
//     }
//   };

//   const openImageModal = (index) => {
//     setSelectedImageIndex(index);
//     setShowModal(true);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const previewUrl = URL.createObjectURL(file);
      
//       setTempImageFiles(prev => ({
//         ...prev,
//         [`${activeTab}Imgs`]: prev[`${activeTab}Imgs`].map((item, i) => 
//           i === selectedImageIndex ? file : item
//         )
//       }));

//       setFormData(prev => ({
//         ...prev,
//         [`${activeTab}Imgs`]: prev[`${activeTab}Imgs`].map((item, i) =>
//           i === selectedImageIndex ? previewUrl : item
//         )
//       }));
//     }
//     setShowModal(false);
//   };

//   const handleUpdate = async () => {
//     try {
//       const updatedImages = { ...formData };
      
//       // Upload only the changed images
//       for (const tab of ['culture', 'people', 'workplace']) {
//         const files = tempImageFiles[`${tab}Imgs`];
//         const updatedUrls = [...formData[`${tab}Imgs`]];
        
//         for (let i = 0; i < files.length; i++) {
//           if (files[i]) {
//             const formDataObj = new FormData();
//             formDataObj.append("inside_culture_images_upload", files[i]);
//             formDataObj.append("image_indexes", i.toString()); // Add index to FormData

//             const apiUrl = `${BASEURL}/company-inside-${tab}`; // Include index in URL
//             const response = await fetch(apiUrl, {
//               method: "PATCH",
//               headers: {
//                 Authorization: `${token}`,
//               },
//               body: formDataObj,
//             });

//             if (!response.ok) {
//               throw new Error(`Failed to upload ${tab} image ${i}`);
//             }

//             const data = await response.json();
            
//             // Update the specific image URL with the one from backend
//             if (data.image_url) {
//               updatedUrls[i] = `${BASEIMAGEURL}${data.image_url}`;
//             }
//           }
//         }
        
//         // Update formData with new URLs
//         updatedImages[`${tab}Imgs`] = updatedUrls;
//       }

//       // Update state with all new URLs
//       setFormData(updatedImages);

//       // Reset temp files
//       setTempImageFiles({
//         cultureImgs: Array(3).fill(null),
//         peopleImgs: Array(3).fill(null),
//         workplaceImgs: Array(3).fill(null),
//       });
      
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Update failed:", error);
//     }
//   };

//   const getImageUrl = (tab, index) => {
//     const backendImages = {
//       culture: companyData.inside_culture_images,
//       people: companyData.inside_people_images,
//       workplace: companyData.inside_workplace_images
//     };

//     const images = backendImages[tab];
//     return images && images[index] 
//       ? `${BASEIMAGEURL}${images[index]}` 
//       : formData[`${tab}Imgs`][index];
//   };

//   return (
//     <section className="inside-cognizant">
//       <div className="auto-container w-[90%]">
//         <div className="sec-title text-center">
//           <p className="font-bold text-xl sm:text-3xl text-black">
//             Inside {companyData.company_name}
//           </p>
//         </div>

//         <button onClick={toggleEdit} className="text-white bg-blue-950 border p-2 rounded-lg px-4">
//           {isEditing ? "Cancel" : "Edit"}
//         </button>

//         <Tabs defaultValue="culture" className="w-full flex flex-col justify-center align-middle" 
//               onValueChange={(value) => setActiveTab(value)}>
//           <div className="w-full flex justify-center">
//             <TabsList className="grid w-[600px] grid-cols-3 bg-none">
//               <TabsTrigger value="culture">Culture</TabsTrigger>
//               <TabsTrigger value="people">People</TabsTrigger>
//               <TabsTrigger value="workplace">Workplace</TabsTrigger>
//             </TabsList>
//           </div>

//           <TabsContent value="culture">
//             <Card className="w-full grid grid-cols-2 gap-2">
//               <div>
//                 <div className="relative">
//                   <img 
//                     src={getImageUrl('culture', 2)} 
//                     alt="Culture 3" 
//                     className="object-fit w-full"
//                   />
//                   {isEditing && (
//                     <button
//                       onClick={() => openImageModal(2)}
//                       className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded"
//                     >
//                       Change Image
//                     </button>
//                   )}
//                 </div>
//               </div>
//               <div className="grid grid-rows-2 gap-2">
//                 {[0, 1].map((index) => (
//                   <div key={index} className="relative">
//                     <img 
//                       src={getImageUrl('culture', index)} 
//                       alt={`Culture ${index + 1}`} 
//                       className="w-full h-[250px]"
//                     />
//                     {isEditing && (
//                       <button
//                         onClick={() => openImageModal(index)}
//                         className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded"
//                       >
//                         Change Image
//                       </button>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </Card>
//           </TabsContent>

//           <TabsContent value="people">
//             <Card className="w-full grid grid-cols-2 gap-2">
//               <div>
//                 <div className="relative">
//                   <img 
//                     src={getImageUrl('people', 2)} 
//                     alt="People 3" 
//                     className="object-fit w-full"
//                   />
//                   {isEditing && (
//                     <button
//                       onClick={() => openImageModal(2)}
//                       className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded"
//                     >
//                       Change Image
//                     </button>
//                   )}
//                 </div>
//               </div>
//               <div className="grid grid-rows-2 gap-2">
//                 {[0, 1].map((index) => (
//                   <div key={index} className="relative">
//                     <img 
//                       src={getImageUrl('people', index)} 
//                       alt={`People ${index + 1}`} 
//                       className="w-full h-[250px]"
//                     />
//                     {isEditing && (
//                       <button
//                         onClick={() => openImageModal(index)}
//                         className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded"
//                       >
//                         Change Image
//                       </button>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </Card>
//           </TabsContent>

//           <TabsContent value="workplace">
//             <Card className="w-full grid grid-cols-2 gap-2">
//               <div>
//                 <div className="relative">
//                   <img 
//                     src={getImageUrl('workplace', 2)} 
//                     alt="Workplace 3" 
//                     className="object-fit w-full"
//                   />
//                   {isEditing && (
//                     <button
//                       onClick={() => openImageModal(2)}
//                       className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded"
//                     >
//                       Change Image
//                     </button>
//                   )}
//                 </div>
//               </div>
//               <div className="grid grid-rows-2 gap-2">
//                 {[0, 1].map((index) => (
//                   <div key={index} className="relative">
//                     <img 
//                       src={getImageUrl('workplace', index)} 
//                       alt={`Workplace ${index + 1}`} 
//                       className="w-full h-[250px]"
//                     />
//                     {isEditing && (
//                       <button
//                         onClick={() => openImageModal(index)}
//                         className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded"
//                       >
//                         Change Image
//                       </button>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </Card>
//           </TabsContent>
//         </Tabs>

//         {isEditing && (
//           <button
//             onClick={handleUpdate}
//             className="mt-6 px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-600"
//           >
//             Update
//           </button>
//         )}

//         <Dialog open={showModal} onOpenChange={setShowModal}>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Change Image</DialogTitle>
//             </DialogHeader>
//             <div className="p-4">
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="w-full"
//               />
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </section>
//   );
// };

// export default InsideCognizant;
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Constant } from "@/utils/constant/constant";

const InsideCognizant = ({ companyData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("culture");
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [tempImageFiles, setTempImageFiles] = useState({
    cultureImgs: Array(3).fill(null),
    peopleImgs: Array(3).fill(null),
    workplaceImgs: Array(3).fill(null),
  });
  
  const [formData, setFormData] = useState({
    cultureText: "Culture description here.",
    cultureImgs: [
      "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
      "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
      "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
    ],
    peopleText: "People description here.",
    peopleImgs: [
      "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
      "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
      "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
    ],
    workplaceText: "Workplace description here.",
    workplaceImgs: [
      "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
      "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
      "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
    ],
  });

  const BASEURL = "https://api.sentryspot.co.uk/api/employeer";
  const BASEIMAGEURL = "https://api.sentryspot.co.uk";
  const token = localStorage.getItem(Constant.USER_TOKEN);

  // Upload field names for each tab
  const uploadFieldNames = {
    culture: "inside_culture_images_upload",
    people: "inside_people_images_upload",
    workplace: "inside_workplace_images_upload"
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setTempImageFiles({
        cultureImgs: Array(3).fill(null),
        peopleImgs: Array(3).fill(null),
        workplaceImgs: Array(3).fill(null),
      });
    }
  };

  const openImageModal = (index) => {
    setSelectedImageIndex(index);
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      
      setTempImageFiles(prev => ({
        ...prev,
        [`${activeTab}Imgs`]: prev[`${activeTab}Imgs`].map((item, i) => 
          i === selectedImageIndex ? file : item
        )
      }));

      setFormData(prev => ({
        ...prev,
        [`${activeTab}Imgs`]: prev[`${activeTab}Imgs`].map((item, i) =>
          i === selectedImageIndex ? previewUrl : item
        )
      }));
    }
    setShowModal(false);
  };

  const handleUpdate = async () => {
    try {
      const updatedImages = { ...formData };
      
      // Upload only the changed images
      for (const tab of ['culture', 'people', 'workplace']) {
        const files = tempImageFiles[`${tab}Imgs`];
        const updatedUrls = [...formData[`${tab}Imgs`]];
        
        for (let i = 0; i < files.length; i++) {
          if (files[i]) {
            const formDataObj = new FormData();
            // Use the correct upload field name for each tab
            formDataObj.append(uploadFieldNames[tab], files[i]);
            formDataObj.append("image_indexes", i.toString());

            const apiUrl = `${BASEURL}/company-inside-${tab}`;
            const response = await fetch(apiUrl, {
              method: "PATCH",
              headers: {
                Authorization: `${token}`,
              },
              body: formDataObj,
            });

            if (!response.ok) {
              throw new Error(`Failed to upload ${tab} image ${i}`);
            }

            const data = await response.json();
            
            if (data.image_url) {
              updatedUrls[i] = `${BASEIMAGEURL}${data.image_url}`;
            }
          }
        }
        
        updatedImages[`${tab}Imgs`] = updatedUrls;
      }

      setFormData(updatedImages);

      setTempImageFiles({
        cultureImgs: Array(3).fill(null),
        peopleImgs: Array(3).fill(null),
        workplaceImgs: Array(3).fill(null),
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const getImageUrl = (tab, index) => {
    const backendImages = {
      culture: companyData.inside_culture_images,
      people: companyData.inside_people_images,
      workplace: companyData.inside_workplace_images
    };

    const images = backendImages[tab];
    return images && images[index] 
      ? `${BASEIMAGEURL}${images[index]}` 
      : formData[`${tab}Imgs`][index];
  };

  return (
    <section className="inside-cognizant">
      <div className="auto-container w-[90%]">
        <div className="sec-title text-center">
          <p className="font-bold text-xl sm:text-3xl text-black">
            Inside {companyData.company_name}
          </p>
        </div>

        <button onClick={toggleEdit} className="text-white bg-blue-950 border p-2 rounded-lg px-4">
          {isEditing ? "Cancel" : "Edit"}
        </button>

        <Tabs defaultValue="culture" className="w-full flex flex-col justify-center align-middle" 
              onValueChange={(value) => setActiveTab(value)}>
          <div className="w-full flex justify-center">
            <TabsList className="grid w-[600px] grid-cols-3 bg-none">
              <TabsTrigger value="culture">Culture</TabsTrigger>
              <TabsTrigger value="people">People</TabsTrigger>
              <TabsTrigger value="workplace">Workplace</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="culture">
            <Card className="w-full grid grid-cols-2 gap-2">
              <div>
                <div className="relative h-full">
                  <img 
                    src={getImageUrl('culture', 2)} 
                    alt="Culture 3" 
                    className="object-fit w-full"
                  />
                  {isEditing && (
                    <button
                      onClick={() => openImageModal(2)}
                      className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded"
                    >
                      Change Image
                    </button>
                  )}
                </div>
              </div>
              <div className="grid grid-rows-2 gap-2">
                {[0, 1].map((index) => (
                  <div key={index} className="relative">
                    <img 
                      src={getImageUrl('culture', index)} 
                      alt={`Culture ${index + 1}`} 
                      className="w-full h-[250px]"
                    />
                    {isEditing && (
                      <button
                        onClick={() => openImageModal(index)}
                        className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded"
                      >
                        Change Image
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="people">
            <Card className="w-full grid grid-cols-2 gap-2">
              <div>
                <div className="relative h-full">
                  <img 
                    src={getImageUrl('people', 2)} 
                    alt="People 3" 
                    className="object-fit w-full"
                  />
                  {isEditing && (
                    <button
                      onClick={() => openImageModal(2)}
                      className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded"
                    >
                      Change Image
                    </button>
                  )}
                </div>
              </div>
              <div className="grid grid-rows-2 gap-2">
                {[0, 1].map((index) => (
                  <div key={index} className="relative">
                    <img 
                      src={getImageUrl('people', index)} 
                      alt={`People ${index + 1}`} 
                      className="w-full h-[250px]"
                    />
                    {isEditing && (
                      <button
                        onClick={() => openImageModal(index)}
                        className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded"
                      >
                        Change Image
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="workplace">
            <Card className="w-full grid grid-cols-2 gap-2">
              <div>
                <div className="relative  h-full" >
                  <img 
                    src={getImageUrl('workplace', 2)} 
                    alt="Workplace 3" 
                    className="object-fill w-full h-full"
                  />
                  {isEditing && (
                    <button
                      onClick={() => openImageModal(2)}
                      className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded"
                    >
                      Change Image
                    </button>
                  )}
                </div>
              </div>
              <div className="grid grid-rows-2 gap-2">
                {[0, 1].map((index) => (
                  <div key={index} className="relative">
                    <img 
                      src={getImageUrl('workplace', index)} 
                      alt={`Workplace ${index + 1}`} 
                      className="w-full h-[250px]"
                    />
                    {isEditing && (
                      <button
                        onClick={() => openImageModal(index)}
                        className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded"
                      >
                        Change Image
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {isEditing && (
          <button
            onClick={handleUpdate}
            className="mt-6 px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-600"
          >
            Update
          </button>
        )}

        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change Image</DialogTitle>
            </DialogHeader>
            <div className="p-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default InsideCognizant;