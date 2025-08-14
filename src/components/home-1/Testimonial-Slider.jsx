import React from "react";
import Slider from "react-slick";

const TestimonialSlider = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const testimonials = [
    {
      title: "AI-Driven Talent Matching",
      content:
        "Sentryspot utilizes advanced AI algorithms to match your job postings with the most relevant candidates. Our AI system evaluates skills, experience, and job fit to ensure you connect with top-quality talent quickly and efficiently.",
      image: "img/test-1.webp",
    },
    {
      title: "Streamlined Job Posting",
      content:
        "Posting a job on Sentryspot is fast and easy. With a user-friendly interface, you can create and publish job listings in minutes. Our platform ensures your job openings are visible to a broad and diverse pool of candidates in the security sector.",
      image: "img/test-2.webp",
    },
    {
      title: "Verified Candidates",
      content:
        "All candidates on Sentryspot undergo rigorous AI-powered skill verification, so you can be confident that you're considering only the best-qualified professionals. This saves you time and effort in screening, as we provide a shortlist of pre-vetted candidates.",
      image: "img/test-3.webp",
    },
    {
      title: "Efficient Screening Process",
      content:
        "Sentryspot's AI tools automate the initial screening process, filtering candidates based on your specific criteria. This reduces the workload for your HR team, allowing them to focus on more critical tasks and making the recruitment process more efficient.",
      image: "img/test-4.webp",
    },
    {
      title: "Seamless Interview Scheduling",
      content:
        "Our platform offers integrated scheduling tools that make arranging interviews a breeze. Sentryspot syncs with your calendar, allowing you to easily coordinate interviews with candidates, ensuring a smooth and organized recruitment process.",
      image: "img/test-5.webp",
    },
    {
      title: "Specialized Security Focus",
      content:
        "As a platform dedicated to the security industry, Sentryspot understands the unique requirements of security roles. Whether you're hiring for cybersecurity, physical security, or security management, we provide access to a specialized talent pool tailored to your needs.",
      image: "img/test-6.webp",
    },
    {
      title: "Comprehensive Analytics and Reporting",
      content:
        "Sentryspot provides detailed analytics and reports to help you track the success of your job postings, understand candidate engagement, and optimize your hiring strategy. This data-driven approach ensures you make informed decisions at every stage of the hiring process.",
      image: "img/test-7.webp",
    },
    {
      title: "Cost-Effective Recruitment",
      content:
        "With Sentryspot, you can post jobs and access top-tier talent without breaking the bank. Our platform offers competitive pricing, ensuring you get maximum value for your recruitment budget.",
      image: "img/test-8.webp",
    },
    {
      title: "Exceptional Support",
      content:
        "Our dedicated support team is always ready to assist you. Whether you need help with posting a job, navigating the platform, or optimizing your hiring process, Sentryspot's customer support is just a call or click away.",
      image: "img/test-9.webp",
    },
  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto ">
        <h2 className="app-text-h1 text-center mb-12">
          Why Sentryspot for Employers
        </h2>

        <div className="testimonials">
          <Slider {...sliderSettings} className="testimonial-slider">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="px-4">
                <div className="app-light-bg rounded-lg py-6 px-4 h-[450px] flex flex-col justify-between transition-transform duration-300 hover:scale-105">
                  <div className="flex flex-col items-center flex-grow">
                    <div className="w-24 h-24 mb-2 overflow-hidden rounded-full">
                      <img
                        src={testimonial.image}
                        alt={testimonial.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <h4 className="app-text-h2 mb-2">{testimonial.title}</h4>
                      <p className="app-text-p">{testimonial.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
