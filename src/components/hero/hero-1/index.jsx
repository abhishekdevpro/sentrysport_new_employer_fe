import { useSelector } from "react-redux";
import SearchForm from "../../common/job-search/SearchForm";
import ImageBox from "./ImageBox";
import PopularSearch from "../PopularSearch";
import Login from "@/components/auth/Login";
import ResetPassword from "@/components/auth/ResetPassword";
import { useState } from "react";

import { Constant } from "@/utils/constant/constant";

const index = () => {
  const { userToken } = useSelector((state) => state.auth);
  const [isLogin, setIsLogin] = useState(true);
  console.log("token", userToken);

  return (
    <section className="banner-section">
      <div className="auto-container">
        <div className="row">
          <div className="content-column col-lg-7 col-md-12 col-sm-12">
            <div
              className="inner-column"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="title-box">
                <h3>
                  There Are <span className=" text-blue-800">93,178</span>{" "}
                  Postings Here
                  <br /> For you!
                </h3>
                <div className="text">
                  Find Jobs, Employment & Career Opportunities
                </div>
              </div>

              {/* <!-- Job Search Form --> */}
              <div className="job-search-form">
                <SearchForm />
              </div>
              {/* <!-- Job Search Form --> */}

              {/* <!-- Popular Search --> */}
              <PopularSearch />
              {/* <!-- End Popular Search --> */}
            </div>
          </div>
          {/* End .col */}

          <div
            className={
              userToken != null
                ? "image-column col-lg-5 col-md-12"
                : "z-0 col-lg-5 col-md-12 flex items-center lg:items-start justify-center"
            }
          >
            {userToken == null ? (
              <div className="pb-5 lg:pt-[150px]">
                {isLogin ? (
                  <Login setIsLogin={() => setIsLogin(false)} />
                ) : (
                  <ResetPassword setIsLogin={() => setIsLogin(true)} />
                )}
              </div>
            ) : (
              <ImageBox />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default index;
