"use client"
import { useFormContext } from "react-hook-form"
import { Switch } from "@/components/ui/switch"

const WhatMakesUsUnique = () => {
  const { register, watch, setValue } = useFormContext()

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
                }}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>
            {isEnabled && (
              <input
                type="text"
                {...register(feature.valueKey)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder={`Describe ${feature.title}`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default WhatMakesUsUnique

