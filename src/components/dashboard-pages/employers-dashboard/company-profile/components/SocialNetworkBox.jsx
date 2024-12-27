
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2 } from 'lucide-react';
import LogoCoverUploader from "./LogoCoverUploader";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Constant } from "@/utils/constant/constant";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WatchWhatWeSaySection from "./WTS";
import TeamMemberManager from "./Teams";

const SocialNetworkBox = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [companyData, setCompanyData] = useState({
    company_name: "",
    summery: "",
    title: "",
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
    join_us: "",
    media_content: [],
    inside_culture_images: [],
    inside_workplace_images: [],
    inside_people_images: [],
  });

  const [makesUsUnique, setMakesUsUnique] = useState([]);
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const BASE_IMAGE_URL = "https://api.sentryspot.co.uk"

  const [insideCultureImages, setInsideCultureImages] = useState([]);
  const [insideWorkplaceImages, setInsideWorkplaceImages] = useState([]);
  const [insidePeopleImages, setInsidePeopleImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedImages.length > 3) {
      toast.error("You can only upload up to 3 images");
      return;
    }
    setSelectedImages(prev => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addMediaContent = () => {
    setCompanyData(prev => ({
      ...prev,
      media_content: [
        ...prev.media_content,
        {
          id: Date.now(),
          type: 'video',
          file: null,
          description: '',
        }
      ]
    }));
  };

  const removeMediaContent = (id) => {
    setCompanyData(prev => ({
      ...prev,
      media_content: prev.media_content.filter(item => item.id !== id)
    }));
  };

  const handleMediaTypeChange = (id, type) => {
    setCompanyData(prev => ({
      ...prev,
      media_content: prev.media_content.map(item =>
        item.id === id ? { ...item, type } : item
      )
    }));
  };

  const handleMediaDescriptionChange = (id, description) => {
    setCompanyData(prev => ({
      ...prev,
      media_content: prev.media_content.map(item =>
        item.id === id ? { ...item, description } : item
      )
    }));
  };

  const handleInsideImageUpload = (e, type) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      toast.error(`You can only upload up to 3 ${type} images`);
      return;
    }
    switch (type) {
      case 'culture':
        setInsideCultureImages(files);
        break;
      case 'workplace':
        setInsideWorkplaceImages(files);
        break;
      case 'people':
        setInsidePeopleImages(files);
        break;
      default:
        break;
    }
  };

  const removeInsideImage = (index, type) => {
    switch (type) {
      case 'culture':
        setInsideCultureImages(prev => prev.filter((_, i) => i !== index));
        break;
      case 'workplace':
        setInsideWorkplaceImages(prev => prev.filter((_, i) => i !== index));
        break;
      case 'people':
        setInsidePeopleImages(prev => prev.filter((_, i) => i !== index));
        break;
      default:
        break;
    }
  };

  const handleInsideImagesSave = async (type) => {
    const formData = new FormData();
    let images, endpoint, uploadKey;

    switch (type) {
      case 'culture':
        images = insideCultureImages;
        endpoint = '/company-inside-culture';
        uploadKey = 'inside_culture_images_upload';
        break;
      case 'workplace':
        images = insideWorkplaceImages;
        endpoint = '/company-inside-workplace';
        uploadKey = 'inside_workplace_images_upload';
        break;
      case 'people':
        images = insidePeopleImages;
        endpoint = '/company-inside-people';
        uploadKey = 'inside_people_images_upload';
        break;
      default:
        return;
    }

    images.forEach((image, index) => {
      formData.append(`${uploadKey}`, image);
      formData.append("image_indexes", index.toString());
    });

    try {
      const response = await axios.patch(
        `https://api.sentryspot.co.uk/api/employeer${endpoint}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        toast.success(`${type} images updated successfully!`);
      } else {
        toast.error(`Failed to update ${type} images. Please try again.`);
      }
    } catch (error) {
      console.error(`Error updating ${type} images:`, error);
      toast.error("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.sentryspot.co.uk/api/employeer/company", {
          headers: { Authorization: token }
        });
        const data = response.data?.data || {};
        setCompanyData(prev => ({
          ...prev,
          ...data,
        }));
        setMakesUsUnique([
          {
            title: "Health Insurance",
            key: "health_insurance",
            toogle: data.health_insurance || false,
            value: data.health_insurance_value || "",
          },
          {
            title: "24 hour Wellness Center",
            key: "wellness_center",
            toogle: data.wellness_center || false,
            value: data.wellness_center_value || "",
          },
          {
            title: "Cafeteria",
            key: "cafeteria",
            toogle: data.cafeteria || false,
            value: data.cafeteria_value || "",
          },
          {
            title: "Maternity and Paternity Leave",
            key: "maternity_leave",
            toogle: data.maternity_leave || false,
            value: data.maternity_leave_value || "",
          },
          {
            title: "Recreational Area",
            key: "recreational_area",
            toogle: data.recreational_area || false,
            value: data.recreational_area_value || "",
          },
          {
            title: "Life Insurance",
            key: "life_insurance",
            toogle: data.life_insurance || false,
            value: data.life_insurance_value || "",
          },
          {
            title: "Personal Accident Insurance",
            key: "personal_accident_insurance",
            toogle: data.personal_accident_insurance || false,
            value: data.personal_accident_insurance_value || "",
          },
        ]);
        setInsideCultureImages(data.inside_culture_images || []);
        setInsideWorkplaceImages(data.inside_workplace_images || []);
        setInsidePeopleImages(data.inside_people_images || []);
      } catch (error) {
        toast.error("Error fetching data");
      }
    };

    fetchData();
  }, [token]);

  const handleAboutSave = async (event) => {
    event.preventDefault();
    
    if (selectedImages.length > 3) {
      toast.error("Please ensure only 3 images are selected.");
      return;
    }

    const formData = new FormData();
    formData.append("title", companyData.title);
    formData.append("about", companyData.about);
    formData.append("summery", companyData.summery);
    selectedImages.forEach((image) => {
      formData.append("about_images_upload", image);
    });

    try {
      const response = await axios.patch(
        "https://api.sentryspot.co.uk/api/employeer/company-about",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        toast.success("About section updated successfully!");
      } else {
        toast.error("Failed to update about section. Please try again.");
      }
    } catch (error) {
      console.error("Error updating about section:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    
    const dataToUpdate = {
      ...companyData,
      ...makesUsUnique.reduce((acc, item) => ({
        ...acc,
        [item.key]: item.toogle,
        [`${item.key}_value`]: item.value,
      }), {}),
    };

    try {
      await axios.put("https://api.sentryspot.co.uk/api/employeer/company", dataToUpdate, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      toast.success("Company data updated successfully");
    } catch (error) {
      toast.error("Error updating company data");
    }
  };

  const SectionTitle = ({ children }) => (
    <h4 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">{children}</h4>
  );

  const FormSection = ({ children, className = "" }) => (
    <div className={`space-y-6 mb-8 ${className}`}>{children}</div>
  );

  return (
    <form className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <ToastContainer />
      
      {/* Basic Info Section */}
      <FormSection>
        <SectionTitle>Basic Information</SectionTitle>
        <div className="grid gap-6">
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input
              type="text"
              name="company_name"
              value={companyData.company_name || ""}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter company name"
            />
          </div>
        </div>
      </FormSection>

      {/* About Section */}
      <FormSection>
        <SectionTitle>About Company</SectionTitle>
        <div className="space-y-6  flex flex-col justify-between gap-4 md:gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 ">
              Company Title
            </label>
            <input
              type="text"
              name="title"
              value={companyData.title || ""}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Company title"
            />
          </div>
          <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
          <ReactQuill
            theme="snow"
            value={companyData.summery || ""}
            onChange={(value) => setCompanyData(prev => ({...prev, summery: value}))}
            className="h-48 mb-12"
          />
        </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <ReactQuill
              theme="snow"
              value={companyData.about || ""}
              onChange={(value) =>
                setCompanyData((prev) => ({ ...prev, about: value }))
              }
              className="h-48 mb-12"
            />
          </div>
         
          <div className="">
            <label className="block text-sm font-medium text-gray-700">
              Upload Images (Max: 3)
            </label>
            <div className="flex items-center ">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative w-24 h-24">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Uploaded"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            {selectedImages.length < 3 && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-4"
                multiple
              />
            )}
          </div>
          <div className="flex justify-start">
            <button
              type="button"
              onClick={handleAboutSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Save About Section
            </button>
          </div>
        </div>
      </FormSection>

      {/* Inside Company Images Section */}
      <FormSection>
        <SectionTitle>Inside Company Images</SectionTitle>

        {/* Inside Culture Images */}
        <div className="mb-8">
          <h5 className="text-lg font-medium text-gray-900 mb-4">Inside Culture Images</h5>
          <div className="flex items-center space-x-4 mb-4">
            {insideCultureImages.map((image, index) => (
              <div key={index} className="relative w-24 h-24">
                <img
                  src={typeof image === 'string' ? `${BASE_IMAGE_URL}${image}` : URL.createObjectURL(image)}
                  alt="Inside Culture"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeInsideImage(index, 'culture')}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          {insideCultureImages.length < 3 && (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleInsideImageUpload(e, 'culture')}
              className="mb-4"
              multiple
            />
          )}
          <button
            type="button"
            onClick={() => handleInsideImagesSave('culture')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Save Culture Images
          </button>
        </div>

        {/* Inside Workplace Images */}
        <div className="mb-8">
          <h5 className="text-lg font-medium text-gray-900 mb-4">Inside Workplace Images</h5>
          <div className="flex items-center space-x-4 mb-4">
            {insideWorkplaceImages.map((image, index) => (
              <div key={index} className="relative w-24 h-24">
                <img
                  src={typeof image === 'string' ? `${BASE_IMAGE_URL}${image}` : URL.createObjectURL(image)}
                  alt="Inside Workplace"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeInsideImage(index, 'workplace')}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          {insideWorkplaceImages.length < 3 && (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleInsideImageUpload(e, 'workplace')}
              className="mb-4"
              multiple
            />
          )}
          <button
            type="button"
            onClick={() => handleInsideImagesSave('workplace')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Save Workplace Images
          </button>
        </div>

        {/* Inside People Images */}
        <div className="mb-8">
          <h5 className="text-lg font-medium text-gray-900 mb-4">Inside People Images</h5>
          <div className="flex items-center space-x-4 mb-4">
            {insidePeopleImages.map((image, index) => (
              <div key={index} className="relative w-24 h-24">
                <img
                  src={typeof image === 'string' ? `${BASE_IMAGE_URL}${image}` : URL.createObjectURL(image)}
                  alt="Inside People"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeInsideImage(index, 'people')}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          {insidePeopleImages.length < 3 && (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleInsideImageUpload(e, 'people')}
              className="mb-4"
              multiple
            />
          )}
          <button
            type="button"
            onClick={() => handleInsideImagesSave('people')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Save People Images
          </button>
        </div>
      </FormSection>

      {/* Watch What We Have to Say Section */}
      {/* <FormSection>
        <SectionTitle>Watch What We Have to Say</SectionTitle>
        <div className="space-y-8">
          {companyData.media_content.map((content, index) => (
            <div key={content.id} className="p-6 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h5 className="text-lg font-medium text-gray-900">Media Content #{index + 1}</h5>
                <button
                  type="button"
                  onClick={() => removeMediaContent(content.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={content.type}
                    onChange={(e) => handleMediaTypeChange(content.id, e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="video">Video</option>
                    <option value="image">Image</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload {content.type === 'video' ? 'Video' : 'Image'}
                  </label>
                  <LogoCoverUploader
                    text={`Add ${content.type === 'video' ? 'Video' : 'Image'}`}
                    accept={content.type === 'video' ? 'video/*' : 'image/*'}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <ReactQuill
                  theme="snow"
                  value={content.description || ""}
                  onChange={(value) => handleMediaDescriptionChange(content.id, value)}
                  className="h-36 mb-12"
                  placeholder="Describe this media content..."
                />
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={addMediaContent}
            className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Media
          </button>
        </div>
      </FormSection> */}
      <WatchWhatWeSaySection />
      <TeamMemberManager />

      {/* What Makes Us Unique Section */}
      <FormSection>
        <SectionTitle>What Makes Us Unique</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {makesUsUnique.map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-gray-700">{item.title}</label>
                <Switch
                  checked={item.toogle}
                  onCheckedChange={(checked) => {
                    setMakesUsUnique(prev =>
                      prev.map((val, i) =>
                        i === index ? { ...val, toogle: checked } : val
                      )
                    );
                  }}
                  className="data-[state=checked]:bg-blue-600"
                />
              </div>
              {item.toogle && (
                <input
                type="text"
                value={item.value}
                onChange={(e) => {
                  setMakesUsUnique(prev =>
                    prev.map((val, i) =>
                      i === index ? { ...val, value: e.target.value } : val
                    )
                  );
                }}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder={`Describe ${item.title}`}
              />
            )}
          </div>
        ))}
      </div>
    </FormSection>

    {/* Join Us Section */}
    <FormSection>
      <SectionTitle>Join Us</SectionTitle>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Career Opportunities</label>
        <ReactQuill
          theme="snow"
          value={companyData.join_us || ""}
          onChange={(value) => setCompanyData(prev => ({...prev, join_us: value}))}
          className="h-48 mb-12"
        />
      </div>
    </FormSection>

    {/* Social Links Section */}
    <FormSection>
      <SectionTitle>Social Media & Website</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
          <input
            type="text"
            name="facebook_link"
            value={companyData.facebook_link || ""}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Facebook profile URL"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
          <input
            type="text"
            name="linkedin_link"
            value={companyData.linkedin_link || ""}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="LinkedIn profile URL"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
          <input
            type="text"
            name="twitter_link"
            value={companyData.twitter_link || ""}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Twitter profile URL"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
          <input
            type="text"
            name="website_link"
            value={companyData.website_link || ""}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Company website URL"
          />
        </div>
      </div>
    </FormSection>

    {/* Submit Button */}
    <div className="mt-8 flex justify-end">
      <button
        type="submit"
        onClick={handleSave}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
      >
        Save Other Changes
      </button>
    </div>
  </form>
);
};

export default SocialNetworkBox;

