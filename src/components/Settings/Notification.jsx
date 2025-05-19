"use client";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

export default function Notification() {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      is_email: false,
      is_sms: false,
      is_marketing_notification: false,
    },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Notification Preferences
  useEffect(() => {
    const fetchNotificationSettings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "https://api.sentryspot.co.uk/api/jobseeker/notification-permission",
          {
            headers: { Authorization: token },
          }
        );

        if (response.data?.status === "success") {
          const { is_email, is_sms, is_marketing_notification } =
            response.data.data;

          // Set values in react-hook-form
          setValue("is_email", is_email);
          setValue("is_sms", is_sms);
          setValue("is_marketing_notification", is_marketing_notification);
        } else {
          setError("Failed to load notification settings.");
        }
      } catch (err) {
        console.error("Error fetching notification settings:", err);
        setError("Failed to load notification settings.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotificationSettings();
  }, [setValue]);

  // Update Notification Preferences
  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "https://api.sentryspot.co.uk/api/jobseeker/notification-permission",
        data,
        {
          headers: { Authorization: token },
        }
      );
    } catch (err) {
      console.error("Error updating notification settings:", err);
      setError("Failed to update notification settings.");
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-4 md:p-10 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        {/* Sidebar */}
        
        {/* Main Content */}
        <div className="md:w-3/4 w-full">
          <div className="p-6 bg-white shadow-md rounded-md">
            <h3 className="text-xl font-semibold mb-4">Notifications</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Product Notifications */}
              <div>
                <h4 className="font-semibold">Product notifications</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Stay ahead in your job search with Abroadium Resume Builder!
                  Get notified about new job matches and applications requiring
                  your attention, ensuring you are among the first to apply and
                  increasing your chances of landing your dream job.
                </p>

                {/* Email Notification Toggle */}
                <Controller
                  name="is_email"
                  control={control}
                  render={({ field }) => (
                    <ToggleSwitch
                      label="Email notifications"
                      enabled={field.value}
                      onChange={() => setValue("is_email", !field.value)}
                    />
                  )}
                />

                {/* SMS Notification Toggle */}
                <Controller
                  name="is_sms"
                  control={control}
                  render={({ field }) => (
                    <ToggleSwitch
                      label="SMS notifications"
                      enabled={field.value}
                      onChange={() => setValue("is_sms", !field.value)}
                    />
                  )}
                />
              </div>

              {/* Marketing Notifications */}
              <div>
                <h4 className="font-semibold">Marketing notifications</h4>
                <Controller
                  name="is_marketing_notification"
                  control={control}
                  render={({ field }) => (
                    <ToggleSwitch
                      label="I am open to receive marketing communications."
                      enabled={field.value}
                      onChange={() =>
                        setValue("is_marketing_notification", !field.value)
                      }
                    />
                  )}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : "Save Preferences"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Toggle Switch Component
const ToggleSwitch = ({ label, enabled, onChange }) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <button
        onClick={onChange}
        className={`relative w-12 h-6 rounded-full transition duration-300 ${
          enabled ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
            enabled ? "translate-x-6" : ""
          }`}
        ></span>
      </button>
      <label className="text-gray-700">{label}</label>
    </div>
  );
};
