// // import React, { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import { IoBagHandleOutline, IoPlay } from "react-icons/io5";
// // import { CiLocationOn, CiPlay1 } from "react-icons/ci";
// // import { MdOutlineHealthAndSafety, MdPhoto, MdLocalCafe } from "react-icons/md";
// // import { FaHospital, FaHeart, FaCalendarAlt } from "react-icons/fa";
// // import { TbTargetArrow } from "react-icons/tb";
// // import { FaCarBurst } from "react-icons/fa6";
// // import { MdEdit } from "react-icons/md";
// // import axios from "axios";
// // // import { Card, CardContent } from "@/components/ui/card";
// // import {
// //   Carousel,
// //   CarouselContent,
// //   CarouselItem,
// //   CarouselNext,
// //   CarouselPrevious,
// // } from "@/components/ui/carousel";

// // import { Button } from "@/components/ui/button";
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardFooter,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";

// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// // import ImageGalleryComponent from "./ImageGallery";
// // import InsideCognizant from "./InsideCognizant ";
// // import { Constant } from "@/utils/constant/constant";
// // // import { Button } from "bootstrap";

// // const ShowcaseComponent = () => {
// //   const [openImageGallery, setOpenImageGallery] = useState(false);
// //   const [isPopupOpen, setIsPopupOpen] = useState(false);
// //   const [formData, setFormData] = useState({
// //     title: "Passion for making difference",
// //     description: "We innovate to find a better way—for the clients who depend on us, the customers who rely on them and the communities who count on us al",
// //     image:[
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //       "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg",
// //     ],
// //   });
// //   const [title, setTitle] = useState("Why Cognizant?");
// //   const [description1, setDescription1] = useState(
// //     "Cognizant (Nasdaq: CTSH) is one of the world's leading professional services companies, transforming clients' business, operating and technology models for the digital era. Our unique industry-based, consultative approach helps clients envision, build and run more innovative and efficient businesses. Headquartered in the U.S., Cognizant is ranked 194 on the Fortune 500 and"
// //   );
// //   const [description2, setDescription2] = useState(
// //     ""
// //   );
  
// //   // State to control modal visibility
// //   const [isModalOpen, setIsModalOpen] = useState(false);

// //   // Function to handle form submission and close modal
// //   const handleSave = () => {
// //     setIsModalOpen(false);
// //   };

// //   const handleEditClick = () => {
// //     setIsPopupOpen(true);
// //   };

// //   const handleClosePopup = () => {
// //     setIsPopupOpen(false);
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prevState) => ({ ...prevState, [name]: value }));
// //   };

// //   const handleImageChange = (e) => {
// //     setFormData((prevState) => ({ ...prevState, image: URL.createObjectURL(e.target.files[0]) }));
// //   };
// // const token = localStorage.getItem(Constant.USER_TOKEN)
// //   const handleFormSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       // Replace with your API endpoint
// //       const response = await axios.put("https://api.sentryspot.co.uk/api/employeer/company", formData,
// //         {
// //           headers:{
// //             Authorization:token
// //           }
// //         }
// //       );
// //       console.log("Update Successful", response.data);
// //       setIsPopupOpen(false); // Close the popup after successful update
// //     } catch (error) {
// //       console.error("Error updating data", error);
// //     }
// //   };
// //   return (
// //     <>
// // <nav className="fixed top-16 left-0 w-full bg-white shadow-lg z-50">
// //     <ul className="flex justify-around p-3">
// //       <li>
// //         <a href="#about" className="text-black font-semibold">About</a>
// //       </li>
// //       <li>
// //         <a href="#why-cognizant" className="text-black font-semibold">Why Cognizant?</a>
// //       </li>
// //       <li>
// //         <a href="#inside-cognizant" className="text-black font-semibold">Inside Cognizant</a>
// //       </li>
// //       <li>
// //         <a href="#watch" className="text-black font-semibold">Watch</a>
// //       </li>
// //       <li>
// //         <a href="#leadership" className="text-black font-semibold">Leadership</a>
// //       </li>
// //       <li>
// //         <a href="#unique" className="text-black font-semibold">What Makes Us Unique</a>
// //       </li>
// //       <li>
// //         <a href="#join-us" className="text-black font-semibold">Join Us</a>
// //       </li>
// //     </ul>
// //   </nav>
    
// //       <ImageGalleryComponent
// //         open={openImageGallery}
// //         closeHandler={() => {
// //           setOpenImageGallery(false);
// //         }}
// //       />
// //        <section className="about-section" id="about">
// //       <div className="auto-container">
// //         <div className="row">
// //           <div className="content-column col-lg-4 col-md-12 col-sm-12 order-2 relative">
// //             <div className="lg:absolute top-[28%] left-[-15%] !bg-white shadow-2xl rounded-3xl p-4 flex flex-col gap-8">
// //               <span className="inline-block border-2 !border-red-700 min-w-36 max-w-36"></span>
// //               <p className="title text-xl sm:text-3xl text-black font-bold w-[70%]">{formData.title}</p>
// //               <p>{formData.description}</p>
// //               <button className="text-white bg-blue-950 border p-2 rounded-lg px-4 flex gap-2 justify-center" onClick={handleEditClick}>
// //                 <MdEdit size={20} /> Edit
// //               </button>
// //             </div>
// //           </div>
// //           <div className="image-column col-lg-8 col-md-12 col-sm-12">
// //             <figure className="image relative" data-aos="fade-right">
// //            <div className="flex">
// //            <div>
// //                <img src={formData.image[2]} alt="Culture 3" className="object-cover w-[700px] h-full p-2" />
// //              </div>
// //              <div className="grid grid-rows-2 gap-2">
// //                <img src={formData.image[0]} alt="Culture 1" className=" w-full h-[250px] p-2 " />
// //                <img src={formData.image[1]} alt="Culture 2" className=" w-full h-[250px] p-2"  />
// //              </div>
// //            </div>
// //               <button className="absolute bottom-3 right-3 flex items-center gap-3 rounded-md p-2 px-3 bg-slate-800 text-white">
// //                 <MdPhoto size={24} />
// //                 <span>View All Photos</span>
// //               </button>
              
// //             </figure>
// //           </div>
// //         </div>
// //       </div>

// //       {isPopupOpen && (
// //         <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
// //           <div className="bg-blue-50 p-6 mx-20 rounded-lg shadow-lg w-full">
// //             <h2 className="text-xl mb-4 font-semibold">Edit About Section</h2>
// //             <form onSubmit={handleFormSubmit}>
// //               <div className="mb-4">
// //                 <label className="block text-gray-700 font-semibold">Title</label>
// //                 <input
// //                   type="text"
// //                   name="title"
// //                   value={formData.title}
// //                   onChange={handleChange}
// //                   className="w-full p-2 border rounded"
// //                 />
// //               </div>
// //               <div className="mb-4">
// //                 <label className="block text-gray-700 font-semibold">Description</label>
// //                 <textarea
// //                   name="description"
// //                   value={formData.description}
// //                   onChange={handleChange}
// //                   className="w-full p-2 h-36 border rounded"
// //                 />
// //               </div>
// //               <div className="mb-4">
// //                 <label className="block text-gray-700 font-semibold">Image</label>
// //                 <input type="file" onChange={handleImageChange} className="w-full p-2 border rounded" />
// //               </div>
// //               <button type="submit" className="bg-blue-900 text-white p-2 px-3 rounded font-semibold">Save</button>
// //               <button type="button" onClick={handleClosePopup} className="bg-red-500 text-white p-2 ml-2 rounded">Cancel</button>
// //             </form>
// //           </div>
// //         </div>
// //       )}
// //     </section>

      
// //       {/*  Why Cognizant? */}
// //       <section className="about-section mb-10" id="why-cognizant">
// //       <div className="auto-container   md:flex-row gap-4 w-[90%] mx-auto h-80">
// //         <div className="flex items-center">
// //           <p className="title text-xl sm:text-3xl text-black font-bold w-full sm:w-[80%] md:w-[55%] px-0 sm:px-7 md:px-16">
// //             {title}
// //           </p>
// //         </div>
// //         <span className="border hidden md:inline-block"></span>
// //         <div className="px-0 sm:px-7 md:px-16">
// //           <p className="text-lg sm:text-xl">{description1}</p>
         
