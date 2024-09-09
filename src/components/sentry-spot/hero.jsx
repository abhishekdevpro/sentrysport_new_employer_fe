const HeroSection = () => {
  return (
    <section className="call-to-action ">
      <div className="auto-container">
        <div className="flex gap-8 md:gap-16 bg-[#051A49] p-10 rounded-xl ">
          <div className="flex items-center basis-full md:basis-1/2 py-2 md:py-4">
            <div className="sec-title ">
              <h3 className="text-white  text-2xl font-bold">
                Enhance Your Career Prospects with a Abroadium ID Profile
              </h3>
              <div className="text text-white ">
                With a Abroadium ID profile, you'll enjoy a customized job
                search experience and receive job recommendations that match
                your skills, making your job hunt quicker and more efficient.
              </div>
              <a
                href="#"
                className="theme-btn btn-style-one bg-[#E60278]  hover:bg-[#E60278]"
                data-bs-toggle="modal"
                data-bs-target="#loginPopupModal"
              >
                <span className="btn-title">Get Your Abroadium ID now</span>
              </a>
            </div>
          </div>
          {/* End .content-column */}

          <div className=" hidden md:flex basis-1/2 bg-contain bg-no-repeat">
            <img
              src="/images/resource/sentry_spot_Profile.jpg"
              alt="resource"
              className="object-contain "
            />
            {/* <figure className="image">
              <img
                src="/images/resource/sentry_spot_Profile.jpg"
                alt="resource"
              />
            </figure> */}
          </div>
          {/* End .image-column */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
