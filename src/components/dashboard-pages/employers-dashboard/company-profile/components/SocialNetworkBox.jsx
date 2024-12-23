import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import LogoCoverUploader from "./LogoCoverUploader";
import ReactQuill from "react-quill";
import { Constant } from "@/utils/constant/constant";
import { toast, ToastContainer } from "react-toastify";

const SocialNetworkBox = () => {
  const [companyData, setCompanyData] = useState({
    company_name: "",
    summery: "",
    about: "",
    company_size_id: 1,
    email: "",
    company_type_id: 1,
    tagline: "",
    website_link: "",
    founded_date: "",
    phone: "",
    country_id: 231,
    state_id: 3919,
    city_id: 48132,
    zip_code: "",
    address: "",
    facebook_link: "",
    twitter_link: "",
    google_link: "",
    linkedin_link: "",
    company_industry_id: 1,
    health_insurance: false,
    health_insurance_value: "",
    cafeteria: false,
    cafeteria_value: "",
    recreational_area: false,
    recreational_area_value: "",
    personal_accident_insurance: false,
    personal_accident_insurance_value: "",
    life_insurance: false,
    life_insurance_value: "",
    wellness_center: false,
    wellness_center_value: "",
    maternity_leave: false,
    maternity_leave_value: "",
    join_us: "",
  });

  const [makesUsUnique, setMakesUsUnique] = useState([]);

  const token = localStorage.getItem(Constant.USER_TOKEN);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  useEffect(() => {
    // Fetch existing data from the API
    fetch("https://api.sentryspot.co.uk/api/employeer/company", {
      headers: {
        Authorization: token
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setCompanyData(data?.data);
        setMakesUsUnique([
          {
            title: "Health Insurance",
            key: "health_insurance",
            toogle: data?.data?.health_insurance || false,
            value: data?.data?.health_insurance_value || "",
          },
          {
            title: "24 hour Wellness Center",
            key: "wellness_center",
            toogle: data?.data?.wellness_center || false,
            value: data?.data?.wellness_center_value || "",
          },
          {
            title: "Cafeteria",
            key: "cafeteria",
            toogle: data?.data?.cafeteria || false,
            value: data?.data?.cafeteria_value || "",
          },
          {
            title: "Maternity and Paternity Leave",
            key: "maternity_leave",
            toogle: data?.data?.maternity_leave || false,
            value: data?.data?.maternity_leave_value || "",
          },
          {
            title: "Recreational Area",
            key: "recreational_area",
            toogle: data?.data?.recreational_area || false,
            value: data?.data?.recreational_area_value || "",
          },
          {
            title: "Life Insurance",
            key: "life_insurance",
            toogle: data?.data?.life_insurance || false,
            value: data?.data?.life_insurance_value || "",
          },
          {
            title: "Personal Accident Insurance",
            key: "personal_accident_insurance",
            toogle: data?.data?.personal_accident_insurance || false,
            value: data?.data?.personal_accident_insurance_value || "",
          },
        ]);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, [token]);

  // Handle the form submission
  const handleSave = (event) => {
    event.preventDefault();
  
    // Prepare data for the PUT request
    const dataToUpdate = {
      ...companyData,
      health_insurance: makesUsUnique.find(item => item.key === "health_insurance")?.toogle || false,
      health_insurance_value: makesUsUnique.find(item => item.key === "health_insurance")?.value || "",
      cafeteria: makesUsUnique.find(item => item.key === "cafeteria")?.toogle || false,
      cafeteria_value: makesUsUnique.find(item => item.key === "cafeteria")?.value || "",
      recreational_area: makesUsUnique.find(item => item.key === "recreational_area")?.toogle || false,
      recreational_area_value: makesUsUnique.find(item => item.key === "recreational_area")?.value || "",
      personal_accident_insurance: makesUsUnique.find(item => item.key === "personal_accident_insurance")?.toogle || false,
      personal_accident_insurance_value: makesUsUnique.find(item => item.key === "personal_accident_insurance")?.value || "",
      life_insurance: makesUsUnique.find(item => item.key === "life_insurance")?.toogle || false,
      life_insurance_value: makesUsUnique.find(item => item.key === "life_insurance")?.value || "",
      wellness_center: makesUsUnique.find(item => item.key === "wellness_center")?.toogle || false,
      wellness_center_value: makesUsUnique.find(item => item.key === "wellness_center")?.value || "",
      maternity_leave: makesUsUnique.find(item => item.key === "maternity_leave")?.toogle || false,
      maternity_leave_value: makesUsUnique.find(item => item.key === "maternity_leave")?.value || "",
      company_name:companyData.company_name || "",
      facebook_link: companyData.facebook_link || "",
      twitter_link: companyData.twitter_link || "",
      linkedin_link: companyData.linkedin_link || "",
      join_us: companyData.join_us || "",
      website_link: companyData.website_link || "",
    };
  
    // Make PUT request to update the company data
    fetch("https://api.sentryspot.co.uk/api/employeer/company", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(dataToUpdate),
    })
      .then((response) => response.json())
      .then((result) => {
        toast.success("Data successfully updated", result);
      })
      .catch((error) => {
        toast.error("Error updating data: ", error);
      });
  };

  const handleQuillChange = (value) => {
    setCompanyData(prevData => ({
      ...prevData,
      join_us: value
    }));
  };
  

  return (
    <form className="default-form" onSubmit={handleSave}>
      <div className="row">
<ToastContainer/>
      <div className="form-group col-lg-12   col-md-12">
          <label>Company Name</label>
          <input
            type="text"
            name="facebook_link"
            value={companyData.company_name}
            onChange={handleInputChange}
            placeholder="company_name"
          />
        </div>
      <div className="form-group col-lg-12 col-md-12">
          <label htmlFor="name">main paragraph (summary)</label>
          <ReactQuill
            theme="snow"
            // modules={modules}
           
            placeholder=" Describe the role and responsiblities, skills required for the job and help the candidates understand the role better"
            className="h-36 mb-5 text-lg " 
          />
          {/* {errors.name && (
            <p className="!text-red-500 text-sm">{errors.name.message}</p>
          )} */}
        </div>
           {/* About Company Section */}
        <h4 className="text-2xl text-black capitalize mb-2">
          About Company
        </h4>

        <div className="form-group col-lg-12 col-md-12">
          <label>Section Title</label>
          <input
            type="text"
            name="about_title"
            value={companyData.about_title}
            onChange={handleInputChange}
            placeholder="Enter section title"
            className="mb-4"
          />
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>About Description</label>
          <ReactQuill
            theme="snow"
            value={companyData.about_description}
            onChange={(value) => setCompanyData(prev => ({...prev, about_description: value}))}
            placeholder="Describe your company's story, mission, and values"
            className="h-36 mb-5 text-lg"
          />
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label className="block mb-2">Upload Images (Max 3)</label>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                multiple
                // onChange={handleAboutImagesUpload}
                className="hidden"
                id="about-images-upload"
                // disabled={companyData.about_images.length >= 3}
              />
              <label
                htmlFor="about-images-upload"
                className={`cursor-pointer px-4 py-2 rounded-md  text-white transition-colors`}
              >
                Upload Images
              </label>
              <span className="text-sm text-gray-500">
                {/* {3 - companyData.about_images.length} slots remaining */}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {/* {companyData.about_images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`About ${index + 1}`}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeAboutImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))} */}
               <LogoCoverUploader />
            </div>
          </div>
        </div>

        {/*  */}
        <h4 className="text-2xl text-black capitalize mb-2">
          Info About company
        </h4>

        <LogoCoverUploader />

        <div className="form-group col-lg-12 col-md-12">
          <label htmlFor="name">Info about Company</label>
          <ReactQuill
            theme="snow"
            // modules={modules}
           
            placeholder=" Describe the role and responsiblities, skills required for the job and help the candidates understand the role better"
            className="h-36 mb-5 text-lg " 
          />
          {/* {errors.name && (
            <p className="!text-red-500 text-sm">{errors.name.message}</p>
          )} */}
        </div>
        {/* culter/event */}
        <h4 className="text-2xl text-black capitalize mb-2">
          Info About Event
        </h4>
        <div className="form-group col-lg-12 col-md-12">
          {/* <label htmlFor="name">main paragraph</label> */}
          <ReactQuill
            theme="snow"
            // modules={modules}
           
            placeholder=" Describe the role and responsiblities, skills required for the job and help the candidates understand the role better"
            className="h-36 mb-5 text-lg " 
          />
          {/* {errors.name && (
            <p className="!text-red-500 text-sm">{errors.name.message}</p>
          )} */}
        </div>
        <div className=" flex justify-between form-group col-lg-12 col-md-12">
          {/* <label htmlFor="name">main paragraph</label> */}
          {/* <LogoCoverUploader /> */}
          <div className="form-group col-lg-6 col-md-6">
            <LogoCoverUploader text="Add Video" />
          </div>
          <div className="form-group col-lg-6 col-md-6">
            <LogoCoverUploader />
          </div>
        </div>

        <h4 className="text-2xl text-black capitalize mb-2">Add Your Team</h4>
        <LogoCoverUploader text="upload multiple images" />

        <div className="form-group col-lg-12 col-md-12 ">
        <ReactQuill
            theme="snow"
            // modules={modules}
           
            placeholder=" Describe the role and responsiblities, skills required for the job and help the candidates understand the role better"
            className="h-36 mb-5 text-lg " 
          />
          {/* {errors.name && (
            <p className="!text-red-500 text-sm">{errors.name.message}</p>
          )} */}
        </div>

        <h4 className="text-2xl text-black capitalize mb-2">
          Watch what we have to say
        </h4>
        <div className=" flex justify-between form-group col-lg-12 col-md-12">
          {/* <label htmlFor="name">main paragraph</label> */}
          {/* <LogoCoverUploader /> */}
          <div className="form-group col-lg-6 col-md-6">
            <LogoCoverUploader text="Add Video" />
          </div>
          <div className="form-group col-lg-6 col-md-6">
            <LogoCoverUploader />
          </div>
        </div>
        <div className="form-group col-lg-12 col-md-12 ">
        <ReactQuill
            theme="snow"
            // modules={modules}
           
            placeholder=" Describe the role and responsiblities, skills required for the job and help the candidates understand the role better"
            className="h-36 mb-5 text-lg " 
          />
          {/* {errors.name && (
            <p className="!text-red-500 text-sm">{errors.name.message}</p>
          )} */}
        </div>

   

       



        {/* What Makes Us Unique */}
        <h4 className="text-2xl text-black capitalize mb-2">What Makes Us Unique</h4>
        {makesUsUnique.map((item, index) => (
          <div className="form-group col-lg-6 col-md-12" key={index}>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[15px] font-semibold">{item.title}</label>
              <Switch
                className="rounded-xl data-[state=checked]:bg-[#0292e6]"
                checked={item.toogle}
                onCheckedChange={(e) => {
                  setMakesUsUnique((prev) =>
                    prev.map((val, i) =>
                      i === index ? { ...val, toogle: e } : val
                    )
                  );
                }}
              />
            </div>
            {item.toogle && (
              <input
                type="text"
                value={item.value}
                onChange={(e) => {
                  setMakesUsUnique((prev) =>
                    prev.map((val, i) =>
                      i === index ? { ...val, value: e.target.value } : val
                    )
                  );
                }}
              />
            )}
          </div>
        ))}


<h4 className="text-2xl text-black capitalize mb-2">Join Us</h4>
        <div className="form-group col-lg-12 col-md-12">
          <label htmlFor="name">Added a link to show new opportunity </label>
          <ReactQuill
            theme="snow"
            // modules={modules}
            value={companyData.join_us}
    onChange={handleQuillChange}
            placeholder=" Describe the role and responsiblities, skills required for the job and help the candidates understand the role better"
            className="h-36 mb-5 text-lg " 
          />
          {/* {errors.name && (
            <p className="!text-red-500 text-sm">{errors.name.message}</p>
          )} */}
        </div>

        <h4 className="text-2xl text-black capitalize my-2">
          Footer (Contact)
        </h4>

        {/* Facebook */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Facebook</label>
          <input
            type="text"
            name="facebook_link"
            value={companyData.facebook_link}
            onChange={handleInputChange}
            placeholder="www.facebook.com/your-company"
          />
        </div>

        {/* LinkedIn */}
        <div className="form-group col-lg-6 col-md-12">
          <label>LinkedIn</label>
          <input
            type="text"
            name="linkedin_link"
            value={companyData.linkedin_link}
            onChange={handleInputChange}
            placeholder="www.linkedin.com/company/your-company"
          />
        </div>

        {/* Twitter */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Twitter</label>
          <input
            type="text"
            name="twitter_link"
            value={companyData.twitter_link}
            onChange={handleInputChange}
            placeholder="www.twitter.com/your-company"
          />
        </div>

        <h4 className="text-2xl text-black capitalize my-2">
          Add Website
        </h4>

        {/* Facebook */}
        <div className="form-group col-lg-12 col-md-12">
          
          <input
            type="text"
            name="facebook_link"
            value={companyData.website_link}
            onChange={handleInputChange}
            placeholder="www.facebook.com/your-company"
          />
        </div>
        {/* Submit Button */}
        <div className="form-group col-lg-12 col-md-12">
          <button type="submit" className="theme-btn btn-style-one">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default SocialNetworkBox;
