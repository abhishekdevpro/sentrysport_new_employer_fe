

import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onClick={handleSubmit}>
      <div className="row">
        <div className="form-group col-lg-5 col-md-12 col-sm-12">
          <span className="icon flaticon-search-1"></span>
          <input
            type="text"
            name="field_name"
            placeholder="Job title, keywords, or company"
          />
        </div>
        {/* <!-- Form Group --> */}

        <div className="form-group col-lg-4 col-md-12 col-sm-12 location">
          <span className="icon flaticon-map-locator"></span>
          <input type="text" name="field_name" placeholder="City or postcode" />
        </div>
        {/* <!-- Form Group --> */}

        <div className="form-group col-lg-3 col-md-12 col-sm-12 btn-box">
          <button
            type="submit"
            className="theme-btn btn-style-one bg-blue-950"
            onClick={() => navigate("/job-list-v1")}
          >
            <span className="btn-title ">Find Jobs</span>
          </button>
        </div>
      </div>
      {/* End .row */}
    </form>
  );
};

export default SearchForm;
