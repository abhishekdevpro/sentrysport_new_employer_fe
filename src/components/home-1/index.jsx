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

  // useEffect(() => {
  //   //Slick Carousel Controllers
  //   $(".testimonial-reel").slick({
  //     centerMode: true,
  //     centerPadding: "40px",
  //     dots: true,
  //     slidesToShow: 3,
  //     infinite: true,
  //     arrows: false,
  //     lazyLoad: "ondemand",
  //     responsive: [
  //       {
  //         breakpoint: 1024,
  //         settings: {
  //           slidesToShow: 2,
  //           centerMode: false,
  //         },
  //       },
  //       {
  //         breakpoint: 767,
  //         settings: {
  //           slidesToShow: 1,
  //         },
  //       },
  //     ],
  //   });
  // }, []);
  return (
    <>
      {/* <LoginPopup />

      <DefaulHeader2 />

      <MobileMenu />

      <Hero1 />
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        cookieName="myAwesomeCookieConsent"
        style={{ background: "#2B373B" }}
        buttonStyle={{
          color: "white",
          fontSize: "23px",
          backgroundColor: "#1A3071",
        }}
        expires={150}
      >
        <span>
          {" "}
          We use cookies to analyze our traffic, learn more about our users,
          using this information to help us design our website to better suit
          our users’ needs. Full details on our privacy policy can be found at:{" "}
        </span>
        <span style={{ fontSize: "20px" }}>
          https://Abrodiumfe.vercel.app/
        </span>
      </CookieConsent>
      <section className="job-categories ui-job-categories">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>Popular Job Categories</h2>
            <div className="text">2020 jobs live - 293 added today.</div>
          </div>

          <div
            className="row "
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            <JobCategorie1 />
          </div>
        </div>
      </section>

      <section className="job-section">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>Featured Jobs</h2>
            <div className="text">
              Know your worth and find the job that qualify your life
            </div>
          </div>

          <div className="row " data-aos="fade-up">
            <JobFeatured1 />
          </div>

          <div className="btn-box">
            <Link to="/job-list-v1" className="theme-btn btn-style-one bg-blue">
              <span className="btn-title">Load More Listing</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="testimonial-section">
        <div className="container-fluid">
          <div className="sec-title text-center">
            <h2>Testimonials From Our Customers</h2>
            <div className="text">
              Lorem ipsum dolor sit amet elit, sed do eiusmod tempor
            </div>
          </div>
        </div>
        <div className="carousel-outer" data-aos="fade-up">
          <div className="testimonial-carousel gap-x25 center-item-active slick-list-visible">
            <Testimonial />
          </div>
        </div>
      </section>

      <section className="clients-section">
        <div className="sponsors-outer" data-aos="fade">
          <ul className="sponsors-carousel">
            <Partner />
          </ul>
        </div>
      </section>

      <section className="about-section">
        <div className="auto-container">
          <div className="row">
            <About />
          </div>

          <div className="fun-fact-section">
            <div className="row">
              <Funfact />
            </div>
          </div>
        </div>
      </section>

      <section className="news-section">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>Recent News Articles</h2>
            <div className="text">
              Fresh job related news content posted each day.
            </div>
          </div>
          <div className="row" data-aos="fade-up">
            <Blog />
          </div>
        </div>
      </section>

      <section className="app-section">
        <div className="auto-container">
          <AppSection />
        </div>
      </section>

      <CallToAction />

      <FooterDefault /> */}

      {/* new */}

      <div className="header" style={{backgroundColor:" #4C3957"}}>
        <div className="auto-container">
          <div className="header-menu">
            <div className="header-logo">
              <img src={logo} />
              <div className="main-menu ml-10 font-medium text-white">
                <ul>
                  <li>
                    <Link href="">Home</Link>
                  </li>
                  <li>
                    <Link href="">Jobs</Link>
                  </li>
                  <li>
                    <Link href="">Products</Link>
                  </li>
                  <li>
                    <Link href="">Hiring Advice</Link>
                  </li>
                  <li>
                    <Link href="">Market Insights</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="side-menu flex gap-3">
              {userToken ? (
                <button
                  className="bg-gray-500 duration-500"
                  title="logout"
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  <IoLogOutOutline size={24} className="" />
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
              {/* <a href="">Sign in</a>
              <a href="">Register</a> */}
              <button
                type="button"
                className="register-btn"
                onClick={() => {
                  handleCheck("job-post");
                }}
              >
                Create a job ad
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="banner">
        <div className="auto-container">
          <div className="banner-text">
            <div className="b-text">
              <div className="b-head">
                <p>Abrodium, your personal HR partner</p>
                <h2 className="font-bold text-[28px]  mt-4">
                  Signup to AI-Enabled platform to
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
                <h1>
                  {/* <div className="typing-demo font-bold">
                    {" "}
                    Hire Talent/Post Jobs/Send Skill Test/Video JD
                  </div> */}

                  <h2></h2>
                </h1>
                <div className="b-para">
                  <p>
                    Abrodium is the UK’s premier AI-driven security services
                    job portal. Post your job listings for free and connect with
                    top candidates across security domains such as
                    cybersecurity, physical security, security management, data
                    protection, and more.
                  </p>
                </div>
              </div>
              <div className="banner-icon-txt">
                <div className="icon-txt">
                  <i className="fa-regular fa-building"></i>
                  <div className="txt">
                    <h2 className="font-bold">50+ organizations</h2>
                    <p>
                      Choose to use our AI-Enabled services for smoother HR
                      processes.
                    </p>
                  </div>
                </div>
                <div className="icon-txt">
                  <i className="fa-solid fa-user-group"></i>
                  <div className="txt">
                    <h2 className="font-bold">Huge number</h2>
                    <p>Of Jobseeker already choosing to use our services.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="">
                {/* <form method="" action="">
                  <div className="form-section">
                    <h2 className="font-bold">Get started for Free</h2>
                    <div className="form-group1">
                      <label>Email id</label>
                      <input
                        type="email"
                        name=""
                        placeholder="ex.johnsmith@gmail.com"
                      />
                    </div>
                    <div className="form-group1">
                      <div className="pass-head">
                        <label>Password</label>
                        <p>Forgot Password?</p>
                      </div>
                      <input
                        type="password"
                        name=""
                        placeholder="password here"
                      />{" "}
                      <span>
                        <i className="fa-solid fa-lock"></i>
                      </span>
                    </div>
                    <div className="fomr-btn">
                      <button type="button">Login</button>
                    </div>
                  </div>
                </form> */}
                {isLogin ? (
                  <Login setIsLogin={() => setIsLogin(false)} />
                ) : (
                  <ResetPassword setIsLogin={() => setIsLogin(true)} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="people">
        <div className="auto-container">
          <div className="people-card">
            <div className="card-one  hover:shadow-xl" data-aos="fade">
              <img src="img/people-1.webp" />
              <h2>UK’s one of the most trusted Employment site</h2>
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
              Spot new Hire with our easy to use platform <br /> instead of
              “Hiring is now simple”
            </h2>
            <div className="step-one">
              <div className="step-text">
                <i className="fa-solid fa-1 "></i>
                <h3 className="my-3">
                  Gain access to top-tier, AI-verified talent through
                  Abrodium.
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
              <h2>Physical Security</h2>
            </div>
            <div className="box-one py-4">
              <i className="fa-solid fa-user-lock"></i>
              <h2>Security Management</h2>
            </div>
            <div className="box-one py-4">
              <i className="fa-solid fa-eye"></i>
              <h2>Surveillance and Monitoring</h2>
            </div>
            <div className="box-one py-4">
              <i className="fa-solid fa-tower-broadcast"></i>
              <h2>Emergency and Incident Response</h2>
            </div>
            <div className="box-one py-4">
              <i className="fa-solid fa-bullhorn"></i>
              <h2>Security Training and Awareness</h2>
            </div>
            <div className="box-one py-4">
              <i className="fa-solid fa-masks-theater"></i>
              <h2>Intelligence and Threat Analysis</h2>
            </div>
            <div className="box-one py-4">
              <i className="fa-solid fa-business-time"></i>
              <h2>Security Sales and Business Development</h2>
            </div>
            <div className="box-one py-4">
              <i className="fa-solid fa-plane-lock"></i>
              <h2>Maritime and Aviation Security</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="category">
        <div className="auto-container">
          <h2>Why Abrodium for Employers</h2>
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
                        Abrodium utilizes advanced AI algorithms to match your
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
                        Posting a job on Abrodium is fast and easy. With a
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
                        All candidates on Abrodium undergo rigorous AI-powered
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
                        Abrodium’s AI tools automate the initial screening
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
                        make arranging interviews a breeze. Abrodium syncs
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
                        Abrodium understands the unique requirements of
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
                        Abrodium provides detailed analytics and reports to
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
                        With Abrodium, you can post jobs and access top-tier
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
                        process, Abrodium’s customer support is just a call or
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
                    <a href="">Why Abrodium?</a>
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
                    <a href="">Abrodium Global</a>
                  </li>
                  <li>
                    <a href="">Abrodium Screening</a>
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
