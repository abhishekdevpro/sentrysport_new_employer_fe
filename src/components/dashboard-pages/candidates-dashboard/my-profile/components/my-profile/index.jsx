import FormInfoBox from "./FormInfoBox";
import LogoUpload from "./LogoUpload";
import ResumeUpload from "./ResumeUpload";

const index = () => {
  return (
    <div className="widget-content">
      <LogoUpload />
      {/* End logo and cover photo components */}
      <ResumeUpload />
      <FormInfoBox />
      {/* compnay info box */}
    </div>
  );
};

export default index;
