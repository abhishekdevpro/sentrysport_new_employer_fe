import jobs from "@/data/job-featured";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader from "@/components/header/DefaulHeader2";
import MobileMenu from "@/components/header/MobileMenu";
import CompnayInfo from "@/components/job-single-pages/shared-components/CompanyInfo";
import SocialTwo from "@/components/job-single-pages/social/SocialTwo";
import Contact from "@/components/job-single-pages/shared-components/Contact";
import JobDetailsDescriptions from "@/components/job-single-pages/shared-components/JobDetailsDescriptions";
import RelatedJobs2 from "@/components/job-single-pages/related-jobs/RelatedJobs2";
import JobOverView2 from "@/components/job-single-pages/job-overview/JobOverView2";
import ApplyJobModalContent from "@/components/job-single-pages/shared-components/ApplyJobModalContent";
import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

import MetaComponent from "@/components/common/MetaComponent";
import { useGetPostByIdQuery } from "@/store/slices/service/index";

const metadata = {
  title: "Job Single Dyanmic V3 || Sentryspot - Job Borad ReactJs Template",
  description: "Sentryspot - Job Borad ReactJs Template",
};

const JobSingleDynamicV3 = () => {
  let params = useParams();
  const location = useLocation();
  const { item } = location.state || 2;
  // console.log(item, "job single dynamic");

  const id = params?.id;
  const company = jobs.find((item) => item.id == id) || jobs[0];

  const { isLoading, data, isError, error } = useGetPostByIdQuery(id);
  console.log("jobpostdata", data);
  const JobDetail = data?.data;
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "something went wrong");
    }
  }, [isError]);

  return (
    <>
      <MetaComponent meta={metadata} />
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* <!-- Job Detail Section --> */}
      <section className="job-detail-section">
        <div className="job-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <div className="job-block-outer">
                  <div className="job-block-seven style-two">
                    <div className="inner-box">
                      <div className="content ">
                        <h4 className="capitalize ">{JobDetail?.job_title}</h4>

                        <ul className="job-info">
                          <li>
                            <span className="icon flaticon-briefcase "></span>
                            {company?.company}
                          </li>
                          {/* compnay info */}
                          <li>
                            <span className="icon flaticon-map-locator"></span>
                            {JobDetail?.complete_address}
                          </li>
                          {/* location info */}
                          <li>
                            <span className="icon flaticon-clock-3"></span>{" "}
                            {JobDetail?.time || "8"}
                          </li>
                          {/* time info */}
                          <li>
                            <span className="icon flaticon-money"></span>{" "}
                            {JobDetail?.salary || "$20 -50$"}
                          </li>
                          {/* salary info */}
                        </ul>
                        {/* End .job-info */}

                        <ul className="job-other-info">
                          {company?.jobType?.map((val, i) => (
                            <li key={i} className={`${val.styleClass}`}>
                              {val.type}
                            </li>
                          ))}
                        </ul>
                        {/* End .job-other-info */}
                      </div>
                      {/* End .content */}
                    </div>
                  </div>
                  {/* <!-- Job Block --> */}
                </div>
                {/* <!-- job block outer --> */}
                <div className="job-overview-two">
                  <h4>Job Description</h4>
                  <JobOverView2 />
                </div>
                {/* <!-- job-overview-two --> */}
                {JobDetail?.job_description ? (
                  JobDetail?.job_description
                ) : (
                  <JobDetailsDescriptions />
                )}
                {/* End job-details */}
                <div className="other-options">
                  <div className="social-share">
                    <h5>Share this job</h5>
                    <SocialTwo />
                  </div>
                </div>
                {/* <!-- Other Options --> */}
              </div>
              {/* End .content-column */}

              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  {/* <div className="btn-box">
<a
href="#"
className="theme-btn btn-style-one"
data-bs-toggle="modal"
data-bs-target="#applyJobModal"
>
Apply For Job
</a>
<button className="bookmark-btn">
<i className="flaticon-bookmark"></i>
</button>
</div> */}
                  {/* End apply for job btn */}

                  {/* <!-- Modal --> */}
                  <div
                    className="modal fade"
                    id="applyJobModal"
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                      <div className="apply-modal-content modal-content">
                        <div className="text-center">
                          <h3 className="title">Apply for this job</h3>
                          {/* <button
type="button"
className="closed-modal"
data-bs-dismiss="modal"
aria-label="Close"
></button> */}
                        </div>
                        {/* End modal-header */}

                        <ApplyJobModalContent />
                        {/* End PrivateMessageBox */}
                      </div>
                      {/* End .send-private-message-wrapper */}
                    </div>
                  </div>
                  {/* End .modal */}

                  <div className="sidebar-widget company-widget">
                    <div className="widget-content">
                      <div className="company-title">
                        <div className="company-logo">
                          <img src={company.logo} alt="resource" />
                        </div>
                        <h5 className="company-name">{company.company}</h5>
                        <a href="#" className="profile-link">
                          View company profile
                        </a>
                      </div>
                      {/* End company title */}

                      <CompnayInfo />

                      <div className="btn-box">
                        <a
                          href="#"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="theme-btn btn-style-three"
                        >
                          {company?.link}
                        </a>
                      </div>
                      {/* End btn-box */}
                    </div>
                  </div>
                  {/* End .company-widget */}

                  <div className="sidebar-widget contact-widget">
                    <h4 className="widget-title">Contact Us</h4>
                    <div className="widget-content">
                      <div className="default-form">
                        <Contact />
                      </div>
                      {/* End .default-form */}
                    </div>
                  </div>
                  {/* End contact-widget */}
                </aside>
                {/* End .sidebar */}
              </div>
              {/* End .sidebar-column */}
            </div>
            {/* End .row */}

            <div className="related-jobs">
              <div className="title-box">
                <h3>Related Jobs</h3>
                <div className="text">2020 jobs live - 293 added today.</div>
              </div>
              {/* End title box */}

              <div className="row">
                <RelatedJobs2 />
              </div>
              {/* End .row */}
            </div>
            {/* <!-- Related Jobs --> */}
          </div>
          {/* End auto-container */}
        </div>
        {/* <!-- job-detail-outer--> */}
      </section>
      {/* <!-- End Job Detail Section --> */}

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default JobSingleDynamicV3;
