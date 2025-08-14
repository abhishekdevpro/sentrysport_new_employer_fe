"use client"
import { useFormContext } from "react-hook-form"
import { Switch } from "@/components/ui/switch"
import Input from "@/UI-Components/Input"

const WhatMakesUsUnique = () => {
  const { register, watch, setValue, formState: { errors } } = useFormContext()

  // Define unique features
  const uniqueFeatures = [
    {
      title: "Health Insurance",
      toggleKey: "health_insurance",
      valueKey: "health_insurance_value",
    },
    {
      title: "24 hour Wellness Center",
      toggleKey: "wellness_center",
      valueKey: "wellness_center_value",
    },
    {
      title: "Cafeteria",
      toggleKey: "cafeteria",
      valueKey: "cafeteria_value",
    },
    {
      title: "Maternity and Paternity Leave",
      toggleKey: "maternity_leave",
      valueKey: "maternity_leave_value",
    },
    {
      title: "Recreational Area",
      toggleKey: "recreational_area",
      valueKey: "recreational_area_value",
    },
    {
      title: "Life Insurance",
      toggleKey: "life_insurance",
      valueKey: "life_insurance_value",
    },
    {
      title: "Personal Accident Insurance",
      toggleKey: "personal_accident_insurance",
      valueKey: "personal_accident_insurance_value",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {uniqueFeatures.map((feature) => {
        const isEnabled = watch(feature.toggleKey)

        return (
          <div key={feature.toggleKey} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-gray-700">{feature.title}</label>
              <Switch
                checked={isEnabled}
                onCheckedChange={(checked) => {
                  setValue(feature.toggleKey, checked)
                  if (!checked) {
                    setValue(feature.valueKey, "") // Clear the value when disabled
                  }
                }}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>
            {isEnabled && (
              <div>
                <Input
                  type="text"
                  {...register(feature.valueKey, {
                    required: `${feature.title} description is required`,
                    minLength: {
                      value: 10,
                      message: "Description must be at least 10 characters"
                    },
                    maxLength: {
                      value: 500,
                      message: "Description must not exceed 500 characters"
                    }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder={`Describe ${feature.title}`}
                />
                {errors[feature.valueKey] && (
                  <p className="mt-1 text-sm text-red-600">{errors[feature.valueKey].message}</p>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default WhatMakesUsUnique

