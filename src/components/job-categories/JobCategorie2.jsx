import { Link } from "react-router-dom";
import jobCatContent from "../../data/job-catergories";

const JobCategorie2 = () => {
  return (
    <>
      {jobCatContent.slice(0, 8).map((item) => (
        <div
          className="category-block-two col-xl-3 col-lg-4 col-md-6 col-sm-12"
          key={item.id}
        >
          <div className="inner-box">
            <div className="content">
              <span className={`icon ${item.icon}`}></span>
              <h4>
                <Link to="/job-list-v2">{item.catTitle}</Link>
              </h4>
              <p>({item.jobNumber} open positions)</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default JobCategorie2;
