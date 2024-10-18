import React, { useState, Fragment } from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProfileVisalbilty = () => {
  const options = [
    {
      label: "Standard",
      value: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Commodi, exercitationem tenetur laudantium reiciendis soluta.`,
      recommended: true,
    },
    {
      label: "Limited",
      value: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Commodi, exercitationem.`,
    },
    {
      label: "Hidden",
      value: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Commodi, exercitationem tenetur.`,
    },
  ];
  const [showStatusBar, setShowStatusBar] = useState("Standard");

  return (
    <DropdownMenu className="max-w-[40%]">
      <DropdownMenuTrigger asChild className="form-group col-lg-6 col-md-12">
        <button className="p-3 rounded-lg text-left bg-[#f0f5f7]">
          {showStatusBar}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        {options?.map((option, i) => (
          <DropdownMenuCheckboxItem
            checked={showStatusBar === option?.label}
            onCheckedChange={() => setShowStatusBar(option?.label)}
            className=" flex flex-col items-start max-w-lg"
            key={option?.value}
          >
            <div className="flex items-center gap-3">
              <p className="font-bold">{option?.label}</p>
              {option?.recommended && (
                <span className="bg-blue-600 rounded-lg px-3 py-1 text-white">
                  Recommended
                </span>
              )}
            </div>
            <p className="text-gray-400 text-sm">{option?.value}</p>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileVisalbilty;
