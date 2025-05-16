import React from "react";
import { FaBookmark } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const FilterDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          className="bg-[#003479] hover:bg-[#003479]"
          type="button"
          onClick={() => setOpenScreeningQuestionDialog(true)}
        >
          Filter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-left text-xl font-semibold">
            Make job Premium
          </DialogTitle>
          {/* <DialogDescription className="text-left">
            Candidates will be asked to answer these question before they submit
            their application.
          </DialogDescription> */}
        </DialogHeader>
        <div className="flex flex-col gap-4 mb-3">
          <div className="bg-[#f3fbfb] flex gap-3 p-3">
            <span className="border p-2 bg-[#138b8b] rounded-full h-12 w-12 flex justify-center items-center">
              <FaBookmark size={20} color="white" />
            </span>

            <div>
              <span className="italic">Make the most of your job posting</span>
              <p className="mb-4 font-semibold text-black">
                Post as Premium Job for 3x More Applicants!
              </p>
              <div className="flex gap-2 items-center mb-2">
                <input type="checkbox" className="h-5 w-5" disabled />
                <label htmlFor="">
                  <span className="text-md mr-3">Make job premium</span>{" "}
                  <span className="text-md uppercase bg-[#c0951b] text-white font-semibold px-2 py-1 rounded-3xl">
                    recommended
                  </span>
                </label>
              </div>
              <span className="text-blue-600 cursor-pointer text-[16px]">
                Buy Premium Credits{" "}
              </span>
            </div>
          </div>
        </div>

        {/* <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
