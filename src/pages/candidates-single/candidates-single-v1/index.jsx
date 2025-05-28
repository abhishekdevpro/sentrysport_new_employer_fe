
import candidates from "@/data/candidates";
import candidateResume from "@/data/candidateResume";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader from "@/components/header/DefaulHeader";
import MobileMenu from "@/components/header/MobileMenu";
import Contact from "@/components/candidates-single-pages/shared-components/Contact";
import GalleryBox from "@/components/candidates-single-pages/shared-components/GalleryBox";
import Social from "@/components/candidates-single-pages/social/Social";
import JobSkills from "@/components/candidates-single-pages/shared-components/JobSkills";
import AboutVideo from "@/components/candidates-single-pages/shared-components/AboutVideo";
import {useParams } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Candidate Single Dyanmic V1 || Abroadium - Job Borad ReactJs Template",
  description: "Abroadium - Job Borad ReactJs Template",
};

const CandidateSingleDynamicV1 = () => {
  let params = useParams();
  const id = params.id;
  const candidate = candidates.find((item) => item.id == id) || candidate[0];

  const [audioSrc] = useState("https://www.example.com/your-audio-file.mp3"); // Pre-uploaded audio file URL
  const [videoSrc] = useState("https://www.example.com/your-video-file.mp4"); // Pre-uploaded video file URL
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);

  const audioRef = useRef(null);

  // Format time in minutes:seconds
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  // Play or pause the audio
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Update time as the audio plays
  const updateCurrentTime = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // Update duration once audio metadata is loaded
  const onLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  // Change playback speed
  const handleSpeedChange = (event) => {
    const newSpeed = parseFloat(event.target.value);
    setSpeed(newSpeed);
    audioRef.current.playbackRate = newSpeed;
  };

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
      <section className="candidate-detail-section">
        <div className="upper-box">
          <div className="auto-container">
            <div className="candidate-block-five">
              <div className="inner-box">
                <div className="content">
                  <figure className="image">
                    <img
                     
                      src={candidate?.avatar}
                      alt="avatar"
                    />
                  </figure>
                  <h4 className="name">{candidate?.name}</h4>

                  <ul className="candidate-info">
                    <li className="designation">{candidate?.designation}</li>
                    <li>
                      <span className="icon flaticon-map-locator"></span>
                      {candidate?.location}
                    </li>
                    <li>
                      <span className="icon flaticon-money"></span> $
                      {candidate?.hourlyRate} / hour
                    </li>
                    <li>
                      <span className="icon flaticon-clock"></span> Member
                      Since,Aug 19, 2020
                    </li>
                  </ul>

                  <ul className="post-tags">
                    {candidate?.tags?.map((val, i) => (
                      <li key={i}>{val}</li>
                    ))}
                  </ul>
                </div>

                <div className="btn-box">
                 
                  <a
                    className="theme-btn btn-style-one ms-2"
                    href="/images/sample.pdf"
                    download
                  >
                    Download CV
                  </a>
                  <button className="bookmark-btn">
                    <i className="flaticon-bookmark"></i>
                  </button>
                </div>
                
              </div>
              
            </div>
            {/*  <!-- Candidate block Five --> */}
          </div>
        </div>
        {/* <!-- Upper Box --> */}
        <div className="flex justify-center  mx-20">
      {/* Audio Section */}
      <div className="bg-gray-100 p-2 rounded-lg m-2 ms-4 shadow-md w-full  lg:w-4/6">
        <h2 className="text-lg mb-2">Audio</h2>
        <audio
          ref={audioRef}
          src={audioSrc}
          onTimeUpdate={updateCurrentTime}
          onLoadedMetadata={onLoadedMetadata}
          className="hidden"
        ></audio>

        {/* Play/Pause button */}
        <button onClick={togglePlayPause} className="mr-4">
          {isPlaying ? <span>⏸</span> : <span>▶️</span>}
        </button>

        {/* Progress bar */}
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={(e) => (audioRef.current.currentTime = e.target.value)}
          className="w-3/4 mx-2"
        />

        {/* Current time and duration */}
        <span>{formatTime(currentTime)}</span>
        <span className="mx-2">/</span>
        <span>{formatTime(duration)}</span>

        {/* Playback speed control */}
        <select
          value={speed}
          onChange={handleSpeedChange}
          className="ml-4 border p-1 rounded-md"
        >
          <option value="0.5">0.5x</option>
          <option value="1">1x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </select>

        {/* Audio Description */}
        <div className="mt-4 bg-blue-100 p-2 rounded-lg">
          <p>
            The contract principal UX designer will help shape the user experience
            for Linktree's newest social commerce product. You'll lead the design
            process from research to high-fidelity prototypes and work closely with
            product engineering teams to create a seamless, engaging user experience.
          </p>
        </div>
      </div>

      {/* Video Section */}
      <div className="bg-gray-100 p-2 rounded-lg shadow-md w-full h-3/6 m-2 lg:w-4/12">
       
        <video
          controls
          src={videoSrc}
          className="w-full rounded-lg "
        ></video>

        {/* Video Description */}
        <div className="mt-4 bg-blue-100 p-2 mrounded-lg">
          <p>
            This is a demo video for the new product launch showcasing how the
            user experience is transformed through our new UX design.
          </p>
        </div>
      </div>
    </div>
        <div className="candidate-detail-outer">
        
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <div className="job-detail">
                  <div className="video-outer">
                    <h4>About Us</h4>
                    {/*  <AboutVideo /> */}
                  </div>
                 
                  <p>
                    Hello my name is Nicole Wells and web developer from
                    Portland. In pharetra orci dignissim, blandit mi semper,
                    ultricies diam. Suspendisse malesuada suscipit nunc non
                    volutpat. Sed porta nulla id orci laoreet tempor non
                    consequat enim. Sed vitae aliquam velit. Aliquam ante erat,
                    blandit at pretium et, accumsan ac est. Integer vehicula
                    rhoncus molestie. Morbi ornare ipsum sed sem condimentum, et
                    pulvinar tortor luctus. Suspendisse condimentum lorem ut
                    elementum aliquam.
                  </p>
                  <p>
                    Mauris nec erat ut libero vulputate pulvinar. Aliquam ante
                    erat, blandit at pretium et, accumsan ac est. Integer
                    vehicula rhoncus molestie. Morbi ornare ipsum sed sem
                    condimentum, et pulvinar tortor luctus. Suspendisse
                    condimentum lorem ut elementum aliquam. Mauris nec erat ut
                    libero vulputate pulvinar.
                  </p>

                  {/* <!-- Portfolio --> */}
                  <div className="portfolio-outer">
                    <div className="row border rounded-lg bg-blue-100 p-2">
                      <GalleryBox />
                    </div>
                  </div>

                  {/* <!-- Candidate Resume Start --> */}
                  {candidateResume.map((resume) => (
                    <div
                      className={`resume-outer ${resume.themeColor}`}
                      key={resume.id}
                    >
                      <div className="upper-title">
                        <h4>{resume?.title}</h4>
                      </div>

                      {/* <!-- Start Resume BLock --> */}
                      {resume?.blockList?.map((item) => (
                        <div className="resume-block" key={item.id}>
                          <div className="inner">
                            <span className="name">{item.meta}</span>
                            <div className="title-box">
                              <div className="info-box">
                                <h3>{item.name}</h3>
                                <span>{item.industry}</span>
                              </div>
                              <div className="edit-box">
                                <span className="year">{item.year}</span>
                              </div>
                            </div>
                            <div className="text">{item.text}</div>
                          </div>
                        </div>
                      ))}

                      {/* <!-- End Resume BLock --> */}
                    </div>
                  ))}
                  {/* <!-- Candidate Resume End --> */}
                </div>
              </div>
              {/* End .content-column */}

              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="sidebar-widget">
                    <div className="widget-content">
                      <ul className="job-overview">
                        <li>
                          <i className="icon icon-calendar"></i>
                          <h5>Experience:</h5>
                          <span>0-2 Years</span>
                        </li>

                        <li>
                          <i className="icon icon-expiry"></i>
                          <h5>Age:</h5>
                          <span>28-33 Years</span>
                        </li>

                        <li>
                          <i className="icon icon-rate"></i>
                          <h5>Current Salary:</h5>
                          <span>11K - 15K</span>
                        </li>

                        <li>
                          <i className="icon icon-salary"></i>
                          <h5>Expected Salary:</h5>
                          <span>26K - 30K</span>
                        </li>

                        <li>
                          <i className="icon icon-user-2"></i>
                          <h5>Gender:</h5>
                          <span>Female</span>
                        </li>

                        <li>
                          <i className="icon icon-language"></i>
                          <h5>Language:</h5>
                          <span>English, German, Spanish</span>
                        </li>

                        <li>
                          <i className="icon icon-degree"></i>
                          <h5>Education Level:</h5>
                          <span>Master Degree</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* End .sidebar-widget conadidate overview */}

                  <div className="sidebar-widget social-media-widget">
                    <h4 className="widget-title">Social media</h4>
                    <div className="widget-content">
                      <div className="social-links">
                        <Social />
                      </div>
                    </div>
                  </div>
                  {/* End .sidebar-widget social-media-widget */}

                  <div className="sidebar-widget">
                    <h4 className="widget-title">Professional Skills</h4>
                    <div className="widget-content">
                      <ul className="job-skills">
                        <JobSkills />
                      </ul>
                    </div>
                  </div>
                  {/* End .sidebar-widget skill widget */}

                  <div className="sidebar-widget contact-widget">
                    <h4 className="widget-title">Connect</h4>
                    <div className="widget-content">
                      <div className="default-form">
                       {/* <Contact /> */}
                        <div className="col-lg-12 col-md-12 col-sm-12 form-group mb-0">
          <button
            className="theme-btn btn-style-one"
            type="submit"
            name="submit-form"
          >
            Send Message
          </button>
        </div>
                      </div>
                    </div>
                  </div>
                  {/* End .sidebar-widget contact-widget */}
                </aside>
                {/* End .sidebar */}
              </div>
              {/* End .sidebar-column */}
            </div>
          </div>
        </div>
        {/* <!-- job-detail-outer--> */}
      </section>
      {/* <!-- End Job Detail Section --> */}

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default CandidateSingleDynamicV1