// //           <button
// //             className="text-white bg-blue-950 border p-2 rounded-lg px-4"
// //             onClick={() => setIsModalOpen(true)}
// //           >
// //             Edit
// //           </button>
// //         </div>
// //       </div>

// //       {/* Modal for editing content */}
// //       {isModalOpen && (
// //         <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center h-full">
// //           <div className="bg-white p-6 rounded-lg w-[90%] sm:w-[60%] md:w-[40%]">
// //             <h3 className="text-xl font-bold mb-4">Edit Content</h3>
// //             <div className="mb-4">
// //               <label className="block text-sm font-medium mb-2">Title</label>
// //               <input
// //                 type="text"
// //                 className="w-full border p-2 rounded"
// //                 value={title}
// //                 onChange={(e) => setTitle(e.target.value)}
// //               />
// //             </div>
// //             <div className="mb-4">
// //               <label className="block text-sm font-medium mb-2">
// //                 Description 1
// //               </label>
// //               <textarea
// //                 className="w-full border p-2 rounded"
// //                 value={description1}
// //                 onChange={(e) => setDescription1(e.target.value)}
// //               />
// //             </div>
          
// //             <div className="flex justify-end">
// //               <button
// //                 className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
// //                 onClick={() => setIsModalOpen(false)}
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 className="text-white bg-blue-950 border p-2 rounded-lg px-4"
// //                 onClick={handleSave}
// //               >
// //                 Save
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </section>

     

// //     <section id="inside-cognizant">
// //     <InsideCognizant />
// //   </section>
// //       {/* Watch what we have to say*/}
// //       <section className="job-categories ui-job-categories border-none" id="watch">
// //         <div className="auto-container w-[90%]">
// //           <div className="sec-title text-center">
// //             <p className="font-bold text-xl sm:text-3xl text-black">
// //               Watch what we have to say
// //             </p>
// //           </div>

// //           <div className="row py-1">
// //             {/* <!-- Category Block --> */}

// //             <Carousel className="w-full">
// //               <CarouselContent className="-ml-1">
// //                 {Array.from({ length: 5 }).map((_, index) => (
// //                   <CarouselItem
// //                     key={index}
// //                     //   className="pl-1 md:basis-1/2 lg:basis-1/3"
// //                     className="flex basis-full sm:basis-[80%] md:basis-[70%] lg:basis-[50%]"
// //                   >
// //                     {/* <div className="p-1"> */}
// //                     {/* <Card> */}
// //                     <CardContent className="flex flex-col sm:flex-row">
// //                       <span className={`relative`}>
// //                         <img
// //                           src="https://picsum.photos/200/300"
// //                           alt=""
// //                           className="h-[220px] min-w-[200px] w-full object-cover"
// //                         />
// //                         <span className="flex justify-center items-center bg-pink-500 h-12 w-12 rounded-full pl-1 absolute bottom-3 right-3">
// //                           <IoPlay size={28} color="white" />
// //                         </span>
// //                       </span>
// //                       <div className="flex flex-col gap-3 border p-2">
// //                         <p className=" text-gray-700 text-xl font-semibold">
// //                           Welcome to Cognizant Pune
// //                         </p>
// //                         <p className=" w-[80%]">
// //                           Choose from a variety of medical, vision and dental
// //                           plans for you and your loved ones.
// //                         </p>
// //                       </div>
// //                     </CardContent>
// //                     {/* </Card> */}
// //                     {/* </div> */}
// //                   </CarouselItem>
// //                 ))}
// //               </CarouselContent>
// //               <CarouselPrevious />
// //               <CarouselNext />
// //             </Carousel>

          
// //           </div>
// //         </div>
// //       </section>

// //       {/* Meet our Pune Leadership team */}
// //       <section className="job-categories ui-job-categories border-none" id="leadership">
// //         <div className="auto-container w-[90%]">
// //           <div className="sec-title text-center">
// //             <p className="font-bold text-xl sm:text-3xl text-black">
// //               Meet our Pune Leadership team
// //             </p>
// //           </div>

// //           <div className="row py-1">
// //             {/* <!-- Category Block --> */}
// //             {["", "", ""].map((item, i) => (
// //               <div
// //                 className="flex flex-col items-center gap-4 py-4 col-lg-4 col-md-6 col-sm-12 "
// //                 key={i}
// //               >
// //                 <span className={`relative`}>
// //                   <img
// //                     src="https://picsum.photos/200/300"
// //                     alt=""
// //                     className="h-48 w-48 rounded-full object-cover"
// //                   />
// //                   <span className="flex justify-center items-center bg-pink-500 h-12 w-12 rounded-full pl-1 absolute bottom-[-15px] left-[38%]">
// //                     <IoPlay size={28} color="white" />
// //                   </span>
// //                 </span>
// //                 <div className="flex flex-col items-center gap-1">
// //                   <p className="text-center text-gray-700 font-bold">
// //                     Madhuraj Jadhav
// //                   </p>
// //                   <p className="text-center w-[80%]">
// //                     Vice President - Global Delivery Head - IoT & Engineering
// //                   </p>
// //                 </div>
// //               </div>
// //             ))}

// //             <div className="text-center">
// //               <button className="border p-2 px-3 mt-3 font-bold text-amber-700 rounded-md bg-gray-50">
// //                 See More
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </section>
// //       {/*  What Makes Us Unique */}
// //       <section className="job-categories ui-job-categories border-none py-2" id="unique">
// //         <div className="auto-container w-[90%]">
// //           <div className="sec-title text-center">
// //             <p className="font-bold text-xl sm:text-3xl text-black">
// //               What Makes Us Unique
// //             </p>
// //           </div>

