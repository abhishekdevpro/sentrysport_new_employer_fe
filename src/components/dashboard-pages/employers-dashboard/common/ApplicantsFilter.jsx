import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";

const filtersTab = [
  "Current Location",
  "Preferred Location",
  "Current Organisation",
  "All Organisation",
  "Salary",
  "Experience",
  "Institute",
  "Degree",
  "MBA/PGDM Course Type",
  "Functional Area",
  "Notice Period",
  "Diversity",
  "Batch",
  "Age",
  "Application Date",
  "Last Seen",
  "Languages",
  "Willing ro relocate?",
  "Work Oermit for USA",
  "Handled team?",
  "Differently Abled?",
  "Assessment",
];
const currentLocation = [
  "Agartala",
  "Agra",
  "Ahmedabad",
  "Ahmednagar",
  "Alzawal",
  "Ajmer",
  "Aligarh",
  "Allahabad",
  "Ambala",
  "Amritsar",
  "Anand",
  "Anantapur",
  "Anywhere",
  "Assam",
  "Baddi",
  "Bahrain",
  "Bangladesh",
  "Bareilly",
  "Baroda",
  "Belgaum",
  "Bellary",
  "Bengaluru / Bangalore",
  "Bhagalpur",
];
const CurrentOrganisation = ["ABC", "DEF", "GHI", "JKL", "MNO", "PQR"];
const AllOrganisations = ["ABC", "DEF", "GHI", "JKL", "MNO", "PQR"];

const excludeSearch = [
  "Salary",
  "Experience",
  "Degree",
  "MBA/PGDM Course Type",
  "Notice Period",
  "Diversity",
  "Batch",
  "Age",
  "Application Date",
  "Last Seen",
  "Willing ro relocate?",
  "Work Oermit for USA",
  "Handled team?",
  "Differently Abled?",
  "Assessment",
];

