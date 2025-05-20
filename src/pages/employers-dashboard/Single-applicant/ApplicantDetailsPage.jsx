import LoginPopup from '@/components/common/form/login/LoginPopup'
import ApplicantDetails from '@/components/dashboard-pages/employers-dashboard/ApplicantsDeatils.jsx'
import DashboardHeader from '@/components/header/DashboardHeader'
import MobileMenu from '@/components/header/MobileMenu'
import React from 'react'

const ApplicantDetailsPage = () => {
  return (
    <>
       <LoginPopup />
      <DashboardHeader />
      {/* End Header */}
      <MobileMenu />
     <div className='mt-8'>
     <ApplicantDetails /> 
     </div>
    </>
  )
}

export default ApplicantDetailsPage