// //           <div className="row bg-gray-100 py-3 sm:py-5">
// //             {/* <!-- Category Block -->  ["", "", "", "", "", ""] */}
// //             {[
// //               {
// //                 icon: <MdOutlineHealthAndSafety size={50} color="gray" />,
// //                 name: "Health Insurance",
// //                 description:
// //                   "Choose from a variety of medical, vision, and dental plans for you and your loved ones.",
// //               },
// //               {
// //                 icon: <FaHospital size={50} color="gray" />,
// //                 name: "24 hour Wellness Center",
// //                 description:
// //                   "Choose from a variety of medical, vision, and dental plans for you and your loved ones.",
// //               },
// //               {
// //                 icon: <MdLocalCafe size={50} color="gray" />,
// //                 name: "Cafeteria",
// //                 description:
// //                   "Choose from a variety of medical, vision, and dental plans for you and your loved ones.",
// //               },
// //               {
// //                 icon: <FaCalendarAlt size={50} color="gray" />,
// //                 name: "Maternity and Paternity Leave",
// //                 description:
// //                   "Choose from a variety of medical, vision, and dental plans for you and your loved ones.",
// //               },
// //               {
// //                 icon: <TbTargetArrow size={50} color="gray" />,
// //                 name: "Recreational Area",
// //                 description:
// //                   "Choose from a variety of medical, vision, and dental plans for you and your loved ones.",
// //               },
// //               {
// //                 icon: <FaHeart size={50} color="gray" />,
// //                 name: "Life Insurance",
// //                 description:
// //                   "Choose from a variety of medical, vision, and dental plans for you and your loved ones.",
// //               },
// //               {
// //                 icon: <FaCarBurst size={50} color="gray" />,
// //                 name: "Personal Accident Insurance",
// //                 description:
// //                   "Choose from a variety of medical, vision, and dental plans for you and your loved ones.",
// //               },
// //             ].map((item, i) => (
// //               <div
// //                 className="flex flex-col items-center gap-3 py-4 col-lg-4 col-md-6 col-sm-12 !border-gray-200"
// //                 key={i}
// //               >
// //                 <span className={``}>
// //                   {item?.icon}
// //                   {/*  */}
// //                 </span>
// //                 <div className="flex flex-col items-center gap-1">
// //                   <p className="text-center text-gray-700 font-bold">
// //                     {item?.name}
// //                   </p>
// //                   <p className="text-center w-[80%]">
// //                     Choose from a variety of medical, vision and dental plans
// //                     for you and your loved ones.
// //                   </p>
// //                 </div>
// //               </div>
// //             ))}
// //             <div className="text-center">
// //               <button className="border p-2 px-3 mt-3 font-bold text-amber-700 rounded-md bg-gray-50">
// //                 See More
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </section>
// //       {/* Come, join us! We’re hiring. */}
// //       <section className="about-section" id="join-us">
// //         <div className="auto-container">
// //           <div className="row flex justify-center">
// //             <div className="content-column col-lg-12 order-2 w-[90%] border flex flex-col items-center justify-center p-0">
// //               <div className="p-4 flex flex-col gap-3 w-[80%] justify-center">
// //                 <p className="text-xl sm:text-3xl font-bold text-black text-center mt-3">
// //                   Come, join us!{" "}
// //                   <span className="text-red-500">We’re hiring.</span>
// //                 </p>
// //                 <p className="text-md sm:text-lg font-bold text-black text-center mb-4">
// //                   We believe that each one of us should be able to find our
// //                   dream job, and we constantly strive hard to make that
// //                   possible. Apply now!
// //                 </p>
// //                 <div className="flex justify-center gap-5">
// //                   <button>ALL</button>
// //                   <button>DEVOPS</button>
// //                 </div>
// //               </div>
// //               <div className=" border w-full flex justify-center py-4 cursor-pointer">
// //                 <div className="w-[90%] flex flex-col md:flex-row justify-between items-center mb-2 sm:mb-4 ">
// //                   <div className="flex flex-col gap-3">
// //                     <p className="text-md sm:text-lg font-semibold text-black">
// //                       Cognizant - Power Automate Engineer - Cloud & Desktop
// //                     </p>
// //                     <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
// //                       <span className="flex gap-2 items-center">
// //                         <span>
// //                           <IoBagHandleOutline />
// //                         </span>
// //                         <span>3-10 yrs</span>
// //                       </span>
// //                       <span className="flex gap-2 items-center">
// //                         <span>
// //                           <CiLocationOn />
// //                         </span>
// //                         <span>Anywhere in India/Multiple Locations</span>
// //                       </span>
// //                     </div>
// //                   </div>
// //                   <div className="mt-2 sm:mt-0">
// //                     <button className="border p-1 px-3 font-semibold text-amber-800 rounded-md text-lg">
// //                       View Job
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       <div className="  items-center justify-center text-center bg-gray-500 h-60">
// //         <h3 className="text-white font-semibold text-3xl pt-5 mb-6">Follow us</h3>
// //         <div className="flex items-center justify-center gap-3 ">
// //           <a href aria-label="Find us on LinkedIn" target="_blank" rel="noopener">
// //             <svg className="h-10 w-10 text-white" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
// //               <path d="M44.45 0H3.55A3.5 3.5 0 0 0 0 3.46v41.07A3.5 3.5 0 0 0 3.54 48h40.9A3.51 3.51 0 0 0 48 44.54V3.46A3.5 3.5 0 0 0 44.45 0Zm-30.2 40.9H7.11V18h7.12v22.9Zm-3.57-26.03a4.13 4.13 0 1 1-.02-8.26 4.13 4.13 0 0 1 .02 8.26ZM40.9 40.9H33.8V29.77c0-2.66-.05-6.08-3.7-6.08-3.7 0-4.27 2.9-4.27 5.89V40.9h-7.1V18h6.82v3.12h.1c.94-1.8 3.26-3.7 6.72-3.7 7.21 0 8.54 4.74 8.54 10.91V40.9Z" fill="currentColor" />
// //             </svg>
// //           </a>
// //           <a href aria-label="Find us on Twitter" target="_blank" rel="noopener">
// //             <svg className="h-10 w-10 text-white" viewBox="0 0 48 40" fill="none" xmlns="http://www.w3.org/2000/svg">
// //               <path d="M15.1 39.5c18.1 0 28.02-15 28.02-28.02 0-.42-.01-.85-.03-1.27A20 20 0 0 0 48 5.1c-1.8.8-3.7 1.32-5.65 1.55a9.9 9.9 0 0 0 4.33-5.45 19.8 19.8 0 0 1-6.25 2.4 9.86 9.86 0 0 0-16.8 8.97A27.97 27.97 0 0 1 3.36 2.3a9.86 9.86 0 0 0 3.04 13.14 9.86 9.86 0 0 1-4.46-1.23v.12A9.84 9.84 0 0 0 9.83 24c-1.45.4-2.97.45-4.44.17a9.87 9.87 0 0 0 9.2 6.84A19.75 19.75 0 0 1 0 35.08c4.5 2.89 9.75 4.42 15.1 4.42Z" fill="currentColor" />
// //             </svg>
// //           </a>
// //           <a href aria-label="Find us on Facebook" target="_blank" rel="noopener">
// //             <svg className="h-10 w-10 text-white" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
// //               <path d="M48 24a24 24 0 1 0-27.75 23.7V30.95h-6.1V24h6.1v-5.29c0-6.01 3.58-9.34 9.07-9.34 2.62 0 5.37.47 5.37.47v5.91h-3.03c-2.98 0-3.91 1.85-3.91 3.75V24h6.66l-1.07 6.94h-5.59V47.7A24 24 0 0 0 48 24Z" fill="currentColor" />
// //             </svg>
// //           </a>
// //           <a href aria-label="Find us on Instagram" target="_blank" rel="noopener">
// //             <svg className="h-10 w-10 text-white" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
// //               <path d="M24 4.32c6.41 0 7.17.03 9.7.14 2.34.1 3.6.5 4.45.83 1.11.43 1.92.95 2.75 1.79a7.38 7.38 0 0 1 1.8 2.75c.32.85.72 2.12.82 4.46.11 2.53.14 3.29.14 9.7 0 6.4-.03 7.16-.14 9.68-.1 2.35-.5 3.61-.83 4.46a7.42 7.42 0 0 1-1.79 2.75 7.38 7.38 0 0 1-2.75 1.8c-.85.32-2.12.72-4.46.82-2.53.11-3.29.14-9.69.14-6.41 0-7.17-.03-9.7-.14-2.34-.1-3.6-.5-4.45-.83a7.42 7.42 0 0 1-2.75-1.79 7.38 7.38 0 0 1-1.8-2.75 13.2 13.2 0 0 1-.82-4.46c-.11-2.53-.14-3.29-.14-9.69 0-6.41.03-7.17.14-9.7.1-2.34.5-3.6.83-4.45A7.42 7.42 0 0 1 7.1 7.08a7.38 7.38 0 0 1 2.75-1.8 13.2 13.2 0 0 1 4.46-.82c2.52-.11 3.28-.14 9.69-.14ZM24 0c-6.52 0-7.33.03-9.9.14-2.54.11-4.3.53-5.81 1.12a11.71 11.71 0 0 0-4.26 2.77 11.76 11.76 0 0 0-2.77 4.25C.66 9.8.26 11.55.14 14.1A176.6 176.6 0 0 0 0 24c0 6.52.03 7.33.14 9.9.11 2.54.53 4.3 1.12 5.81a11.71 11.71 0 0 0 2.77 4.26 11.73 11.73 0 0 0 4.25 2.76c1.53.6 3.27 1 5.82 1.12 2.56.11 3.38.14 9.9.14 6.5 0 7.32-.03 9.88-.14 2.55-.11 4.3-.52 5.82-1.12 1.58-.6 2.92-1.43 4.25-2.76a11.73 11.73 0 0 0 2.77-4.25c.59-1.53 1-3.27 1.11-5.82.11-2.56.14-3.38.14-9.9 0-6.5-.03-7.32-.14-9.88-.11-2.55-.52-4.3-1.11-5.82-.6-1.6-1.41-2.94-2.75-4.27a11.73 11.73 0 0 0-4.25-2.76C38.2.67 36.45.27 33.9.15 31.33.03 30.52 0 24 0Z" fill="currentColor" />
// //               <path d="M24 11.67a12.33 12.33 0 1 0 0 24.66 12.33 12.33 0 0 0 0-24.66ZM24 32a8 8 0 1 1 0-16 8 8 0 0 1 0 16ZM39.7 11.18a2.88 2.88 0 1 1-5.76 0 2.88 2.88 0 0 1 5.75 0Z" fill="currentColor" />
// //             </svg>
// //           </a>
// //         </div>
// //         <h3 className="text-white font-semibold text-sm pt-5 ">Follow us All rights reserved © Sentryspot.com</h3>
// //       </div>
// //     </>
// //   );
// // };

