import LogoCoverUploader from "./my-profile/LogoCoverUploader";

const SocialNetworkBox = () => {
  return (
    <form className="default-form">
      <div className="row">
        <LogoCoverUploader />

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label htmlFor="name">main paragraph</label>
          <input
            type="text"
            name="name"
            placeholder="detail of company"
            // {...register("name")}
            // required
          />
          {/* {errors.name && (
            <p className="!text-red-500 text-sm">{errors.name.message}</p>
          )} */}
        </div>

        {/*  */}
        <h4 className="text-2xl text-black capitalize mb-2">
          Info About company
        </h4>

        <LogoCoverUploader />

        <div className="form-group col-lg-12 col-md-12">
          <label htmlFor="name">main paragraph</label>
          <input
            type="text"
            name="name"
            placeholder="Info about company"
            // {...register("name")}
            // required
          />
          {/* {errors.name && (
            <p className="!text-red-500 text-sm">{errors.name.message}</p>
          )} */}
        </div>
        {/* culter/event */}
        <h4 className="text-2xl text-black capitalize mb-2">
          Info About Event
        </h4>
        <div className="form-group col-lg-12 col-md-12">
          {/* <label htmlFor="name">main paragraph</label> */}
          <input
            type="text"
            name="name"
            placeholder="Info about company"
            // {...register("name")}
            // required
          />
          {/* {errors.name && (
            <p className="!text-red-500 text-sm">{errors.name.message}</p>
          )} */}
        </div>
        <LogoCoverUploader text="upload multiple images" />

        <h4 className="text-2xl text-black capitalize mb-2">
          footer (contact){" "}
        </h4>
        <div className="form-group col-lg-6 col-md-12">
          <label>Facebook</label>
          <input
            type="text"
            name="name"
            placeholder="www.facebook.com/Invision"
            // required
          />
        </div>

        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Twitter</label>
          <input type="text" name="name" placeholder="" required />
        </div> */}

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Linkedin</label>
          <input type="text" name="name" placeholder="" />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Google Plus</label>
          <input type="text" name="name" placeholder="" />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <button type="submit" className="theme-btn btn-style-one">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default SocialNetworkBox;
