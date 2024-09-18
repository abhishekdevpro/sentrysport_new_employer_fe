import { useEffect, useState } from "react";
import axios from "axios";
import { Constant } from "@/utils/constant/constant";
import { toast, ToastContainer } from "react-toastify";

const FormInfoBox = () => {
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const baseurl = "https://api.sentryspot.co.uk/api/employeer/";

  const [logImg, setLogImg] = useState(null);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [profileData, setProfileData] = useState({});
  const [formValues, setFormValues] = useState({});

  const [recruiterTypes, setRecruiterTypes] = useState([
    { id: 1, name: "Recruitment Firm" },
    { id: 2, name: "Direct Employer" },
  ]);

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${baseurl}profile`, {
          headers: {
            Authorization: token,
          },
        });
        const { data } = response.data;
        setProfileData(data.employeer_detail);
        setFormValues({
          first_name: data.employeer_detail.first_name,
          last_name: data.employeer_detail.last_name,
          email: data.employeer_detail.email,
          phone: data.employeer_detail.phone,
          website: data.employeer_detail.website,
          designation: data.employeer_detail.designation,
          organization: data.employeer_detail.organization,
          recuiter_type: data.employeer_detail.recuiter_type,
          logImg :data.employeer_detail.photo
        });
      //  setLogImg(data.employeer_detail.photo); // Set initial photo URL
        setSelectedCountry(data.employeer_detail.current_country_id || "");
        setSelectedState(data.employeer_detail.current_state_id || "");
        setSelectedCity(data.employeer_detail.current_city_id || "");
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [token]);

  // Handle image upload
    const logImgHandler = (event) => {
      const file = event.target.files[0];
      if (file && file.type.match('image.*')) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setLogImg(reader.result); // Store the Base64 string of the file
        };
      } else {
        toast.error("Please upload a valid image file.");
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const form = e.target;
      const formData = new FormData();
    
      // Convert Base64 to Blob if logImg is a Base64 string
      if (logImg && logImg.startsWith('data:image/')) {
        const [metadata, base64Data] = logImg.split(',');
        const mimeString = metadata.match(/:(.*?);/)[1]; // Extract MIME type
        const byteString = atob(base64Data); // Decode base64
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        
        for (let i = 0; i < byteString.length; i++) {
          uint8Array[i] = byteString.charCodeAt(i);
        }
    
        const blob = new Blob([uint8Array], { type: mimeString });
        formData.append("photo_upload", blob, 'photo.jpg'); // Append Blob as a file
      }
    
      formData.append("first_name", formValues.first_name);
      formData.append("last_name", formValues.last_name);
      formData.append("email", formValues.email);
      formData.append("phone", formValues.phone);
      formData.append("website", formValues.website);
      formData.append("designation", formValues.designation);
      formData.append("organization", formValues.organization);
      formData.append("recuiter_type", formValues.recuiter_type);
      formData.append("current_country_id", selectedCountry);
      formData.append("current_state_id", selectedState);
      formData.append("current_city_id", selectedCity);
    
      try {
        const response = await axios.patch(
          `${baseurl}profile`,
          formData, // Send FormData
          {
            headers: {
              Authorization: token,
              "Content-Type": "multipart/form-data", // Ensure this header is set
            },
          }
        );
        toast.success("Personal Details updated successfully!");
      } catch (error) {
        toast.error("Failed to update profile.");
        console.error("Error updating profile:", error);
      }
    };
    

  // Fetch countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${baseurl}countries`, {
          headers: {
            Authorization: token,
          },
        });
        setCountries(response.data.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, [token]);

  // Fetch states
  const fetchStates = async (countryId) => {
    try {
      const response = await axios.get(`${baseurl}stats/${countryId}`, {
        headers: {
          Authorization: token,
        },
      });
      setStates(response.data.data);
      setCities([]); // Reset cities when country changes
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  // Fetch cities
  const fetchCities = async (stateId) => {
    try {
      const response = await axios.get(`${baseurl}cities/${stateId}`, {
        headers: {
          Authorization: token,
        },
      });
      setCities(response.data.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  // Handle country change
  const handleCountryChange = (e) => {
    const countryId = e.target.value;
    setSelectedCountry(countryId);
    fetchStates(countryId);
  };

  // Handle state change
  const handleStateChange = (e) => {
    const stateId = e.target.value;
    setSelectedState(stateId);
    fetchCities(stateId);
  };

  // Handle form field changes
  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="default-form">
      <ToastContainer />
      <div className="row">
        {/* Profile Picture Upload */}
        <div className="form-group col-lg-6 col-md-12 flex justify-center">
        <div>
          <div className="rounded-full border w-32 h-32 flex items-center justify-center overflow-hidden">
            <input
              className="uploadButton-input hidden"
              type="file"
              name="photo"
              accept="image/*"
              id="upload"
              onChange={logImgHandler}
            />
            <label
              className="uploadButton-button cursor-pointer flex items-center justify-center w-full h-full"
              htmlFor="upload"
            >
              {logImg && logImg.startsWith('data:image/') ? (
                <img
                  src={logImg}
                  alt="Uploaded"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center w-full h-full">
                  <img
                  src={`https://api.sentryspot.co.uk${formValues.logImg}`}
                  alt="Uploaded"
                  
                />
                  
                  <span className="text-sm mt-2">Upload Image</span>
                </div>
              )}
            </label>
          </div>
          <div className="bg-violet-800 w-28 mt-2 py-1 ms-2 text-white text-sm text-center rounded-lg">
            Add Picture
          </div>
        </div>
      </div>
{console.log(`https://api.sentryspot.co.uk${formValues.logImg}`)}

        {/* Form Fields */}
        <div className="form-group col-lg-6 col-md-12">
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            placeholder="e.g. Jerome"
            required
            className="border rounded-none mb-4"
            value={formValues.first_name || ""}
            onChange={handleChange}
          />
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            placeholder="e.g. Doe"
            required
            className="border rounded-none"
            value={formValues.last_name || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="e.g. email@example.com"
            required
            className="border rounded-none mb-4"
            value={formValues.email || ""}
            readOnly
          />
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="e.g. +1 234 567 890"
            required
            className="border rounded-none"
            value={formValues.phone || ""}
            readOnly
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Website</label>
          <input
            type="text"
            name="website"
            placeholder="e.g. www.example.com"
            className="border rounded-none mb-4"
            value={formValues.website || ""}
            onChange={handleChange}
          />
          <label>Designation</label>
          <input
            type="text"
            name="designation"
            placeholder="e.g. HR Manager"
            className="border rounded-none"
            value={formValues.designation || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Organization</label>
          <input
            type="text"
            name="organization"
            placeholder="e.g. Company XYZ"
            className="border rounded-none mb-4"
            value={formValues.organization || ""}
            onChange={handleChange}
          />
          <label>Recruiter Type</label>
          <select
            name="recuiter_type"
            className="border rounded-none"
            value={formValues.recuiter_type || ""}
            onChange={handleChange}
          >
            {recruiterTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group col-lg-4 col-md-12">
          <label>Country</label>
          <select
            name="country"
            className="border rounded-none"
            value={selectedCountry}
            onChange={handleCountryChange}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group col-lg-4 col-md-12">
          <label>State</label>
          <select
            name="state"
            className="border rounded-none"
            value={selectedState}
            onChange={handleStateChange}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group col-lg-4 col-md-12">
          <label>City</label>
          <select
            name="city"
            className="border rounded-none"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group col-lg-12">
        <button type="submit" className="btn bg-violet-800 text-white">Save</button>
      </div>
    </form>
  );
};

export default FormInfoBox;
