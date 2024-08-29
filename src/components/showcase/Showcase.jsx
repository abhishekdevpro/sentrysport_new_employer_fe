import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoBagHandleOutline, IoPlay } from "react-icons/io5";
import { CiLocationOn, CiPlay1 } from "react-icons/ci";
import { MdOutlineHealthAndSafety, MdPhoto, MdLocalCafe } from "react-icons/md";
import { FaHospital, FaHeart, FaCalendarAlt } from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";
import { FaCarBurst } from "react-icons/fa6";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import ImageGalleryComponent from "./ImageGallery";

const ShowcaseComponent = () => {
  const [openImageGallery, setOpenImageGallery] = useState(false);

  return (
    <>
      <ImageGalleryComponent
        open={openImageGallery}
        closeHandler={() => {
          setOpenImageGallery(false);
        }}
      />
      <section className="about-section">
        <div className="auto-container">
          <div className="row">
            <div className="content-column col-lg-4 col-md-12 col-sm-12 order-2 relative">
              <div className=" lg:absolute top-[28%] left-[-15%] !bg-white shadow-2xl rounded-3xl p-4 flex flex-col gap-8">
                <span className="inline-block border-2 !border-red-700 min-w-36 max-w-36"></span>
                <p className="title text-xl sm:text-3xl text-black font-bold w-[70%]">
                  Passion for making difference
                </p>
                <p>
                  We innovate to find a better way—for the clients who depend on
                  us, the customers who rely on them and the communities who
                  count on us al
                </p>
              </div>
            </div>
            <div className="image-column col-lg-8 col-md-12 col-sm-12">
              <figure
                className="image relative"
                data-aos="fade-right"
                onClick={() => setOpenImageGallery(true)}
              >
                <img
                  src="https://d3ckeg60qk79fq.cloudfront.net/media/79250/U-79250-02/templateImages1678785237743_cropped.jpg"
                  alt="about"
                  className="object-cover w-full"
                />
                <button className="absolute bottom-3 right-3 flex items-center gap-3 rounded-md p-2 px-3 bg-slate-800 text-white">
                  <MdPhoto size={24} />
                  <span>View All Photos</span>
                </button>
              </figure>
            </div>
          </div>
        </div>
      </section>
      {/*  Why Cognizant? */}
      <section className="about-section mb-10">
        <div className="auto-container  flex flex-col md:felx-row gap-2 w-[90%]">
          <div className="flex items-center">
            <p className="title text-xl sm:text-3xl text-black font-bold w-full sm:w-[80%] md:w-[55%] px-0 sm:px-7 md:px-16">
              Why Cognizant?
            </p>
          </div>
          <span className="border hidden md:inline-block"></span>
          <div className="px-0 sm:px-7 md:px-16">
            <p className="text-lg sm:text-xl">
              Cognizant (Nasdaq: CTSH) is one of the world's leading
              professional services companies, transforming clients' business,
              operating and technology models for the digital era. Our unique
              industry-based, consultative approach helps clients envision,
              build and run more innovative and efficient businesses.
            </p>
            <p className="text-lg sm:text-xl">
              Headquartered in the U.S., Cognizant is ranked 194 on the Fortune
              500 and
            </p>
            <button className="text-amber-800 py-2 text-md mt-3">
              Read More
            </button>
          </div>
        </div>
      </section>

      {/* Watch what we have to say*/}
      <section className="job-categories ui-job-categories border-none">
        <div className="auto-container w-[90%]">
          <div className="sec-title text-center">
            <p className="font-bold text-xl sm:text-3xl text-black">
              Watch what we have to say
            </p>
          </div>

          <div className="row py-1">
            {/* <!-- Category Block --> */}

            <Carousel className="w-full">
              <CarouselContent className="-ml-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    //   className="pl-1 md:basis-1/2 lg:basis-1/3"
                    className="flex basis-full sm:basis-[80%] md:basis-[70%] lg:basis-[50%]"
                  >
                    {/* <div className="p-1"> */}
                    {/* <Card> */}
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
                          Welcome to Cognizant Pune
                        </p>
                        <p className=" w-[80%]">
                          Choose from a variety of medical, vision and dental
                          plans for you and your loved ones.
                        </p>
                      </div>
                    </CardContent>
                    {/* </Card> */}
                    {/* </div> */}
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            {/* {["", ""].map((item, i) => (
              <div
                className="flex basis-full sm:basis-[60%] md:basis-[40%]"
                key={i}
              >
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
                    Welcome to Cognizant Pune
                  </p>
                  <p className=" w-[80%]">
                    Choose from a variety of medical, vision and dental plans
                    for you and your loved ones.
                  </p>
                </div>
              </div>
            ))} */}
          </div>
        </div>
      </section>

      {/* Meet our Pune Leadership team */}
      <section className="job-categories ui-job-categories border-none">
        <div className="auto-container w-[90%]">
          <div className="sec-title text-center">
            <p className="font-bold text-xl sm:text-3xl text-black">
              Meet our Pune Leadership team
            </p>
          </div>

          <div className="row py-1">
            {/* <!-- Category Block --> */}
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
                    Madhuraj Jadhav
                  </p>
                  <p className="text-center w-[80%]">
                    Vice President - Global Delivery Head - IoT & Engineering
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
      {/*  What Makes Us Unique */}
      <section className="job-categories ui-job-categories border-none py-2">
        <div className="auto-container w-[90%]">
          <div className="sec-title text-center">
            <p className="font-bold text-xl sm:text-3xl text-black">
              What Makes Us Unique
            </p>
          </div>

          <div className="row bg-gray-100 py-3 sm:py-5">
            {/* <!-- Category Block -->  ["", "", "", "", "", ""] */}
            {[
              {
                icon: <MdOutlineHealthAndSafety size={50} color="gray" />,
                name: "Health Insurance",
                description:
                  "Choose from a variety of medical, vision, and dental plans for you and your loved ones.",
              },
              {
                icon: <FaHospital size={50} color="gray" />,
                name: "24 hour Wellness Center",
                description:
                  "Choose from a variety of medical, vision, and dental plans for you and your loved ones.",
              },
              {
                icon: <MdLocalCafe size={50} color="gray" />,
                name: "Cafeteria",
                description:
                  "Choose from a variety of medical, vision, and dental plans for you and your loved ones.",
              },
              {
                icon: <FaCalendarAlt size={50} color="gray" />,
                name: "Maternity and Paternity Leave",
                description:
                  "Choose from a variety of medical, vision, and dental plans for you and your loved ones.",
              },
              {
                icon: <TbTargetArrow size={50} color="gray" />,
                name: "Recreational Area",
                description:
                  "Choose from a variety of medical, vision, and dental plans for you and your loved ones.",
              },
              {
                icon: <FaHeart size={50} color="gray" />,
                name: "Life Insurance",
                description:
                  "Choose from a variety of medical, vision, and dental plans for you and your loved ones.",
              },
              {
                icon: <FaCarBurst size={50} color="gray" />,
                name: "Personal Accident Insurance",
                description:
                  "Choose from a variety of medical, vision, and dental plans for you and your loved ones.",
              },
            ].map((item, i) => (
              <div
                className="flex flex-col items-center gap-3 py-4 col-lg-4 col-md-6 col-sm-12 !border-gray-200"
                key={i}
              >
                <span className={``}>
                  {item?.icon}
                  {/*  */}
                </span>
                <div className="flex flex-col items-center gap-1">
                  <p className="text-center text-gray-700 font-bold">
                    {item?.name}
                  </p>
                  <p className="text-center w-[80%]">
                    Choose from a variety of medical, vision and dental plans
                    for you and your loved ones.
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
      {/* Come, join us! We’re hiring. */}
      <section className="about-section">
        <div className="auto-container">
          <div className="row flex justify-center">
            <div className="content-column col-lg-12 order-2 w-[90%] border flex flex-col items-center justify-center p-0">
              <div className="p-4 flex flex-col gap-3 w-[80%] justify-center">
                <p className="text-xl sm:text-3xl font-bold text-black text-center mt-3">
                  Come, join us!{" "}
                  <span className="text-red-500">We’re hiring.</span>
                </p>
                <p className="text-md sm:text-lg font-bold text-black text-center mb-4">
                  We believe that each one of us should be able to find our
                  dream job, and we constantly strive hard to make that
                  possible. Apply now!
                </p>
                <div className="flex justify-center gap-5">
                  <button>ALL</button>
                  <button>DEVOPS</button>
                </div>
              </div>
              <div className=" border w-full flex justify-center py-4 cursor-pointer">
                <div className="w-[90%] flex flex-col md:flex-row justify-between items-center mb-2 sm:mb-4 ">
                  <div className="flex flex-col gap-3">
                    <p className="text-md sm:text-lg font-semibold text-black">
                      Cognizant - Power Automate Engineer - Cloud & Desktop
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                      <span className="flex gap-2 items-center">
                        <span>
                          <IoBagHandleOutline />
                        </span>
                        <span>3-10 yrs</span>
                      </span>
                      <span className="flex gap-2 items-center">
                        <span>
                          <CiLocationOn />
                        </span>
                        <span>Anywhere in India/Multiple Locations</span>
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
    </>
  );
};

export default ShowcaseComponent;