const ApplicantsFilter = () => {
  const [selectedTab, setSelectedTab] = useState("Current Location");
  const [searchText, setSearchText] = useState("");
  const [selectedCurrentLocation, setSelectedCurrentLocation] = useState([]);
  const [selectedPreferredLocation, setSelectedPreferredLocation] = useState(
    []
  );
  const [selectedCurrentOrganisation, setSelectedCurrentOrganisation] =
    useState([]);
  const [selectedAllOrganisations, setSelectedAllOrganisations] = useState([]);
  return (
    <Dialog
      // open={openSignupDialog}
      // onOpenChange={() => dispatch(toggleSignupDialog())}
      className="p-0"
    >
      <DialogTrigger>
        <button className="border py-1 px-3 flex items-center hover:bg-gray-200">
          <span className="la la-filter text-lg"></span>
          <span className="">Filter</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl p-0 gap-0">
        <DialogHeader>
          <DialogTitle className="text-left text-xl p-2 font-thin">
            Filter By
          </DialogTitle>
          {/* <DialogDescription className="text-left"></DialogDescription> */}
        </DialogHeader>
        <div className="flex justify-between">
          <div className="w-[30%]">
            <div className="h-[70vh] overflow-auto bg-gray-100 border-t border-b">
              {filtersTab?.map((item, index) => (
                <button
                  key={index}
                  className={`inline-block w-full text-black py-3 pl-3 font-bold text-left hover:bg-transparent ${
                    selectedTab === item
                      ? "bg-white border-l-4 border-blue-950"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedTab(item);
                    setSearchText("");
                  }}
                >
                  {item}
                  {item === "Current Location" &&
                    selectedCurrentLocation.length > 0 && (
                      <span className=" ml-2">
                        ({selectedCurrentLocation.length})
                      </span>
                    )}
                  {item === "Preferred Location" &&
                    selectedPreferredLocation.length > 0 && (
                      <span className=" ml-2">
                        ({selectedPreferredLocation.length})
                      </span>
                    )}
                  {item === "Current Organisation" &&
                    selectedCurrentOrganisation.length > 0 && (
                      <span className=" ml-2">
                        ({selectedCurrentOrganisation.length})
                      </span>
                    )}
                  {item === "All Organisation" &&
                    selectedAllOrganisations.length > 0 && (
                      <span className=" ml-2">
                        ({selectedAllOrganisations.length})
                      </span>
                    )}
                </button>
              ))}
            </div>
          </div>
          <div className="w-[70%] border px-3">
            <p className="text-black uppercase font-bold text-lg">
              {selectedTab}
            </p>
            {!excludeSearch?.includes(selectedTab) && (
              <div className="relative mt-2">
                <input
                  type="text"
                  className="border w-full h-9 pl-3 focus:!border-blue-800"
                  placeholder="Search"
                  value={searchText}
                  onChange={(e) =>
                    setSearchText(e.target.value.toLocaleLowerCase())
                  }
                />
                <span className="la la-search absolute top-[15%] right-5 text-lg"></span>
              </div>
            )}
            <div className="w-full border-b my-3" />
            <div className="h-[50vh] overflow-auto ">
              <div className="flex flex-wrap gap-3">
                {selectedTab == "Current Location" &&
                  currentLocation?.map(
                    (item, index) =>
                      item.toLocaleLowerCase()?.includes(searchText) && (
                        <div
                          className="flex items-center gap-2 basis-[40%]"
                          key={index}
                        >
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            className="w-4 h-4"
                            onClick={() =>
                              selectedCurrentLocation.includes(item)
                                ? setSelectedCurrentLocation(
                                    selectedCurrentLocation.filter(
                                      (i) => i !== item
                                    )
                                  )
                                : setSelectedCurrentLocation((prev) => [
                                    ...new Set([...prev, item]),
                                  ])
                            }
                          />
                          <label htmlFor="" className="text-black">
                            {item}
                          </label>
                        </div>
                      )
                  )}
              </div>

              <div className="flex flex-wrap gap-3">
                {selectedTab == "Preferred Location" &&
                  currentLocation?.map(
                    (item, index) =>
                      item.toLocaleLowerCase()?.includes(searchText) && (
                        <div
                          className="flex items-center gap-2 basis-[40%]"
                          key={index}
                        >
                          <input
                            type="checkbox"
                            name={item}
                            className="w-4 h-4"
                            onClick={() =>
                              selectedPreferredLocation.includes(item)
                                ? setSelectedPreferredLocation(
                                    selectedPreferredLocation.filter(
                                      (i) => i !== item
                                    )
                                  )
                                : setSelectedPreferredLocation((prev) => [
                                    ...new Set([...prev, item]),
                                  ])
                            }
                          />
                          <label htmlFor={item} className="text-black">
                            {item}
                          </label>
                        </div>
                      )
                  )}
                {selectedTab == "Current Organisation" &&
                  CurrentOrganisation?.map(
                    (item, index) =>
                      item.toLocaleLowerCase()?.includes(searchText) && (
                        <div
                          className="flex items-center gap-2 basis-[40%]"
                          key={index}
                        >
                          <input
                            type="checkbox"
                            name={item}
                            className="w-4 h-4"
                            onClick={() =>
                              selectedCurrentOrganisation.includes(item)
                                ? setSelectedCurrentOrganisation(
                                    selectedCurrentOrganisation.filter(
                                      (i) => i !== item
                                    )
                                  )
                                : setSelectedCurrentOrganisation((prev) => [
                                    ...new Set([...prev, item]),
                                  ])
                            }
                          />
                          <label htmlFor={item} className="text-black">
                            {item}
                          </label>
                        </div>
                      )
                  )}
                {selectedTab == "All Organisation" &&
                  AllOrganisations?.map(
                    (item, index) =>
                      item.toLocaleLowerCase()?.includes(searchText) && (
                        <div
                          className="flex items-center gap-2 basis-[40%]"
                          key={index}
                        >
                          <input
                            type="checkbox"
                            name={item}
                            className="w-4 h-4"
                            onClick={() =>
                              selectedAllOrganisations.includes(item)
                                ? setSelectedAllOrganisations(
                                    selectedAllOrganisations.filter(
                                      (i) => i !== item
                                    )
                                  )
                                : setSelectedAllOrganisations((prev) => [
                                    ...new Set([...prev, item]),
                                  ])
                            }
                          />
                          <label htmlFor={item} className="text-black">
                            {item}
                          </label>
                        </div>
                      )
                  )}
                {selectedTab == "Salary" && (
                  <>
                    <div className="form-group basis-[40%]">
                      <label htmlFor="annual salary">Min. Salary</label>
                      <select
                        name=""
                        id=""
                        className="chosen-single form-select"
                      >
                        <option value="">Min</option>

                        {Array.from({ length: 101 }, (_, i) => i).map(
                          (x, i) => (
                            <option value={x}>{x}</option>
                          )
                        )}
                      </select>
                    </div>
                    <div className="form-group basis-[40%]">
                      <label className="">Max. Salary</label>

                      <select
                        name=""
                        id=""
                        className="chosen-single form-select"
                      >
                        <option value="">Max</option>
                        {Array.from({ length: 101 }, (_, i) => i).map(
                          (x, i) => (
                            <option value={x}>{x}</option>
                          )
                        )}
                      </select>
                    </div>
                  </>
                )}

                {selectedTab == "Experience" && (
                  <>
                    <div className="form-group basis-[40%]">
                      <label htmlFor="annual salary">Min. Experience</label>
                      <select
                        name=""
                        id=""
                        className="chosen-single form-select"
                      >
                        <option value="">Min</option>

                        {Array.from({ length: 32 }, (_, i) => i).map((x, i) => (
                          <option value={x}>{x}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group basis-[40%]">
                      <label className="">Max. Experience</label>

                      <select
                        name=""
                        id=""
                        className="chosen-single form-select"
                      >
                        <option value="">Max </option>
                        {Array.from({ length: 32 }, (_, i) => i).map((x, i) => (
                          <option value={x}>{x}</option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="justify-end p-2">
          {/* <DialogClose asChild> */}
          <Button type="button" variant="secondary">
            Reset
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="bg-blue-950 text-white hover:bg-[#e60278]"
          >
            Apply
          </Button>
          {/* </DialogClose> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicantsFilter;
