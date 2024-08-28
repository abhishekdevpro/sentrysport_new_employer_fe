import { Button } from "@/components/ui/button";
import MakeJobPremiunDialog from "../../common/MakeJobPremiunDialog";

const WidgetTopFilterBox = () => {
  return (
    <div className="chosen-outer">
      <MakeJobPremiunDialog />
      <select className="chosen-single form-select chosen-container">
        <option>Select Jobs</option>
        <option>Last 12 Months</option>
        <option>Last 16 Months</option>
        <option>Last 24 Months</option>
        <option>Last 5 year</option>
      </select>
      {/* <!--Tabs Box--> */}

      <select className="chosen-single form-select chosen-container">
        <option>All Status</option>
        <option>Last 12 Months</option>
        <option>Last 16 Months</option>
        <option>Last 24 Months</option>
        <option>Last 5 year</option>
      </select>
      {/* <!--Tabs Box--> */}
    </div>
  );
};

export default WidgetTopFilterBox;
