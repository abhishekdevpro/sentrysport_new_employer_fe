import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import jobs from "../../../../../data/job-featured.js";
import { useGetPostQuery } from "@/store/slices/service/index.js";
import toast from "react-hot-toast";
import moment from "moment";
const JobListingsTable = () => {
  const navigate = useNavigate();
  const { isLoading, data, isError, error } = useGetPostQuery();
  console.log("oopp", data);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "something went wrong");
    }
  }, [isError]);

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Job Listings</h4>

        <div className="chosen-outer">
          {/* <!--Tabs Box--> */}
          <select className="chosen-single form-select">
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
            <option>Last 16 Months</option>
            <option>Last 24 Months</option>
            <option>Last 5 year</option>
          </select>
        </div>
      </div>
      {/* End filter top bar */}

      {/* Start table widget content */}
      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Applications</th>
                <th>Created & Expired</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <p>loading</p>
              ) : (
                data?.data?.map((item) => (
                  <tr key={item?.s_no}>
                    <td>
                      {/* <!-- Job Block --> */}
                      <div className="job-block">
                        <div className="inner-box">
                          <div className="content">
                            <span className="company-logo">
                              <img
                                src={
                                  item?.logo ||
                                  "/images/resource/company-logo/1-1.png"
                                }
                                alt="logo"
                              />
                            </span>
                            <h4>
                              <Link
                                to={`/job-single-v3/${item.id}`}
                                state={item?.id}
                              >
                                {item?.job_detail?.jobTitle ||
                                  "software developer"}
                              </Link>
                            </h4>
                            <ul className="job-info">
                              <li>
                                <span className="icon flaticon-briefcase"></span>
                                Segment
                              </li>
                              <li>
                                <span className="icon flaticon-map-locator"></span>
                                {item?.complete_address || "jaipur"}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="applied">
                      <a href="/employers-dashboard/all-applicants">
                        3+ Applied
                      </a>
                    </td>
                    <td>
                      {moment(item?.job_detail?.created_at).format("MMM Do YY")}{" "}
                      <br />
                      April 25, 2011
                    </td>
                    <td className="status">Active</td>
                    <td>
                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <button
                              data-text="View Aplication"
                              onClick={() => {
                                navigate(
                                  "/job-single-v3/2",
                                  (state = { item })
                                );
                              }}
                            >
                              <span className="la la-eye"></span>
                            </button>
                          </li>
                          <li>
                            <button data-text="Reject Aplication">
                              <span className="la la-pencil"></span>
                            </button>
                          </li>
                          <li>
                            <button data-text="Delete Aplication">
                              <span className="la la-trash"></span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* End table widget content */}
    </div>
  );
};

export default JobListingsTable;
