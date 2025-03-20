import { Link, useNavigate } from "react-router-dom";
import About from "../about/About";
import AppSection from "../app-section/AppSection";
import Blog from "../blog/Blog";
import CallToAction from "../call-to-action/CallToAction";
import LoginPopup from "../common/form/login/LoginPopup";
import Partner from "../common/partner/Partner";
import FooterDefault from "../footer/common-footer";
import Funfact from "../fun-fact-counter/Funfact";
import DefaulHeader2 from "../header/DefaulHeader2";
import MobileMenu from "../header/MobileMenu";
import Hero1 from "../hero/hero-1";
import JobCategorie1 from "../job-categories/JobCategorie1";
import JobFeatured1 from "../job-featured/JobFeatured1";
import Testimonial from "../testimonial/Testimonial";
import CookieConsent from "react-cookie-consent";
// import logo from "../../Images/logo.png"
import "./landing.css";
import logo from "../../Images/logo.png"
// import "./style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import {  toggleSignupDialog } from "@/store/slices/auth";
import { IoLogOutOutline } from "react-icons/io5";
import Login from "../auth/Login";
import ResetPassword from "../auth/ResetPassword";
import { TypeAnimation } from "react-type-animation";
import { useEffect, useState } from "react";
import DashboardHeader from "../header/DashboardHeader";
import { Menu } from "lucide-react";
import Footer from "./Footer";
import PeopleSection from "./People-section";
import CategorySection from "./Category-Section";
import TestimonialSlider from "./Testimonial-Slider";
import { logout } from "@/store/slices/authSlice";
import { Constant } from "@/utils/constant/constant";
const index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  

  // const userToken = useSelector((state) => state.auth.userToken);
  const userToken = localStorage.getItem(Constant.USER_TOKEN)
  const [isLogin, setIsLogin] = useState(true);
  // const sliderSettings = {
  //   centerMode: true,
  //   centerPadding: "40px",
  //   dots: true,
  //   slidesToShow: 3,
  //   infinite: true,
  //   arrows: false,
  //   lazyLoad: "ondemand",
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 2,
  //         centerMode: false,
  //       },
  //     },
  //     {
  //       breakpoint: 767,
  //       settings: {
  //         slidesToShow: 1,
  //       },
  //     },
  //   ],
  // };

  const handleCheck = (type) => {
    switch (type) {
      case "job-post":
        if (!userToken) dispatch(toggleSignupDialog());
        else navigate("/employers-dashboard/post-jobs");
        break;

      default:
        break;
    }
  };


 
  return (
    <>
      
     <nav className="header" >
 {userToken? <div className="mb-8"> 
  <DashboardHeader />
 </div>:
  <div className="auto-container mx-auto px-4">
    <div className="header-menu flex  items-center">
      {/* Logo Section */}
      <div className="header-logo flex items-center">
        <img src="https://htmlsentryspot.vercel.app/img/company_logo.png" alt="Logo" />
      </div>

      {/* Desktop Menu */}
      <div className="main-menu hidden lg:flex  font-medium text-blue-800">
        <ul className="flex ">
          <li>
            <Link href="" className="hover:text-gray-300 text-blue-800">
              Search Resume
            </Link>
          </li>
          <li>
            <Link href="" className="hover:text-gray-300">
              AI Jobs Posting
            </Link>
          </li>
          <li>
            <Link href="" className="hover:text-gray-300">
              AI Skill Test
            </Link>
          </li>
          <li>
            <Link href="" className=" text-blue-800">
              Hiring Advice
            </Link>
          </li>
          <li>
            <Link href="" className="hover:text-gray-300">
              Market Insights
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Hamburger Icon */}
      <div className="lg:hidden">
        <button
          className="text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu />
        </button>
      </div>

      {/* Action Buttons */}
      <div className="side-menu flex items-center gap-3">
        {userToken ? (
          <button
            className="bg-gray-500 duration-500 p-2 text-white"
            title="logout"
            onClick={() => {
              dispatch(logout());
            }}
          >
            <IoLogOutOutline size={24} />
          </button>
        ) : (
          <></>
        )}
        <button
          type="button"
          className="register-btn bg-transparent text-blue-900 p-2 border border-blue-900"
          onClick={() => {
            handleCheck("job-post");
          }}
        >
          Create a job ad
        </button>
      </div>
    </div>

    {/* Mobile Menu */}
    {isMobileMenuOpen && (
      <div className="main-menu lg:hidden mt-4">
        <ul className="flex flex-col gap-2 text-center text-white">
          <li>
            <Link href="" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="" className="hover:text-gray-300">
              Jobs
            </Link>
          </li>
          <li>
            <Link href="" className="hover:text-gray-300">
              Products
            </Link>
          </li>
          <li>
            <Link href="" className="hover:text-gray-300">
              Hiring Advice
            </Link>
          </li>
          <li>
            <Link href="" className="hover:text-gray-300">
              Market Insights
            </Link>
          </li>
        </ul>
      </div>
    )}
  </div>}
       </nav>

