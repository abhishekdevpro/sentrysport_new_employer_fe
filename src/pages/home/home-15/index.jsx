import React from "react";

import Home from "@/components/home-15";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Home-15 || Sentryspot - Job Borad ReactJs Template",
  description: "Sentryspot - Job Borad ReactJs Template",
};

const HomePage15 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Home />
    </>
  );
};

export default HomePage15;
