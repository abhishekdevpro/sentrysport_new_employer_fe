import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import TitleAutocomplete from "./TitleDropdown";
import LocationSelector from "./LocationSelector";
import { Constant } from "@/utils/constant/constant";
import Input from "@/UI-Components/Input";
import SelectInput from "@/UI-Components/SelectInput";
import { updateUserProfile } from "@/store/slices/authSlice";

const FormInfoBox = () => {
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.auth);

  const [logImg, setLogImg] = useState(null);

  const recruiterTypes = [
    { id: "", name: "Select the type" },
    { id: 1, name: "Recruitment Firm" },
    { id: 2, name: "Direct Employer" },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      website: "",
      designation: "",
      location_name: "",
      organization: "",
      recuiter_type: "",
    },
  });

  // Initialize form with data from Redux store
  useEffect(() => {
    if (userInfo) {
      const formData = {
        first_name: userInfo.first_name || "",
        last_name: userInfo.last_name || "",
        email: userInfo.email || "",
        phone: userInfo.phone || "",
        website: userInfo.website || "",
        designation: userInfo.designation || "",
        organization: userInfo.organization || "",
        recruiter_type_id: userInfo.recruiter_type_id || "",
        location_name: userInfo.location_name || "",
      };
      
      reset(formData);

      // Handle profile image
      if (userInfo.photo) {
        // Check if the photo is already a full URL
        if (userInfo.photo.startsWith('http')) {
          setLogImg(userInfo.photo);
        } else {
          // Construct the full URL
          setLogImg(`https://api.sentryspot.co.uk${userInfo.photo}`);
        }
      }
    }
  }, [userInfo, reset]);

  // Handle image upload
  const logImgHandler = (event) => {
    const file = event.target.files[0];
    if (file && file.type.match("image.*")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setLogImg(reader.result); // Store the Base64 string of the file
      };
    } else {
      toast.error("Please upload a valid image file.");
    }
  };

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    const formData = new FormData();

    // Convert Base64 to Blob if logImg is a Base64 string
    if (logImg && logImg.startsWith("data:image/")) {
      const [metadata, base64Data] = logImg.split(",");
      const mimeString = metadata.match(/:(.*?);/)[1]; // Extract MIME type
      const byteString = atob(base64Data); // Decode base64
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uint8Array = new Uint8Array(arrayBuffer);

      for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([uint8Array], { type: mimeString });
      formData.append("photo_upload", blob, "photo.jpg");
    }

    // Append all form fields to FormData
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
        formData.append(key, data[key]);
      }
    });

    try {
      const resultAction = await dispatch(updateUserProfile(formData));
      if (updateUserProfile.fulfilled.match(resultAction)) {
        toast.success("Personal Details updated successfully!");
      } else if (updateUserProfile.rejected.match(resultAction)) {
        toast.error(resultAction.payload?.message || "Failed to update profile");
      }
    } catch (err) {
      toast.error("Failed to update profile.");
      console.error("Error updating profile:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="default-form">
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
                {logImg ? (
                  <img
                    src={logImg}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error("Image failed to load:", logImg);
                      e.target.onerror = null; // Prevent infinite loop
                      setLogImg(null); // Reset image on error
                      toast.error("Failed to load profile image");
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center w-full h-full">
                    <span className="text-sm mt-2">Upload Image</span>
                  </div>
                )}
              </label>
            </div>

            {/* Make this a <label> instead of a <div> */}
            <label
              htmlFor="upload"
              className="bg-blue-800 w-28 mt-2 py-1 ms-2 text-white text-sm text-center rounded-lg cursor-pointer"
            >
              Add Picture
            </label>
          </div>
        </div>

        {/* Form Fields */}
        <div className="form-group col-lg-6 col-md-12">
          <Input
            label="First Name"
            placeholder="e.g. Jerome"
            className={`mb-4 w-full border ${errors.first_name ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            {...register("first_name", {
              required: "First name is required",
              minLength: {
                value: 2,
                message: "First name must be at least 2 characters"
              },
              maxLength: {
                value: 50,
                message: "First name cannot exceed 50 characters"
              },
              pattern: {
                value: /^[A-Za-z\s'-]+$/,
                message: "First name can only contain letters, spaces, hyphens and apostrophes"
              }
            })}
          />
          {errors.first_name && (
            <p style={{ color: '#ff6b6b', fontSize: '0.875rem', fontWeight: '500', marginTop: '0.25rem', marginBottom: '0.5rem' }}>{errors.first_name.message}</p>
          )}

          <Input
            label="Last Name"
            placeholder="e.g. Doe"
            className={`w-full border ${errors.last_name ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            {...register("last_name", {
              required: "Last name is required",
              minLength: {
                value: 2,
                message: "Last name must be at least 2 characters"
              },
              maxLength: {
                value: 50,
                message: "Last name cannot exceed 50 characters"
              },
              pattern: {
                value: /^[A-Za-z\s'-]+$/,
                message: "Last name can only contain letters, spaces, hyphens and apostrophes"
              }
            })}
          />
          {errors.last_name && (
            <p style={{ color: '#ff6b6b', fontSize: '0.875rem', fontWeight: '500', marginTop: '0.25rem', marginBottom: '0.5rem' }}>{errors.last_name.message}</p>
          )}
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <Input
            label="Email"
            type="email"
            placeholder="e.g. email@example.com"
            className={`mb-4 w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            readOnly
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
          />
          {errors.email && (
            <p style={{ color: '#ff6b6b', fontSize: '0.875rem', fontWeight: '500', marginTop: '0.25rem', marginBottom: '0.5rem' }}>{errors.email.message}</p>
          )}
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <Input
            type="tel"
            label="Phone"
            placeholder="e.g. 1234567890"
            className={`mb-4 w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            {...register("phone", {
              pattern: {
                value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                message: "Please enter a valid phone number"
              }
            })}
          />
          {errors.phone && (
            <p style={{ color: '#ff6b6b', fontSize: '0.875rem', fontWeight: '500', marginTop: '0.25rem', marginBottom: '0.5rem' }}>{errors.phone.message}</p>
          )}
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <Input
            type="url"
            label="Website"
            placeholder="e.g. www.example.com"
            className={`mb-4 w-full border ${errors.website ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            {...register("website", {
              pattern: {
                value: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/,
                message: "Please enter a valid website URL"
              }
            })}
          />
          {errors.website && (
            <p style={{ color: '#ff6b6b', fontSize: '0.875rem', fontWeight: '500', marginTop: '0.25rem', marginBottom: '0.5rem' }}>{errors.website.message}</p>
          )}
        </div>

        {/* Title Autocomplete - passes setValue to update form */}
        <TitleAutocomplete
          register={register}
          setValue={setValue}
          defaultValue={watch("designation")}
        />

        <div className="form-group col-lg-12 col-md-12">
          <Input
            label="Organization"
            placeholder="e.g. Company XYZ"
            className={`mb-4 w-full border ${errors.organization ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            {...register("organization", {
              required: "Organization name is required",
              minLength: {
                value: 2,
                message: "Organization name must be at least 2 characters"
              },
              maxLength: {
                value: 100,
                message: "Organization name cannot exceed 100 characters"
              }
            })}
          />
          {errors.organization && (
            <p style={{ color: '#ff6b6b', fontSize: '0.875rem', fontWeight: '500', marginTop: '0.25rem', marginBottom: '0.5rem' }}>{errors.organization.message}</p>
          )}

          <SelectInput
            label="Recruiter Type"
            options={recruiterTypes}
            className={`w-full border ${errors.recruiter_type_id ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            {...register("recruiter_type_id", {
              required: "Please select a recruiter type"
            })}
          />
          {errors.recruiter_type_id && (
            <p style={{ color: '#ff6b6b', fontSize: '0.875rem', fontWeight: '500', marginTop: '0.25rem', marginBottom: '0.5rem' }}>{errors.recruiter_type_id.message}</p>
          )}
        </div>

        <LocationSelector
          register={register}
          setValue={setValue}
          defaultLocation={watch("location_name")}
        />
      </div>

      <div className="form-group col-lg-12 mt-6">
        <button
          type="submit"
          className="py-2 px-6 rounded-md bg-blue-800 text-white hover:bg-blue-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default FormInfoBox;
