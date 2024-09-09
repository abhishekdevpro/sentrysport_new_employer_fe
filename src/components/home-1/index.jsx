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
import { logout, toggleSignupDialog } from "@/store/slices/auth";
import { IoLogOutOutline } from "react-icons/io5";
import Login from "../auth/Login";
import ResetPassword from "../auth/ResetPassword";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";
const index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { loading, userInfo, userToken, error, success, message } = useSelector(
    (state) => state.auth
  );
  const [isLogin, setIsLogin] = useState(true);

  const sliderSettings = {
    centerMode: true,
    centerPadding: "40px",
    dots: true,
    slidesToShow: 3,
    infinite: true,
    arrows: false,
    lazyLoad: "ondemand",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerMode: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

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
      
      <nav className="header" style={{ backgroundColor: "#4C3957" }}>
  <div className="auto-container mx-auto px-4">
    <div className="header-menu flex  items-center py-">
      {/* Logo Section */}
      <div className="header-logo flex items-center">
        <img src={logo} alt="Logo" />
      </div>

      {/* Desktop Menu */}
      <div className="main-menu hidden lg:flex  font-medium text-white">
        <ul className="flex ">
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

      {/* Mobile Hamburger Icon */}
      <div className="lg:hidden">
        <button
          className="text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
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
          <button
            className="theme-btn btn-style-three call-modal p-2 text-lg px-3 bg-transparent !text-[#ffffff]"
            onClick={() => {
              dispatch(toggleSignupDialog());
            }}
          >
            Register
          </button>
        )}
        <button
          type="button"
          className="register-btn bg-transparent text-white p-2 border border-white"
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
  </div>
</nav>


      
<div className="banner bg-gray-100 py-10">
  <div className="auto-container mx-auto px-4">
    <div className="banner-text flex flex-col lg:flex-row justify-between items-center">
      <div className="b-text lg:w-1/2 mb-8 lg:mb-0">
        <div className="b-head  lg:text-left">
          <p className="text-xl font-medium text-gray-700">Abroadium, your personal HR partner</p>
          <h2 className="font-bold text-2xl lg:text-3xl mt-4">
            Signup to AI-Enabled platform to{" "}
            <TypeAnimation
              sequence={[
                " Hire Talent",
                1000,
                " Post Jobs",
                1000,
                " Send Skill Test",
                1000,
                " Video JD",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h2>
          <div className="b-para mt-4 text-gray-600">
            <p>
              Abroadium is the Canada premier AI-driven security services job portal. Post
              your job listings for free and connect with top candidates across security
              domains such as cybersecurity, physical security, security management,
              data protection, and more.
            </p>
          </div>
        </div>
        <div className="banntxt mt-8 flex flex-col lg:flex-row gap-6">
          <div className="icon flex items-start">
            <i className="fading text-4xl text-gray-500"></i>
            <div className=" -4">
              <h2 className="font-bold text-xl">50+ organizations</h2>
              <p className="text-gray-600">
                Choose to use our AI-Enabled services for smoother HR processes.
              </p>
            </div>
          </div>
          <div className="icoxt flex items-start">
            <i className="fa=ext-4xl text-gray-500"></i>
            <div className="txt ml-4">
              <h2 className="font-bold text-xl">Huge number</h2>
              <p className="text-gray-600">
                Of Jobseekers already choosing to use our services.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Login/ResetPassword Section */}
      <div className="">
        {isLogin ? (
          <Login setIsLogin={() => setIsLogin(false)} />
        ) : (
          <ResetPassword setIsLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  </div>
</div>


      <div className="people">
        <div className="auto-container">
          <div className="people-card">
            <div className="card-one  hover:shadow-xl" data-aos="fade">
              <img src="img/people-1.webp" />
              <h2>Canada one of the most trusted Employment site</h2>
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
      </div>


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
                  Abroadium.
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


      <div className="category">
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
      </div>
      
      <div className="category">
        <div className="auto-container">
          <h2>Why Abroadium for Employers</h2>
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
                        Abroadium utilizes advanced AI algorithms to match your
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
                        Posting a job on Abroadium is fast and easy. With a
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
                        All candidates on Abroadium undergo rigorous AI-powered
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
                        Abroadium’s AI tools automate the initial screening
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
                        make arranging interviews a breeze. Abroadium syncs
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
                        Abroadium understands the unique requirements of
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
                        Abroadium provides detailed analytics and reports to
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
                        With Abroadium, you can post jobs and access top-tier
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
                        process, Abroadium’s customer support is just a call or
                        click away.
                      </p>
                    </article>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="auto-container">
          <div className="menu-section">
            <div className="footer-one">
              <div className="logo">
                <img src={logo} />
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
                    <a href="">Why Abroadium?</a>
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
                    <a href="">Abroadium Global</a>
                  </li>
                  <li>
                    <a href="">Abroadium Screening</a>
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
      </div>
    </>
  );
};

export default index;
