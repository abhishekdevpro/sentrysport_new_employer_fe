import { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Constant } from "@/utils/constant/constant";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompanyAbout = () => {
  const [images, setImages] = useState([]);
  const [aboutData, setAboutData] = useState({
    title: "",
    about: "",
  });

  const token = localStorage.getItem(Constant.USER_TOKEN);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.sentryspot.co.uk/api/employeer/company", {
          headers: { Authorization: token }
        });
        const data = response.data?.data || {};
        setAboutData({
          title: data.title || "",
          about: data.about || "",
        });
      } catch (error) {
        toast.error("Error fetching company about data");
      }
    };

    fetchData();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAboutData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && images.length < 3) {
      setImages((prev) => [...prev, file]);
    } else if (images.length >= 3) {
      toast.warning("You can only upload up to 3 images.");
    }
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    
    try {
      await axios.patch(
        "https://api.sentryspot.co.uk/api/employeer/company-about",
        aboutData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      toast.success("Company about section updated successfully");
    } catch (error) {
      toast.error("Error updating company about section");
    }
  };

  const SectionTitle = ({ children }) => (
    <h4 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">{children}</h4>
  );

  return (
    <form className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg" onSubmit={handleSave}>
      <SectionTitle>About Company</SectionTitle>
      <div className="space-y-6">
        {/* Company Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Title
          </label>
          <input
            type="text"
            name="title"
            value={aboutData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Company title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <ReactQuill
            theme="snow"
            value={aboutData.about}
            onChange={(value) => setAboutData((prev) => ({ ...prev, about: value }))}
            className="h-48 mb-12"
          />
        </div>

        {/* Image Uploader */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Images (Max: 3)
          </label>
          <div className="flex items-center space-x-4">
            {images.map((image, index) => (
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
          {images.length < 3 && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-2"
            />
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
          >
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
};

export default CompanyAbout;