// // export default ShowcaseComponent;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { IoBagHandleOutline, IoPlay } from "react-icons/io5";
// import { CiLocationOn } from "react-icons/ci";
// import { MdOutlineHealthAndSafety, MdPhoto, MdLocalCafe, MdEdit } from "react-icons/md";
// import { FaHospital, FaHeart, FaCalendarAlt, FaLinkedin, FaTwitter, FaFacebook, FaGlobe } from "react-icons/fa";
// import { TbTargetArrow } from "react-icons/tb";
// import { FaCarBurst } from "react-icons/fa6";

// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// import ImageGalleryComponent from "./ImageGallery";
// import InsideCognizant from "./InsideCognizant ";
// import { Constant } from "@/utils/constant/constant";
// import ReactQuill from "react-quill";

// const ShowcaseComponent = () => {
//   const [companyData, setCompanyData] = useState(null);
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [openImageGallery, setOpenImageGallery] = useState(false);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     image: [
//       "/placeholder.svg?height=300&width=400",
//       "/placeholder.svg?height=250&width=400",
//       "/placeholder.svg?height=250&width=400",
//     ],
//   });
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const token = localStorage.getItem(Constant.USER_TOKEN)

//   useEffect(() => {
//     const fetchCompanyData = async () => {
//       try {
//         const response = await axios.get("https://api.sentryspot.co.uk/api/employeer/company",{
//           headers: {
//             Authorization: token
//           }
//         });
//         setCompanyData(response.data.data);
//         setFormData({
//           title: response.data.data.title || "Passion for making difference",
//           description: response.data.data.about || "We innovate to find a better way—for the clients who depend on us, the customers who rely on them and the communities who count on us all",
//           image: [
//             response.data.cover_image || "/placeholder.svg?height=300&width=400",
//             "/placeholder.svg?height=250&width=400",
//             "/placeholder.svg?height=250&width=400",
//           ],
//         });
//       } catch (error) {
//         console.error("Error fetching company data:", error);
//       }
//     };

//     fetchCompanyData();
//   }, []);

//   const handleEditClick = () => {
//     setIsPopupOpen(true);
//   };

//   const handleClosePopup = () => {
//     setIsPopupOpen(false);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     setFormData((prevState) => ({ ...prevState, image: URL.createObjectURL(e.target.files[0]) }));
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem(Constant.USER_TOKEN);
//       const response = await axios.put("https://api.sentryspot.co.uk/api/employeer/company", formData, {
//         headers: {
//           Authorization: token
//         }
//       });
//       console.log("Update Successful", response.data);
//       setIsPopupOpen(false);
//     } catch (error) {
//       console.error("Error updating data", error);
//     }
//   };

//   if (!companyData) {
//     return <div>Loading...</div>;
//   }

//   const handleImageChange2 = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length > 3) {
//       alert("You can upload a maximum of 3 images.");
//     } else {
//       setSelectedImages(files);
//     }
//   };

//   const handleSave2 = async () => {
//     if (selectedImages.length > 3) {
//       alert("Please ensure only 3 images are selected.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("about", companyData.about);
//     selectedImages.forEach((image) => formData.append("about_images_upload", image));

//     try {
//       const response = await axios.patch("https://api.sentryspot.co.uk/api/employeer/company-about", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (response.status === 200) {
//         alert("Content updated successfully!");
//         setIsModalOpen(false);
//       } else {
//         alert("Failed to update content. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error updating content:", error);
//       alert("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <>
//       <nav className="fixed top-16 left-0 w-full bg-white shadow-lg z-50">
//         <ul className="flex justify-around p-3">
//           <li><a href="#about" className="text-black font-semibold">About</a></li>
//           <li><a href="#why-cognizant" className="text-black font-semibold">Why {companyData.company_name}?</a></li>
//           <li><a href="#inside-cognizant" className="text-black font-semibold">Inside {companyData.company_name}</a></li>
//           <li><a href="#watch" className="text-black font-semibold">Watch</a></li>
//           <li><a href="#leadership" className="text-black font-semibold">Leadership</a></li>
//           <li><a href="#unique" className="text-black font-semibold">What Makes Us Unique</a></li>
//           <li><a href="#join-us" className="text-black font-semibold">Join Us</a></li>
//         </ul>
//       </nav>

//       <ImageGalleryComponent
//         open={openImageGallery}
//         closeHandler={() => {
//           setOpenImageGallery(false);
//         }}
//       />

//       <section className="about-section" id="about">
//         <div className="auto-container">
//           <div className="row">
//             <div className="content-column col-lg-4 col-md-12 col-sm-12 order-2 relative">
//               <div className="lg:absolute top-[28%] left-[-15%] !bg-white shadow-2xl rounded-3xl p-4 flex flex-col gap-8">
//                 <span className="inline-block border-2 !border-red-700 min-w-36 max-w-36"></span>
//                 <p className="title text-xl sm:text-3xl text-black font-bold w-[70%]">{formData.title}</p>
//                 <p>{formData.description}</p>
//                 <button className="text-white bg-blue-950 border p-2 rounded-lg px-4 flex gap-2 justify-center" onClick={handleEditClick}>
//                   <MdEdit size={20} /> Edit
//                 </button>
//               </div>
//             </div>
//             <div className="image-column col-lg-8 col-md-12 col-sm-12">
//               <figure className="image relative" data-aos="fade-right">
//                 <div className="flex">
//                   <div>
//                     <img src={formData.image[2]} alt="Culture 3" className="object-cover w-[700px] h-full p-2" />
//                   </div>
//                   <div className="grid grid-rows-2 gap-2">
//                     <img src={formData.image[0]} alt="Culture 1" className=" w-full h-[250px] p-2 " />
//                     <img src={formData.image[1]} alt="Culture 2" className=" w-full h-[250px] p-2"  />
//                   </div>
//                 </div>
//                 <button className="absolute bottom-3 right-3 flex items-center gap-3 rounded-md p-2 px-3 bg-slate-800 text-white">
//                   <MdPhoto size={24} />
//                   <span>View All Photos</span>
//                 </button>
//               </figure>
//             </div>
//           </div>
//         </div>

//         {isPopupOpen && (
          
//     <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center h-full">
//   <div className="bg-white p-6 rounded-lg w-[90%] sm:w-[60%] md:w-[40%]">
//     <h3 className="text-xl font-bold mb-4">Edit Content</h3>
//     <div className="mb-4">
//       <label className="block text-sm font-medium mb-2">Title</label>
//       <input
//         type="text"
//         className="w-full border p-2 rounded"
//         value={companyData.title}
//         onChange={(e) =>
//           setCompanyData({ ...companyData, title: e.target.value })
//         }
//       />
//     </div>
//     <div className="mb-4">
//       <label className="block text-sm font-medium mb-2">Description</label>
//       <ReactQuill
//         className="bg-white rounded border"
//         value={companyData.about}
//         onChange={(content) => setCompanyData({ ...companyData, about: content })}
//       />
//     </div>
//     <div className="mb-4">
//       <label className="block text-sm font-medium mb-2">Upload Images</label>
//       <input
//         type="file"
//         multiple
//         accept="image/*"
//         className="w-full border p-2 rounded"
//         onChange={handleImageChange2}
//       />
//       {selectedImages.length > 0 && (
//         <p className="text-sm text-gray-500 mt-2">
//           {selectedImages.length} image(s) selected.
//         </p>
//       )}
//     </div>
//     <div className="flex justify-end">
//       <button
//         className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
//         onClick={() => setIsPopupOpen(false)}
//       >
//         Cancel
//       </button>
//       <button
//         className="text-white bg-blue-950 border p-2 rounded-lg px-4"
//         onClick={handleSave2}
//       >
//         Save
//       </button>
//     </div>
//   </div>
// </div>
//         )}
//       </section>

//       <section className="about-section mb-10" id="why-cognizant">
//         <div className="auto-container md:flex-row gap-4 w-[90%] mx-auto h-80">
//           <div className="flex items-center">
//             <p className="title text-xl sm:text-3xl text-black font-bold w-full sm:w-[80%] md:w-[55%] px-0 sm:px-7 md:px-16">
//               Why {companyData.company_name}?
//             </p>
//           </div>
//           <span className="border hidden md:inline-block"></span>
//           <div className="px-0 sm:px-7 md:px-16">
//             <p className="text-lg sm:text-xl">{companyData.about}</p>
//             <button
//               className="text-white bg-blue-950 border p-2 rounded-lg px-4 mt-4"
//               onClick={() => setIsModalOpen(true)}
//             >
//               Edit
//             </button>
//           </div>
//         </div>

//         {isModalOpen && (
//           <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center h-full">
//             <div className="bg-white p-6 rounded-lg w-[90%] sm:w-[60%] md:w-[40%]">
//               <h3 className="text-xl font-bold mb-4">Edit Content</h3>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2">Title</label>
//                 <input
//                   type="text"
//                   className="w-full border p-2 rounded"
//                   value={`Why ${companyData.title}?`}
//                   readOnly
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2">
//                   Description
//                 </label>
//                 <textarea
//                   className="w-full border p-2 rounded"
//                   value={companyData.about}
//                   onChange={(e) => setCompanyData({...companyData, about: e.target.value})}
//                 />
//               </div>
//               <div className="flex justify-end">
//                 <button
//                   className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
//                   onClick={() => setIsModalOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="text-white bg-blue-950 border p-2 rounded-lg px-4"
//                   onClick={() => {
//                     // Here you would typically update the API
//                     setIsModalOpen(false);
//                   }}
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
          
//         )}
        
//       </section>

//       <section id="inside-cognizant">
//         <InsideCognizant />
//       </section>

//       <section className="job-categories ui-job-categories border-none" id="watch">
//         <div className="auto-container w-[90%]">
//           <div className="sec-title text-center">
//             <p className="font-bold text-xl sm:text-3xl text-black">
//               Watch what we have to say
//             </p>
//           </div>

//           <div className="row py-1">
//             <Carousel className="w-full">
//               <CarouselContent className="-ml-1">
//                 {Array.from({ length: 5 }).map((_, index) => (
//                   <CarouselItem
//                     key={index}
//                     className="flex basis-full sm:basis-[80%] md:basis-[70%] lg:basis-[50%]"
//                   >
//                     <CardContent className="flex flex-col sm:flex-row">
//                       <span className={`relative`}>
//                         <img
//                           src="https://picsum.photos/200/300"
//                           alt=""
//                           className="h-[220px] min-w-[200px] w-full object-cover"
//                         />
//                         <span className="flex justify-center items-center bg-pink-500 h-12 w-12 rounded-full pl-1 absolute bottom-3 right-3">
//                           <IoPlay size={28} color="white" />
//                         </span>
//                       </span>
//                       <div className="flex flex-col gap-3 border p-2">
//                         <p className=" text-gray-700 text-xl font-semibold">
//                           Welcome to {companyData.company_name}
//                         </p>
//                         <p className=" w-[80%]">
//                           {companyData.summery}
//                         </p>
//                       </div>
//                     </CardContent>
//                   </CarouselItem>
//                 ))}
//               </CarouselContent>
//               <CarouselPrevious />
//               <CarouselNext />
//             </Carousel>
//           </div>
//         </div>
//       </section>

//       <section className="job-categories ui-job-categories border-none" id="leadership">
//         <div className="auto-container w-[90%]">
//           <div className="sec-title text-center">
//             <p className="font-bold text-xl sm:text-3xl text-black">
//               Meet our Leadership team
//             </p>
//           </div>

//           <div className="row py-1">
//             {["", "", ""].map((item, i) => (
//               <div
//                 className="flex flex-col items-center gap-4 py-4 col-lg-4 col-md-6 col-sm-12 "
//                 key={i}
//               >
//                 <span className={`relative`}>
//                   <img
//                     src="https://picsum.photos/200/300"
//                     alt=""
//                     className="h-48 w-48 rounded-full object-cover"
//                   />
//                   <span className="flex justify-center items-center bg-pink-500 h-12 w-12 rounded-full pl-1 absolute bottom-[-15px] left-[38%]">
//                     <IoPlay size={28} color="white" />
//                   </span>
//                 </span>
//                 <div className="flex flex-col items-center gap-1">
//                   <p className="text-center text-gray-700 font-bold">
//                     Leadership Member {i + 1}
//                   </p>
//                   <p className="text-center w-[80%]">
//                     {companyData.company_industry.name} Expert
//                   </p>
//                 </div>
//               </div>
//             ))}

//             <div className="text-center">
//               <button className="border p-2 px-3 mt-3 font-bold text-amber-700 rounded-md bg-gray-50">
//                 See More
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="job-categories ui-job-categories border-none py-2" id="unique">
//         <div className="auto-container w-[90%]">
//           <div className="sec-title text-center">
//             <p className="font-bold text-xl sm:text-3xl text-black">
//               What Makes Us Unique
//             </p>
//           </div>

//           <div className="row bg-gray-100 py-3 sm:py-5">
//             {[
//               {
//                 icon: <MdOutlineHealthAndSafety size={50} color="gray" />,
//                 name: "Health Insurance",
//                 description: companyData.health_insurance_value,
//               },
//               {
//                 icon: <FaHospital size={50} color="gray" />,
//                 name: "24 hour Wellness Center",
//                 description: companyData.wellness_center_value,
//               },
//               {
//                 icon: <MdLocalCafe size={50} color="gray" />,
//                 name: "Cafeteria",
//                 description: companyData.cafeteria_value,
//               },
//               {
//                 icon: <FaCalendarAlt size={50} color="gray" />,
//                 name: "Maternity and Paternity Leave",
//                 description: companyData.maternity_leave_value,
//               },
//               {
//                 icon: <TbTargetArrow size={50} color="gray" />,
//                 name: "Recreational Area",
//                 description: companyData.recreational_area_value,
//               },
//               {
//                 icon: <FaHeart size={50} color="gray" />,
//                 name: "Life Insurance",
//                 description: companyData.life_insurance_value,
//               },
//               {
//                 icon: <FaCarBurst size={50} color="gray" />,
//                 name: "Personal Accident Insurance",
//                 description: companyData.personal_accident_insurance_value,
//               },
//             ].map((item, i) => (
//               <div
//                 className="flex flex-col items-center gap-3 py-4 col-lg-4 col-md-6 col-sm-12 !border-gray-200"
//                 key={i}
//               >
//                 <span className={``}>
//                   {item?.icon}
//                 </span>
//                 <div className="flex flex-col items-center gap-1">
//                   <p className="text-center text-gray-700 font-bold">
//                     {item?.name}
//                   </p>
//                   <p className="text-center w-[80%]">
//                     {item?.description}
//                   </p>
//                 </div>
//               </div>
//             ))}
//             <div className="text-center">
//               <button className="border p-2 px-3 mt-3 font-bold text-amber-700 rounded-md bg-gray-50">
//                 See More
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="about-section" id="join-us">
//         <div className="auto-container">
//           <div className="row flex justify-center">
//             <div className="content-column col-lg-12 order-2 w-[90%] border flex flex-col items-center justify-center p-0">
//               <div className="p-4 flex flex-col gap-3 w-[80%] justify-center">
//                 <p className="text-xl sm:text-3xl font-bold text-black text-center mt-3">
//                   Come, join us!{" "}
//                   <span className="text-red-500">We're hiring.</span>
//                 </p>
//                 <p className="text-md sm:text-lg font-bold text-black text-center mb-4">
//                   {/* {companyData.join_us} */}
//                 </p>
//                 <div className="flex justify-center gap-5">
//                   <button>ALL</button>
//                   <button>{companyData.company_industry.name.toUpperCase()}</button>
//                 </div>
//               </div>
//               <div className=" border w-full flex justify-center py-4 cursor-pointer">
//                 <div className="w-[90%] flex flex-col md:flex-row justify-between items-center mb-2 sm:mb-4 ">
//                   <div className="flex flex-col gap-3">
//                     <p className="text-md sm:text-lg font-semibold text-black">
//                       {companyData.company_name} - {companyData.company_industry.name} Engineer
//                     </p>
//                     <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
//                       <span className="flex gap-2 items-center">
//                         <span>
//                           <IoBagHandleOutline />
//                         </span>
//                         <span>{companyData.founded_date} years</span>
//                       </span>
//                       <span className="flex gap-2 items-center">
//                         <span>
//                           <CiLocationOn />
//                         </span>
//                         <span>{companyData.city.name}, {companyData.state.name}</span>
//                       </span>
//                     </div>
//                   </div>
//                   <div className="mt-2 sm:mt-0">
//                     <button className="border p-1 px-3 font-semibold text-amber-800 rounded-md text-lg">
//                       View Job
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <div className="items-center justify-center text-center bg-gray-500 h-60">
//         <h3 className="text-white font-semibold text-3xl pt-5 mb-6">Follow us</h3>
//         <div className="flex items-center justify-center gap-3 ">
//           <a href={companyData.linkedin_link} aria-label="Find us on LinkedIn" target="_blank" rel="noopener">
//             <FaLinkedin className="h-10 w-10 text-white" />
//           </a>
//           <a href={companyData.twitter_link} aria-label="Find us on Twitter" target="_blank" rel="noopener">
//             <FaTwitter className="h-10 w-10 text-white" />
//           </a>
//           <a href={companyData.facebook_link} aria-label="Find us on Facebook" target="_blank" rel="noopener">
//             <FaFacebook className="h-10 w-10 text-white" />
//           </a>
//           <a href={companyData.website_link} aria-label="Visit our website" target="_blank" rel="noopener">
//             <FaGlobe className="h-10 w-10 text-white" />
//           </a>
//         </div>
//         <h3 className="text-white font-semibold text-sm pt-5 ">Follow us All rights reserved © {companyData.company_name}</h3>
//       </div>
//     </>
//   );
// };

// export default ShowcaseComponent;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoBagHandleOutline, IoPlay } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineHealthAndSafety, MdPhoto, MdLocalCafe, MdEdit } from "react-icons/md";
import { FaHospital, FaHeart, FaCalendarAlt, FaLinkedin, FaTwitter, FaFacebook, FaGlobe } from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";
import { FaCarBurst } from "react-icons/fa6";
import DOMPurify from 'dompurify';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ImageGalleryComponent from "./ImageGallery";
import InsideCognizant from "./InsideCognizant ";
import { Constant } from "@/utils/constant/constant";
import ReactQuill from "react-quill";

const ShowcaseComponent = () => {
  const [companyData, setCompanyData] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [openImageGallery, setOpenImageGallery] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=250&width=400",
      "/placeholder.svg?height=250&width=400",
    ],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem(Constant.USER_TOKEN)
  const BASE_IMAGE_URL = "https://api.sentryspot.co.uk"
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get("https://api.sentryspot.co.uk/api/employeer/company", {
          headers: {
            Authorization: token
          }
        });
        setCompanyData(response.data.data);
        setFormData({
          title: response.data.data.title || "Passion for making difference",
          description: response.data.data.about || "We innovate to find a better way—for the clients who depend on us, the customers who rely on them and the communities who count on us all",
          image: [
            response.data.cover_image || "/placeholder.svg?height=300&width=400",
            "/placeholder.svg?height=250&width=400",
            "/placeholder.svg?height=250&width=400",
          ],
        });
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompanyData();
  }, []);

  const handleEditClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prevState) => ({ ...prevState, image: URL.createObjectURL(e.target.files[0]) }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem(Constant.USER_TOKEN);
      const response = await axios.put("https://api.sentryspot.co.uk/api/employeer/company", formData, {
        headers: {
          Authorization: token
        }
      });
      console.log("Update Successful", response.data);
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error updating data", error);
    }
  };

  const handleImageChange2 = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      alert("You can upload a maximum of 3 images.");
    } else {
      setSelectedImages(files);
    }
  };

  const handleSave2 = async () => {
    if (selectedImages.length > 3) {
      alert("Please ensure only 3 images are selected.");
      return;
    }

    const formData = new FormData();

    formData.append("title", companyData.title)
    formData.append("about", companyData.about)
    selectedImages.forEach((image) => formData.append("about_images_upload", image));

    try {
      const response = await axios.patch("https://api.sentryspot.co.uk/api/employeer/company-about", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization:token,
        },
      });

      if (response.status === 200) {
        toast.success("Content updated successfully!");
        setIsPopupOpen(false);
      } else {
        alert("Failed to update content. Please try again.");
      }
    } catch (error) {
      console.error("Error updating content:", error);
      toast.error("An error occurred. Please try again.");
    }
  };
  const handleSave3 = async () => {
   

    const formData = new FormData();

    // formData.append("title", companyData.title)
    formData.append("summery", companyData.summery)

    try {
      const response = await axios.patch("https://api.sentryspot.co.uk/api/employeer/company-about", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization:token,
        },
      });

      if (response.status === 200) {
        toast.success("Content updated successfully!");
        setIsPopupOpen(false);
      } else {
        alert("Failed to update content. Please try again.");
      }
    } catch (error) {
      console.error("Error updating content:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  if (!companyData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <nav className="fixed top-16 left-0 w-full bg-white shadow-lg z-50">
        <ul className="flex justify-around p-3">
          <li><a href="#about" className="text-black font-semibold">About</a></li>
          <li><a href="#why-cognizant" className="text-black font-semibold">Why {companyData.company_name}?</a></li>
          <li><a href="#inside-cognizant" className="text-black font-semibold">Inside {companyData.company_name}</a></li>
          <li><a href="#watch" className="text-black font-semibold">Watch</a></li>
          <li><a href="#leadership" className="text-black font-semibold">Leadership</a></li>
          <li><a href="#unique" className="text-black font-semibold">What Makes Us Unique</a></li>
          <li><a href="#join-us" className="text-black font-semibold">Join Us</a></li>
        </ul>
      </nav>

      <ImageGalleryComponent
        open={openImageGallery}
        closeHandler={() => {
          setOpenImageGallery(false);
        }}
      />

      <section className="about-section" id="about">
        <div className="auto-container">
          <div className="row">
            <div className="content-column col-lg-4 col-md-12 col-sm-12 order-2 relative">
              <div className="lg:absolute top-[28%] left-[-15%] !bg-white shadow-2xl rounded-3xl p-4 flex flex-col gap-8">
                <span className="inline-block border-2 !border-red-700 min-w-36 max-w-36"></span>
                <p className="title text-xl sm:text-3xl text-black font-bold w-[70%]">{formData.title}</p>
                <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(formData.description) }}></p>
                <button className="text-white bg-blue-950 border p-2 rounded-lg px-4 flex gap-2 justify-center" onClick={handleEditClick}>
                  <MdEdit size={20} /> Edit
                </button>
              </div>
            </div>
            <div className="image-column col-lg-8 col-md-12 col-sm-12">
              <figure className="image relative" data-aos="fade-right">
                <div className="flex">
                  <div>
                    <img src={companyData.about_images[2]?`${BASE_IMAGE_URL}${companyData.about_images[2]}`: "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg"} alt="Culture 3" className="object-cover w-[700px] h-full p-2" />
                  </div>
                  <div className="grid grid-rows-2 gap-2">
                    <img src={companyData.about_images[0]?`${BASE_IMAGE_URL}${companyData.about_images[0]}`:"https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg"} alt="Culture 1" className=" w-full h-[250px] p-2 " />
                    <img src={companyData.about_images[1]?`${BASE_IMAGE_URL}${companyData.about_images[1]}` : "https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg"} alt="Culture 2" className=" w-full h-[250px] p-2"  />
                  </div>
                </div>
                <button className="absolute bottom-3 right-3 flex items-center gap-3 rounded-md p-2 px-3 bg-slate-800 text-white">
                  <MdPhoto size={24} />
                  <span>View All Photos</span>
                </button>
              </figure>
            </div>
          </div>
        </div>

        {isPopupOpen && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center h-full">
            <div className="bg-white p-6 rounded-lg w-[90%] sm:w-[60%] md:w-[40%]">
              <h3 className="text-xl font-bold mb-4">Edit Content</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={companyData.title}
                  onChange={(e) =>
                    setCompanyData({ ...companyData, title: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Description</label>
                <ReactQuill
                  className="bg-white rounded border"
                  value={companyData.about}
                  onChange={(content) => setCompanyData({ ...companyData, about: content })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Upload Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="w-full border p-2 rounded"
                  onChange={handleImageChange2}
                />
                {selectedImages.length > 0 && (
                  <p className="text-sm text-gray-500 mt-2">
                    {selectedImages.length} image(s) selected.
                  </p>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => setIsPopupOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="text-white bg-blue-950 border p-2 rounded-lg px-4"
                  onClick={handleSave2}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="about-section mb-10" id="why-cognizant">
        <div className="auto-container md:flex-row gap-4 w-[90%] mx-auto h-80">
          <div className="flex items-center">
            <p className="title text-xl sm:text-3xl text-black font-bold w-full sm:w-[80%] md:w-[55%] px-0 sm:px-7 md:px-16">
              Why {companyData.company_name}?
            </p>
          </div>
          <span className="border hidden md:inline-block"></span>
          <div className="px-0 sm:px-7 md:px-16">
            <p className="text-lg sm:text-xl" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(companyData.summery) }}></p>
            <button
              className="text-white bg-blue-950 border p-2 rounded-lg px-4 mt-4"
              onClick={() => setIsModalOpen(true)}
            >
              Edit
            </button>
          </div>
        </div>

        {/* {isModalOpen && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center h-full p-2">
            <div className="bg-gray-200 p-6 rounded-lg w-[90%] sm:w-[60%] md:w-[40%]">
              <h3 className="text-xl font-bold mb-4">Edit Content</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Company name </label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={`Why ${companyData.company_name}?`}
                  readOnly
                />
              </div>
             
                <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Description</label>
            {/* React-Quill for rich text editing 
            <ReactQuill
              theme="snow"
              value={companyData.summery}
              onChange={(value) => setCompanyData({ ...companyData, summery: value })}
              className="h-48"
            />
          </div>
              <div className="flex justify-end">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="text-white bg-blue-950 border p-2 rounded-lg px-4"
                    onClick={handleSave3}
                  
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )} */}

{isModalOpen && (
  <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center h-full p-4">
    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[60%] md:w-[40%] max-h-[90%] overflow-y-auto">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Edit Content</h3>
      {/* <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
        <input
          type="text"
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          value={`Why ${companyData.company_name}?`}
          readOnly
        />
      </div> */}
      <div className="mb-6 ">
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <ReactQuill
          theme="snow"
          value={companyData.summery}
          onChange={(value) => setCompanyData({ ...companyData, summery: value })}
          // className="h-24 rounded focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <div className="flex justify-end gap-2">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
          onClick={handleSave3}
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

      </section>

      <section id="inside-cognizant">
        <InsideCognizant companyData={companyData} />
      </section>

      <section className="job-categories ui-job-categories border-none" id="watch">
        <div className="auto-container w-[90%]">
          <div className="sec-title text-center">
            <p className="font-bold text-xl sm:text-3xl text-black">
              Watch what we have to say
            </p>
          </div>

          <div className="row py-1">
            <Carousel className="w-full">
              <CarouselContent className="-ml-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="flex basis-full sm:basis-[80%] md:basis-[70%] lg:basis-[50%]"
                  >
                    <CardContent className="flex flex-col sm:flex-row">
                      <span className={`relative`}>
                        <img
                          src="https://picsum.photos/200/300"
                          alt=""
                          className="h-[220px] min-w-[200px] w-full object-cover"
                        />
                        <span className="flex justify-center items-center bg-pink-500 h-12 w-12 rounded-full pl-1 absolute bottom-3 right-3">
                          <IoPlay size={28} color="white" />
                        </span>
                      </span>
                      <div className="flex flex-col gap-3 border p-2">
                        <p className=" text-gray-700 text-xl font-semibold">
                          Welcome to {companyData.company_name}
                        </p>
                        <p className=" w-[80%]" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(companyData.summery) }}></p>
                      </div>
                    </CardContent>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>

      <section className="job-categories ui-job-categories border-none" id="leadership">
        <div className="auto-container w-[90%]">
          <div className="sec-title text-center">
            <p className="font-bold text-xl sm:text-3xl text-black">
              Meet our Leadership team
            </p>
          </div>

          <div className="row py-1">
            {["", "", ""].map((item, i) => (
              <div
                className="flex flex-col items-center gap-4 py-4 col-lg-4 col-md-6 col-sm-12 "
                key={i}
              >
                <span className={`relative`}>
                  <img
                    src="https://picsum.photos/200/300"
                    alt=""
                    className="h-48 w-48 rounded-full object-cover"
                  />
                  <span className="flex justify-center items-center bg-pink-500 h-12 w-12 rounded-full pl-1 absolute bottom-[-15px] left-[38%]">
                    <IoPlay size={28} color="white" />
                  </span>
                </span>
                <div className="flex flex-col items-center gap-1">
                  <p className="text-center text-gray-700 font-bold">
                    Leadership Member {i + 1}
                  </p>
                  <p className="text-center w-[80%]">
                    {companyData.company_industry.name} Expert
                  </p>
                </div>
              </div>
            ))}

            <div className="text-center">
              <button className="border p-2 px-3 mt-3 font-bold text-amber-700 rounded-md bg-gray-50">
                See More
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="job-categories ui-job-categories border-none py-2" id="unique">
        <div className="auto-container w-[90%]">
          <div className="sec-title text-center">
            <p className="font-bold text-xl sm:text-3xl text-black">
              What Makes Us Unique
            </p>
          </div>

          <div className="row bg-gray-100 py-3 sm:py-5">
            {[
              {
                icon: <MdOutlineHealthAndSafety size={50} color="gray" />,
                name: "Health Insurance",
                description: companyData.health_insurance_value,
              },
              {
                icon: <FaHospital size={50} color="gray" />,
                name: "24 hour Wellness Center",
                description: companyData.wellness_center_value,
              },
              {
                icon: <MdLocalCafe size={50} color="gray" />,
                name: "Cafeteria",
                description: companyData.cafeteria_value,
              },
              {
                icon: <FaCalendarAlt size={50} color="gray" />,
                name: "Maternity and Paternity Leave",
                description: companyData.maternity_leave_value,
              },
              {
                icon: <TbTargetArrow size={50} color="gray" />,
                name: "Recreational Area",
                description: companyData.recreational_area_value,
              },
              {
                icon: <FaHeart size={50} color="gray" />,
                name: "Life Insurance",
                description: companyData.life_insurance_value,
              },
              {
                icon: <FaCarBurst size={50} color="gray" />,
                name: "Personal Accident Insurance",
                description: companyData.personal_accident_insurance_value,
              },
            ].map((item, i) => (
              <div
                className="flex flex-col items-center gap-3 py-4 col-lg-4 col-md-6 col-sm-12 !border-gray-200"
                key={i}
              >
                <span className={``}>
                  {item?.icon}
                </span>
                <div className="flex flex-col items-center gap-1">
                  <p className="text-center text-gray-700 font-bold">
                    {item?.name}
                  </p>
                  <p className="text-center w-[80%]" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.description) }}></p>
                </div>
              </div>
            ))}
            <div className="text-center">
              <button className="border p-2 px-3 mt-3 font-bold text-amber-700 rounded-md bg-gray-50">
                See More
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section" id="join-us">
        <div className="auto-container">
          <div className="row flex justify-center">
            <div className="content-column col-lg-12 order-2 w-[90%] border flex flex-col items-center justify-center p-0">
              <div className="p-4 flex flex-col gap-3 w-[80%] justify-center">
                <p className="text-xl sm:text-3xl font-bold text-black text-center mt-3">
                  Come, join us!{" "}
                  <span className="text-red-500">We're hiring.</span>
                </p>
                <p className="text-md sm:text-lg font-bold text-black text-center mb-4" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(companyData.join_us) }}></p>
                <div className="flex justify-center gap-5">
                  <button>ALL</button>
                  <button>{companyData.company_industry.name.toUpperCase()}</button>
                </div>
              </div>
              <div className=" border w-full flex justify-center py-4 cursor-pointer">
                <div className="w-[90%] flex flex-col md:flex-row justify-between items-center mb-2 sm:mb-4 ">
                  <div className="flex flex-col gap-3">
                    <p className="text-md sm:text-lg font-semibold text-black">
                      {companyData.company_name} - {companyData.company_industry.name} Engineer
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                      <span className="flex gap-2 items-center">
                        <span>
                          <IoBagHandleOutline />
                        </span>
                        <span>{companyData.founded_date} years</span>
                      </span>
                      <span className="flex gap-2 items-center">
                        <span>
                          <CiLocationOn />
                        </span>
                        <span>{companyData.city.name}, {companyData.state.name}</span>
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <button className="border p-1 px-3 font-semibold text-amber-800 rounded-md text-lg">
                      View Job
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="items-center justify-center text-center bg-gray-500 h-60">
        <h3 className="text-white font-semibold text-3xl pt-5 mb-6">Follow us</h3>
        <div className="flex items-center justify-center gap-3 ">
          <a href={companyData.linkedin_link} aria-label="Find us on LinkedIn" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="h-10 w-10 text-white" />
          </a>
          <a href={companyData.twitter_link} aria-label="Find us on Twitter" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="h-10 w-10 text-white" />
          </a>
          <a href={companyData.facebook_link} aria-label="Find us on Facebook" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="h-10 w-10 text-white" />
          </a>
          <a href={companyData.website_link} aria-label="Visit our website" target="_blank" rel="noopener noreferrer">
            <FaGlobe className="h-10 w-10 text-white" />
          </a>
        </div>
        <h3 className="text-white font-semibold text-sm pt-5 ">All rights reserved © {companyData.company_name}</h3>
      </div>
    </>
  );
};

export default ShowcaseComponent;

