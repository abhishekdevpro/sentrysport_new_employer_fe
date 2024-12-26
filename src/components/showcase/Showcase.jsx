

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
import CompanyWTSSection from "./WtsSection";

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

      {/* <section className="job-categories ui-job-categories border-none" id="watch">
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
      </section> */}
      <CompanyWTSSection companyData={companyData}/>

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

