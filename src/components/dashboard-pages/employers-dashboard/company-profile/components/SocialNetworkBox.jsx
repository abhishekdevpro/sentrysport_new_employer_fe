

import { useEffect, useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Constant } from "@/utils/constant/constant"
import BasicInformation from "./BasicInformation"
import AboutCompany from "./AboutCompnay"
import InsideCompanyImages from "./InsideCompnay"
import TeamMemberManager from "./Teams"
import WhatMakesUsUnique from "./WhatMakesUsUnique"
import JoinUsSection from "./JoinUsSection"
import SocialMediaLinks from "./SocialMediaLinks"

const SocialNetworkBox = () => {
  const BASE_IMAGE_URL = "https://api.sentryspot.co.uk"
  const token = localStorage.getItem(Constant.USER_TOKEN)
  const [activeTab, setActiveTab] = useState("basic")
  const [companyData, setCompanyData] = useState({})
  const [loading,setLoading] = useState(false)
  const methods = useForm({
    defaultValues: {
      company_name: "compnay name",
      address: "",
      email: "",
      phone: "",
      founded_date: "",
      website_link: "",
      join_us: "",
      facebook_link: "",
      twitter_link: "",
      google_link: "",
      linkedin_link: "",
      // Benefits data
      health_insurance: false,
      health_insurance_value: "",
      wellness_center: false,
      wellness_center_value: "",
      cafeteria: false,
      cafeteria_value: "",
      maternity_leave: false,
      maternity_leave_value: "",
      recreational_area: false,
      recreational_area_value: "",
      life_insurance: false,
      life_insurance_value: "",
      personal_accident_insurance: false,
      personal_accident_insurance_value: "",
    },
  })

  const { reset, handleSubmit, setValue, watch } = methods

  // Check for edit query param and set active tab accordingly
  useEffect(() => {
    // Get the query string from the URL
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const editSection = urlParams.get("edit")
    console.log(editSection,urlParams,"url");
    
    if (editSection) {
      switch (editSection.toLowerCase()) {
        case "about":
        case "about_company":
          setActiveTab("about")
          break
        case "images":
        case "inside_company":
          setActiveTab("images")
          break
        case "team":
        case "team_members":
          setActiveTab("team")
          break
        case "main":
        case "basic":
        default:
          setActiveTab("main")
      }
    }
  }, [])

  // Fetch company data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.sentryspot.co.uk/api/employeer/company", {
          headers: { Authorization: token },
        })
        const data = response.data?.data || {}
        setCompanyData(response.data.data)
        // Reset form with fetched data
        reset({
          ...data,
          // Ensure all fields are properly initialized
          health_insurance: data.health_insurance || false,
          health_insurance_value: data.health_insurance_value || "",
          wellness_center: data.wellness_center || false,
          wellness_center_value: data.wellness_center_value || "",
          cafeteria: data.cafeteria || false,
          cafeteria_value: data.cafeteria_value || "",
          maternity_leave: data.maternity_leave || false,
          maternity_leave_value: data.maternity_leave_value || "",
          recreational_area: data.recreational_area || false,
          recreational_area_value: data.recreational_area_value || "",
          life_insurance: data.life_insurance || false,
          life_insurance_value: data.life_insurance_value || "",
          personal_accident_insurance: data.personal_accident_insurance || false,
          personal_accident_insurance_value: data.personal_accident_insurance_value || "",
        })
      } catch (error) {
        toast.error("Error fetching data")
        console.error("Error fetching company data:", error)
      }
    }

    fetchData()
  }, [token, reset])

  // Handle form submission for general company data
  const onSubmit = async (data) => {
    console.log(data, "main form")
    setLoading(true)
    try {
      const response = await axios.patch("https://api.sentryspot.co.uk/api/employeer/company-additional", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      if (response.data.code == 200 || response.data.status == "success") {
        toast.success("Company data updated successfully")
        setCompanyData(response.data.data)
      }
    } catch (error) {
      toast.error("Error updating company data")
      console.error("Error updating company data:", error)
    }
    finally{
      setLoading(false)
    }
  }

  // Section title component
  const SectionTitle = ({ children }) => (
    <h4 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">{children}</h4>
  )

  // Form section component
  const FormSection = ({ children, className = "" }) => <div className={`space-y-6 mb-8 ${className}`}>{children}</div>

  return (
    <FormProvider {...methods}>
      <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b pb-2">
          <button
            onClick={() => setActiveTab("basic")}
            className={`py-2 px-4 rounded-t-lg ${
              activeTab === "basic"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Basic Information
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`py-2 px-4 rounded-t-lg ${
              activeTab === "about"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            About Company
          </button>
          <button
            onClick={() => setActiveTab("images")}
            className={`py-2 px-4 rounded-t-lg ${
              activeTab === "images"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Inside Company Images
          </button>
          <button
            onClick={() => setActiveTab("team")}
            className={`py-2 px-4 rounded-t-lg ${
              activeTab === "team"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Team Members
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* MAIN TAB */}
          {activeTab === "basic" && (
            <>
              {/* Basic Info */}
              <FormSection>
                <SectionTitle>Basic Information</SectionTitle>
                <BasicInformation />
              </FormSection>

              {/* What Makes Us Unique */}
              <FormSection>
                <SectionTitle>What Makes Us Unique</SectionTitle>
                <WhatMakesUsUnique />
              </FormSection>

              {/* Join Us */}
              <FormSection>
                <SectionTitle>Join Us</SectionTitle>
                <JoinUsSection companyData={companyData} />
              </FormSection>

              {/* Social Links */}
              <FormSection>
                <SectionTitle>Social Media & Website</SectionTitle>
                <SocialMediaLinks />
              </FormSection>
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                >
                 {loading ? "Saving..."  :" Save All Changes"}
                </button>
              </div>
            </>
          )}
          {/* ABOUT COMPANY TAB */}
          {activeTab === "about" && (
            <FormSection>
              <SectionTitle>About Company</SectionTitle>
              <AboutCompany token={token} BASE_IMAGE_URL={BASE_IMAGE_URL} companyData={companyData} />
             
            </FormSection>
          )}

          {/* INSIDE COMPANY IMAGES TAB */}
          {activeTab === "images" && (
            <FormSection>
              <SectionTitle>Inside Company Images</SectionTitle>
              <InsideCompanyImages token={token} BASE_IMAGE_URL={BASE_IMAGE_URL} companyData={companyData} />
              
            </FormSection>
          )}

          {/* TEAM MEMBERS TAB */}
          {activeTab === "team" && (
            <FormSection>
              <SectionTitle>Team Member Manager</SectionTitle>
              <TeamMemberManager />
              
            </FormSection>
          )}
        </form>
      </div>
    </FormProvider>
  )
}

export default SocialNetworkBox