<MobileMenu />
      
{!userToken && 
// (<div className="banner bg-gray-100 py-10">
//   <div className="auto-container mx-auto px-4">
//     <div className="banner-text flex flex-col lg:flex-row justify-between items-center">
//       <div className="b-text lg:w-1/2 mb-8 lg:mb-0">
//         <div className="b-head  lg:text-left">
//           <p className="text-xl font-medium text-gray-700">Sentryspot, your personal HR partner</p>
//           <h2 className="font-bold text-2xl lg:text-3xl mt-4">
//             Signup to AI-Enabled platform to{" "}
//             <TypeAnimation
//               sequence={[
//                 " Hire Talent",
//                 1000,
//                 " Post Jobs",
//                 1000,
//                 " Skill Test",
//                 1000,
//                 " Video JD",
//                 1000,
//               ]}
//               wrapper="span"
//               speed={50}
//               repeat={Infinity}
//             />
//           </h2>
//           <div className="b-para mt-4 text-gray-600">
//             <p>
//               Sentryspot is the Canada premier AI-driven security services job portal. Post
//               your job listings for free and connect with top candidates across security
//               domains such as cybersecurity, physical security, security management,
//               data protection, and more.
//             </p>
//           </div>
//         </div>
//         <div className=" mt-8 flex flex-col lg:flex-row gap-6">
//           <div className="icon flex items-start">
//             <i className="fading text-4xl text-gray-500"></i>
//             <div className=" -4">
//               <h2 className="font-bold text-xl">50+ organizations</h2>
//               <p className="text-gray-600">
//                 Choose to use our AI-Enabled services for smoother HR processes.
//               </p>
//             </div>
//           </div>
//           <div className="icoxt flex items-start">
//             <i className="fa=ext-4xl text-gray-500"></i>
//             <div className="txt ml-4">
//               <h2 className="font-bold text-xl">Huge number</h2>
//               <p className="text-gray-600">
//                 Of Jobseekers already choosing to use our services.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Login/ResetPassword Section */}
//       <div className="">
//         {isLogin ? (
//           <Login setIsLogin={() => setIsLogin(false)} />
//         ) : (
//           <ResetPassword setIsLogin={() => setIsLogin(true)} />
//         )}
//       </div>
//     </div>
//   </div>
// </div>)
<div className="h-auto bg-gray-100 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content Section */}
          <div className="w-full lg:w-1/2 space-y-8">
            {/* Header Content */}
            <div className="space-y-6">
              <p className="text-lg sm:text-xl font-medium text-gray-700">
                Sentryspot, your personal HR partner
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                Signup to AI-Enabled platform to{" "}
                <TypeAnimation
                  sequence={[
                    " Hire Talent",
                    1000,
                    " Post Jobs",
                    1000,
                    " Skill Test",
                    1000,
                    " Video JD",
                    1000,
                  ]}
                  wrapper="span"
                  speed={10}
                  repeat={Infinity}
                  className="text-blue-600"
                />
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl">
                Sentryspot is the Canada premier AI-driven security services job portal. 
                Post your job listings for free and connect with top candidates across 
                security domains such as cybersecurity, physical security, security 
                management, data protection, and more.
              </p>
            </div>

            {/* Stats Section */}
            <div className="grid sm:grid-cols-2 gap-8">
              {/* First Stat */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <span className="text-2xl text-blue-600">50+</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    50+ organizations
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Choose to use our AI-Enabled services for smoother HR processes.
                  </p>
                </div>
              </div>

              {/* Second Stat */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <span className="text-2xl text-blue-600">∞</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Huge number
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Of Jobseekers already choosing to use our services.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Login/Reset Form */}
          <div className=" bg-white rounded-2xl shadow-xl ">
            {isLogin ? (
              <Login setIsLogin={() => setIsLogin(false)} />
            ) : (
              <ResetPassword setIsLogin={() => setIsLogin(true)} />
            )}
          </div>
        </div>
      </div>
    </div>
}


      {/* <div className="people">
        <div className="auto-container">
          <div className="people-card">
            <div className="card-one  hover:shadow-xl" data-aos="fade">
              <img src="img/people-1.webp" />
              <h2>Canada's one of the most trusted Employment site</h2>
              <p>
                Reach candidates where they actively search for opportunities
              </p>
            </div>
            <div className="card-one hover:shadow-xl" data-aos="fade">
              <img src="img/people-2.webp" />
              <h2>Pick from a pool of AI-verified skilled professionals</h2>
              <p>
                Explore our large and inclusive pool of top talent to drive your
                business forward
              </p>
            </div>
            <div className="card-one hover:shadow-xl" data-aos="fade">
              <img src="img/people-3.webp" />
              <h2>Made by Experts on latest Technologies</h2>
              <p>
                Created by top security experts with the most advanced AI
                technologies
              </p>
            </div>
          </div>
          <div className="people-btn">
            <button type="button" className="py-[6px] px-[25px]">
              Create Account
            </button>
          </div>
        </div>
      </div> */}
<PeopleSection />

      <div className="steps">
        <div className="auto-container">
          <div className="steps-section ">
            <h2 className="">
              Spot new Hire with our easy to use platform
            </h2>
            <div className="step-one">
              <div className="step-text">
                <i className="fa-solid fa-1 "></i>
                <h3 className="my-3">
                  Gain access to top-tier, AI-verified talent through
                  Sentryspot.
                </h3>
                <p>
                  Post a job in minutes with AI and swiftly connect with the
                  most relevant candidates.
                </p>
              </div>
              <div className="step-img">
                <img src="img/step-one.webp" />
              </div>
            </div>
            <div className="step-one">
              <div className="step-img">
                <img src="img/step-two.webp" />
              </div>
              <div className="step-text">
                <i className="fa-solid fa-2"></i>
                <h3 className="my-3">Get AI skill matching</h3>
                <p>
                  AI skill test helps you spend less time in screening spotting
                  right job seeker
                </p>
              </div>
            </div>
            <div className="step-one">
              <div className="step-text">
                <i className="fa-solid fa-3"></i>
                <h3 className="my-3">Search, Screen, Interview..!!</h3>
                <p>
                  From posting to screening & managing job seekers all at one
                  place.
                </p>
              </div>
              <div className="step-img">
                <img src="img/step-three.webp" />
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* <div className="category">
        <div className="auto-container">
          <h2>
            Spot top-quality candidates across all key functions,
            <br /> with AI effortlessly filtering the best for you
          </h2>
          <div className="category-box mt-4">
            <div className="box-one py-4">
              <i className="fa-solid fa-camera"></i>
              <h2 className="break-all">Physical Security</h2>
            </div>
            <div className="box-one py-4">
              <i className="fa-solid fa-user-lock"></i>
              <h2 className="break-all">Security Management</h2>
            </div>
            <div className="box-one py-4">
              <i className="fa-solid fa-eye"></i>
              <h2 className="break-all"> Surveillance and Monitoring</h2>
            </div>
            <div className="box-one py-4">
              <i className="fa-solid fa-tower-broadcast"></i>
              <h2 className="break-all">Emergency and Incident Response</h2>
            </div>
            <div className="box-one py-4">
              <i className="fa-solid fa-bullhorn"></i>
              <h2 className="break-all">Security Training and Awareness</h2>
            </div>
            <div className="box-one py-4">
              <i className="fa-solid fa-masks-theater"></i>
              <h2 className="break-all">Intelligence and Threat Analysis</h2>
            </div>
            <div className="box-one py-4">
              <i className="fa-solid fa-business-time"></i>
              <h2 className="break-all">Security Sales and Business Development</h2>
            </div>
            <div className="box-one py-4">
              <i className="fa-solid fa-plane-lock"></i>
              <h2 className="break-all">Maritime and Aviation Security</h2>
            </div>
          </div>
        </div>
      </div> */}
      <CategorySection />
      
      {/* <div className="category">
        <div className="auto-container">
          <h2>Why Sentryspot for Employers</h2>
          <div className="testimonials">
            <Slider {...sliderSettings} className="testimonial-reel">
              <div>
                <div className="box">
                  <figure className="image">
                    <img
                      className="img-fluid rounded-circle"
                      src="img/test-1.webp"
                    />
                  </figure>
                  <div className="test-component">
                    <article className="test-title">
                      <h4>AI-Driven Talent Matching</h4>
                    </article>
                    <article className="test-content">
                      <p>
                        Sentryspot utilizes advanced AI algorithms to match your
                        job postings with the most relevant candidates. Our AI
                        system evaluates skills, experience, and job fit to
                        ensure you connect with top-quality talent quickly and
                        efficiently.
                      </p>
                    </article>
                  </div>
                </div>
              </div>
              <div>
                <div className="box">
                  <figure className="image">
                    <img
                      className="img-fluid rounded-circle"
                      src="img/test-2.webp"
                    />
                  </figure>
                  <div className="test-component">
                    <article className="test-title">
                      <h4>Streamlined Job Posting</h4>
                    </article>
                    <article className="test-content">
                      <p>
                        Posting a job on Sentryspot is fast and easy. With a
                        user-friendly interface, you can create and publish job
                        listings in minutes. Our platform ensures your job
                        openings are visible to a broad and diverse pool of
                        candidates in the security sector.
                      </p>
                    </article>
                  </div>
                </div>
              </div>
              <div>
                <div className="box">
                  <figure className="image">
                    <img
                      className="img-fluid rounded-circle"
                      src="img/test-3.webp"
                    />
                  </figure>
                  <div className="test-component">
                    <article className="test-title">
                      <h4>Verified Candidates</h4>
                    </article>
                    <article className="test-content">
                      <p>
                        All candidates on Sentryspot undergo rigorous AI-powered
                        skill verification, so you can be confident that you're
                        considering only the best-qualified professionals. This
                        saves you time and effort in screening, as we provide a
                        shortlist of pre-vetted candidates.
                      </p>
                    </article>
                  </div>
                </div>
              </div>
              <div>
                <div className="box">
                  <figure className="image">
                    <img
                      className="img-fluid rounded-circle"
                      src="img/test-4.webp"
                    />
                  </figure>
                  <div className="test-component">
                    <article className="test-title">
                      <h4>Efficient Screening Process</h4>
                    </article>
                    <article className="test-content">
                      <p>
                        Sentryspot’s AI tools automate the initial screening
                        process, filtering candidates based on your specific
                        criteria. This reduces the workload for your HR team,
                        allowing them to focus on more critical tasks and making
                        the recruitment process more efficient.
                      </p>
                    </article>
                  </div>
                </div>
              </div>

              <div>
                <div className="box">
                  <figure className="image">
                    <img
                      className="img-fluid rounded-circle"
                      src="img/test-5.webp"
                    />
                  </figure>
                  <div className="test-component">
                    <article className="test-title">
                      <h4>Seamless Interview Scheduling</h4>
                    </article>
                    <article className="test-content">
                      <p>
                        Our platform offers integrated scheduling tools that
                        make arranging interviews a breeze. Sentryspot syncs
                        with your calendar, allowing you to easily coordinate
                        interviews with candidates, ensuring a smooth and
                        organized recruitment process.
                      </p>
                    </article>
                  </div>
                </div>
              </div>
              <div>
                <div className="box">
                  <figure className="image">
                    <img
                      className="img-fluid rounded-circle"
                      src="img/test-6.webp"
                    />
                  </figure>
                  <div className="test-component">
                    <article className="test-title">
                      <h4>Specialized Security Focus</h4>
                    </article>
                    <article className="test-content">
                      <p>
                        As a platform dedicated to the security industry,
                        Sentryspot understands the unique requirements of
                        security roles. Whether you're hiring for cybersecurity,
                        physical security, or security management, we provide
                        access to a specialized talent pool tailored to your
                        needs.
                      </p>
                    </article>
                  </div>
                </div>
              </div>
              <div>
                <div className="box">
                  <figure className="image">
                    <img
                      className="img-fluid rounded-circle"
                      src="img/test-7.webp"
                    />
                  </figure>
                  <div className="test-component">
                    <article className="test-title">
                      <h4>Comprehensive Analytics and Reporting</h4>
                    </article>
                    <article className="test-content">
                      <p>
                        Sentryspot provides detailed analytics and reports to
                        help you track the success of your job postings,
                        understand candidate engagement, and optimize your
                        hiring strategy. This data-driven approach ensures you
                        make informed decisions at every stage of the hiring
                        process.
                      </p>
                    </article>
                  </div>
                </div>
              </div>
              <div>
                <div className="box">
                  <figure className="image">
                    <img
                      className="img-fluid rounded-circle"
                      src="img/test-8.webp"
                    />
                  </figure>
                  <div className="test-component">
                    <article className="test-title">
                      <h4>Cost-Effective Recruitment</h4>
                    </article>
                    <article className="test-content">
                      <p>
                        With Sentryspot, you can post jobs and access top-tier
                        talent without breaking the bank. Our platform offers
                        competitive pricing, ensuring you get maximum value for
                        your recruitment budget.
                      </p>
                    </article>
                  </div>
                </div>
              </div>
              <div>
                <div className="box">
                  <figure className="image">
                    <img
                      className="img-fluid rounded-circle"
                      src="img/test-9.webp"
                    />
                  </figure>
                  <div className="test-component">
                    <article className="test-title">
                      <h4>Exceptional Support</h4>
                    </article>
                    <article className="test-content">
                      <p>
                        Our dedicated support team is always ready to assist
                        you. Whether you need help with posting a job,
                        navigating the platform, or optimizing your hiring
                        process, Sentryspot’s customer support is just a call or
                        click away.
                      </p>
                    </article>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div> */}
      <TestimonialSlider />



     <Footer />
      {/* <div className="footer">
        <div className="auto-container">
          <div className="menu-section">
            <div className="footer-one">
              <div className="logo">
                <img src="https://htmlsentryspot.vercel.app/img/company_logo.png" />
                <div className="social-mdeai">
                  <a href="">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                  <a href="">
                    <i className="fa-brands fa-facebook"></i>
                  </a>
                  <a href="">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                  <a href="">
                    <i className="fa-brands fa-x-twitter"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="footer-one">
              <div className="footer-menu">
                <h2>Our services</h2>
                <ul>
                  <li>
                    <a href="">Why Sentryspot?</a>
                  </li>
                  <li>
                    <a href="">Recruiter Advice</a>
                  </li>
                  <li>
                    <a href="">Customer success</a>
                  </li>
                  <li>
                    <a href="">Our audience</a>
                  </li>
                  <li>
                    <a href="">Work for us</a>
                  </li>
                  <li>
                    <a href="">Terms and Conditions</a>
                  </li>
                  <li>
                    <a href="">Cookies Policy</a>
                  </li>
                  <li>
                    <a href="">Manage Preferences</a>
                  </li>
                  <li>
                    <a href="">Complaints Policy</a>
                  </li>
                  <li>
                    <a href="">Privacy Policy</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-one">
              <div className="footer-menu">
                <h2>Services for recruiters</h2>
                <ul>
                  <li>
                    <a href="">Post a job</a>
                  </li>
                  <li>
                    <a href="">CV Search</a>
                  </li>
                  <li>
                    <a href="">Pay for Performance</a>
                  </li>
                  <li>
                    <a href="">Recruitment Agencies</a>
                  </li>
                  <li>
                    <a href="">For developers</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-one">
              <div className="footer-menu">
                <h2>Other services</h2>
                <ul>
                  <li>
                    <a href="">Find a job</a>
                  </li>
                  <li>
                    <a href="">Find a course</a>
                  </li>
                  <li>
                    <a href="">Advertise a course</a>
                  </li>
                  <li>
                    <a href="">Sentryspot Global</a>
                  </li>
                  <li>
                    <a href="">Sentryspot Screening</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-one">
              <div className="footer-menu">
                <h2>Help and contact</h2>
                <ul>
                  <li>
                    <a href="">Help</a>
                  </li>
                  <li>
                    <a href="">Contact Us</a>
                  </li>
                  <li>
                    <a href="">Press Office</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default index;
