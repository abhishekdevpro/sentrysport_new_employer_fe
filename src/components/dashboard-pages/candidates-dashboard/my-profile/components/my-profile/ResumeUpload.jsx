import { useState } from "react";

const ResumeUpload = () => {
  const [Resume, setResume] = useState("");
  const ResumeHander = (e) => {
    setResume(e.target.files[0]);
  };
  return (
    <>
      <p className="text-black ">Upload Resume </p>
      <div className="uploading-outer">
        <div className="uploadButton">
          <input
            className="uploadButton-input"
            type="file"
            name="attachments[]"
            accept="pdf/*"
            id="upload"
            required
            onChange={ResumeHander}
          />
          <label className="uploadButton-button ripple-effect" htmlFor="upload">
            {Resume !== "" ? Resume.name : "upload resume"}
          </label>
          <span className="uploadButton-file-name"></span>
        </div>
        {/* <div className="text">
          Max file size is 1MB, Minimum dimension: 330x300 And Suitable files
          are .jpg & .png
        </div> */}
      </div>
    </>
  );
};

export default ResumeUpload;
