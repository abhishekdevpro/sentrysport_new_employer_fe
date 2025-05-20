// import SpotViewPage from "@/components/sentry-spot/hero";
import DefaulHeader2 from "@/components/header/DefaulHeader2";
import MobileMenu from "@/components/header/MobileMenu";
import FooterDefault from "@/components/footer/common-footer/index";
import LoginPopup from "@/components/common/form/login/LoginPopup";

import React from "react";
import { Link } from "react-router-dom";
import HeroSection from "@/components/sentry-spot/hero";

const SentryPage = () => {
  return (
    <>
      <LoginPopup />
      <DefaulHeader2 />
      <MobileMenu />
      <LoginPopup />

      {/* End MobileMenu */}
      <section className="job-categories border-none pb-0">
        <HeroSection />{" "}
      </section>

      <section className="job-categories py-16 border-none">
        {/* <section className="job-section  v"> */}
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>The career profile to land your next great job</h2>
          </div>

          <div className="row flex justify-center gap-5 flex-wrap py-2">
            {/* <JobFeatured1 /> */}
            {[
              {
                title: " Job recommendations made just for you",
                content:
                  "Get job recommendations that match your unique skills and experience and fit your industry and salary expectations.",
              },
              {
                title: "Let great jobs come to you",
                content:
                  "Recruiters and employers can view your profile and contact you to discuss new opportunities – even when you’re not looking.",
              },
            ].map((item) => (
              <div
                className="flex flex-col gap-3 col-lg-4 col-md-6 col-sm-12 items-center"
                key={item.id}
              >
                <img
                  src="https://media.graphassets.com/bA2ZoPU1ThaZGhep8uRw"
                  alt=""
                  className="max-h-36"
                />
                {/* <div className="inner-box"> */}
                {/* <div className="content"> */}
                {/* <span className={icon ${item.icon}}></span> */}
                <p className="text-xl font-semibold text-center">
                  {item?.title}
                </p>
                <p className="text-center">{item?.content}</p>
                {/* </div> */}
                {/* </div> */}
              </div>
            ))}

            {/* <div className="border border-slate-900 p-5 rounded-lg md-6  ">            </div>  */}
          </div>
        </div>
      </section>

      <section className="job-categories py-10 border-none">
        {/* <section className="job-section  v"> */}
        <div className="auto-container border w-[70%]"></div>
      </section>

      <section className="job-categories py-16 border-none">
        {/* <section className="job-section  v"> */}
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>Stand out to future employers</h2>
          </div>

          <div className="row flex justify-center gap-5 flex-wrap py-2">
            {/* <JobFeatured1 /> */}
            {[
              {
                title: " Manage your profile",
                content:
                  "Take control of how your profile appears to potential employers via three profile visibility settings.",
              },
              {
                title: "Verify and stand out",
                content:
                  "Quickly and securely verify your work-related credentials in your profile and on job applications with SEEK Pass.",
              },
            ].map((item) => (
              <div
                className="flex flex-col gap-3 col-lg-4 col-md-6 col-sm-12 items-center"
                key={item.id}
              >
                <img
                  src="https://media.graphassets.com/bA2ZoPU1ThaZGhep8uRw"
                  alt=""
                  className="max-h-36"
                />
                {/* <div className="inner-box"> */}
                {/* <div className="content"> */}
                {/* <span className={icon ${item.icon}}></span> */}
                <p className="text-xl font-semibold text-center">
                  {item?.title}
                </p>
                <p className="text-center">{item?.content}</p>
                {/* </div> */}
                {/* </div> */}
              </div>
            ))}

            {/* <div className="border border-slate-900 p-5 rounded-lg md-6  ">            </div>  */}
          </div>
        </div>
      </section>

      <section className="job-categories py-16 border-none">
        {/* <section className="job-section  v"> */}
        <div className="auto-container flex justify-center items-center gap-3 p-10 py-14 border w-[95%] bg-gray-200 rounded-lg">
          <p className="text-2xl text-gray-800">
            Hiring? Your job ad seen by all the right people
          </p>
          <button className="border-2 border-gray-800 rounded-lg p-2 px-4 text-lg duration-300 hover:bg-gray-300">
            Employer site
          </button>
        </div>
      </section>
      <FooterDefault />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default SentryPage;
