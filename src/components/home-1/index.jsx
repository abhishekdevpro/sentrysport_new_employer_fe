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
import logo from "../../Images/logo.png";
// import "./style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleSignupDialog } from "@/store/slices/auth";
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
import DefaultHeader2 from "../header/DefaulHeader2";
import StepsSection from "./StepsSection";
import DashboardEmployeeHeader from "../header/mobile-sidebar/DashBoardEmployeeHeader";
const index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // const userToken = useSelector((state) => state.auth.userToken);
  const userToken = localStorage.getItem(Constant.USER_TOKEN);
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
      <div className="app-gradient-bg">
        <div className="hidden md:block">
          {userToken ? <DashboardEmployeeHeader /> : <DefaultHeader2 />}
        </div>

        {/* Mobile Header */}
        <div className="block md:hidden">
          <MobileMenu />
        </div>

        {/* <MobileMenu /> */}

        <div
          style={{ minHeight: `calc(100vh - 100px)` }}
          className="py-8 sm:py-12 lg:py-16  mt-10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              {/* Left Content Section */}
              <div className="w-full lg:w-1/2 space-y-8">
                {/* Header Content */}
                <div className="space-y-6">
                  <p className="app-text-h2 !text-blue-700">
                    Sentryspot, your personal HR partner
                  </p>
                  <h1 className="app-text-h1 !text-5xl !text-blue-900">
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
                  </h1>
                  <p className="app-text-p !text-blue-900">
                    Sentryspot is the Canada premier AI-driven security services
                    job portal. Post your job listings for free and connect with
                    top candidates across security domains such as
                    cybersecurity, physical security, security management, data
                    protection, and more.
                  </p>
                </div>

                {/* Stats Section */}
                <div className="grid sm:grid-cols-2 gap-8">
                  {/* First Stat */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                        <span className="app-text-h2 !text-blue-600 p-2">
                          50+
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="app-text-h2 !text-blue-600">
                        50+ organizations
                      </h3>
                      <p className="app-text-sm !text-blue-900">
                        Choose to use our AI-Enabled services for smoother HR
                        processes.
                      </p>
                    </div>
                  </div>

                  {/* Second Stat */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                        <span className="app-text-h2 !text-blue-600 p-2">
                          ∞
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="app-text-h2 !text-blue-600">
                        Huge number
                      </h3>
                      <p className="mt-2 app-text-sm !text-blue-900">
                        Of Jobseekers already choosing to use our services.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - Login/Reset Form */}
              <div className=" app-light-bg rounded-2xl shadow-xl ">
                {!userToken ? (
                  <Login setIsLogin={() => setIsLogin(false)} />
                ) : (
                  <>
                    <img
                      src="https://cdn.dribbble.com/userupload/10666001/file/original-a8398c0483a56562a27189e504d08f67.png?resize=400x0"
                      alt=""
                      className="w-full h-auto rounded-tl-2xl rounded-tr-2xl"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <PeopleSection />

        <StepsSection />

        <CategorySection />

        <TestimonialSlider />

        <Footer />
      </div>
    </>
  );
};

export default index;
