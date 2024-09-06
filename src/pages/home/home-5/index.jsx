import React from "react";

import Home from "@/components/home-5";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Home-5 || Abrodium - Job Borad ReactJs Template",
  description: "Abrodium - Job Borad ReactJs Template",
};

const HomePage5 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Home />
    </>
  );
};

export default HomePage5;
