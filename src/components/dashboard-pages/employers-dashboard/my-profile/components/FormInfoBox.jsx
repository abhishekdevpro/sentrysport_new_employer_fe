import Select from "react-select";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonalDetailSchema } from "@/schema/PersonalDetail.js";
import { useCreatePostMutation } from "@/store/slices/service/index";
import ActionLoader from "@/components/loader/ActionLoader";

const FormInfoBox = () => {
  const formData = new FormData();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(PersonalDetailSchema), // Connect Zod validation schema
  });
  const catOptions = [
    { value: "Banking", label: "Banking" },
    { value: "Digital & Creative", label: "Digital & Creative" },
    { value: "Retail", label: "Retail" },
    { value: "Human Resources", label: "Human Resources" },
    { value: "Managemnet", label: "Managemnet" },
    { value: "Accounting & Finance", label: "Accounting & Finance" },
    { value: "Digital", label: "Digital" },
    { value: "Creative Art", label: "Creative Art" },
  ];
  const [createpost, { data, isSuccess, isError, isLoading, error }] =
    useCreatePostMutation();

  const submitHandler = (e) => {
    console.log(e, e.email, e.name);
  };
  return (
    <form className="default-form" onSubmit={handleSubmit(submitHandler)}>
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Invisionn"
            {...register("name")}
            // required
          />
          {errors.name && (
            <p className="!text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label htmlFor="email"> Email address</label>
          <input
            type="email"
            name="email"
            placeholder="Abroadium"
            {...register("email")}
            // required
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="0 123 456 7890"
            // required
            {...register("phone")}
          />
          {errors.phone && (
            <p className="!text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            name="website"
            placeholder="www.invision.com"
            {...register("website")}
            // required
          />
          {errors?.website && (
            <p className="!text-red-500 text-sm">{errors?.website?.message}</p>
          )}
        </div>

        {/* designation */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Designation</label>
          <input
            type="text"
            name="designation"
            placeholder="www.invision.com"
            {...register("designation")}
            // required
          />
          {errors?.designation && (
            <p className="!text-red-500 text-sm">
              {errors?.designation?.message}
            </p>
          )}
        </div>

        {/* Organization */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Organization</label>
          <input
            type="text"
            name="organization"
            placeholder="www.invision.com"
            {...register("organization")}
            // required
          />
          {errors?.organization && (
            <p className="!text-red-500 text-sm">
              {errors?.organization?.message}
            </p>
          )}
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Recruiter Type</label>
          <select
            name="recuiter_type"
            className="chosen-single form-select"
            {...register("recuiter_type")}
            // required
          >
            <option value="">Recruitment</option>
            <option value="Recruitment firm">Recruitment Firm</option>
            <option value="Direact employer">Direct Employer</option>
          </select>
          {errors.recuiter_type && (
            <p className="!text-red-500 text-sm">
              {errors.recuiter_type.message}
            </p>
          )}
        </div>

        {/* <!-- Search Select --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Organization Location</label>
          <select
            name="organization_location"
            className="chosen-single form-select"
            {...register("organization_location")}
            // required
          >
            <option value="">location</option>
            <option value="jaipur">jaipur</option>
            <option value="Delhi">Delhir</option>
          </select>

          {errors.organization_location && (
            <p className="!text-red-500 text-sm">
              {errors.organization_location.message}
            </p>
          )}
        </div>

        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Allow In Search & Listing</label>
          <select className="chosen-single form-select">
            <option>Yes</option>
            <option>No</option>
          </select>
        </div> */}

        {/* <!-- About Company --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label htmlFor="about">About Company</label>
          <textarea
            name="about"
            placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's on Wall Street. Managed a small team buying and selling Pogo sticks for farmers. Spent several years licensing licorice in West Palm Beach, FL. Developed several new methods for working it banjos in the aftermarket. Spent a weekend importing banjos in West Palm Beach, FL.In this position, the Software Engineer collaborates with Evention's Development team to continuously enhance our current software solutions as well as create new solutions to eliminate the back-office operations and management challenges present"
            {...register("about")}
          ></textarea>
          {errors.about && (
            <p className="!text-red-500 text-sm">{errors.about.message}</p>
          )}
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <button className="theme-btn btn-style-one" type="submit">
            {isLoading ? <ActionLoader /> : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormInfoBox;
