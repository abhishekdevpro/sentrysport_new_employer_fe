import React from "react";

const StepsSection = () => {
  return (
    <div className="steps">
      <div className="auto-container">
        <div className=" ">
          <h2 className="app-text-h1 !text-blue-900 mb-4">
            Spot new Hire with our easy to use platform
          </h2>
          <div className="step-one app-light-bg rounded-xl mb-4 ">
            <div className="step-text">
              <i className="fa-solid fa-1 "></i>
              <h3 className="my-3">
                Gain access to top-tier, AI-verified talent through Sentryspot.
              </h3>
              <p>
                Post a job in minutes with AI and swiftly connect with the most
                relevant candidates.
              </p>
            </div>
            <div className="step-img ">
              <img src="img/step-one.webp" />
            </div>
          </div>
          <div className="step-one app-light-bg rounded-xl mb-4 ">
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
          <div className="step-one app-light-bg rounded-xl mb-4">
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
  );
};

export default StepsSection;
