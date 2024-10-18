import React, { useState } from 'react';
import axios from 'axios';
import { Constant } from '@/utils/constant/constant';
import { toast, ToastContainer } from 'react-toastify';

const Form = () => {
  // State to manage form input values
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const token = localStorage.getItem(Constant.USER_TOKEN);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }

    try {
      const response = await axios.post(
        'https://api.sentryspot.co.uk/api/employeer/change-password',
        {
          old_password: oldPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        },
        {
          headers: {
            Authorization: token // Include `Bearer ` if needed
          },
        }
      );
      console.log('Password changed successfully:', response.data);
      toast.success('Password changed successfully:', response.data.message);
      // Handle successful password change (e.g., show a success message or redirect)
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error('Error changing password:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        <ToastContainer/>
        {/* Old Password Input */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>

        {/* New Password Input */}
        <div className="form-group col-lg-12 col-md-12">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        {/* Confirm Password Input */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="form-group col-lg-12 col-md-12 ">
          <button type="submit" className="theme-btn btn-style-one bg-blue-800 w-full">
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
