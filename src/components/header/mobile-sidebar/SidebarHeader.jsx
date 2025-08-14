import { Link } from "react-router-dom";
import logo from "../../../Images/image.png";
const SidebarHeader = () => {
  return (
    <div className="pro-header pt-[80px]">
      <Link to="/">
        <img src={logo} alt="brand" className="w-[80%]" />
      </Link> 
      {/* {/* End logo */}

      <div className="fix-icon" data-bs-dismiss="offcanvas" aria-label="Close">
        <span className="flaticon-close"></span>
      </div>
      {/* icon close */}
    </div>
  );
};

export default SidebarHeader;
