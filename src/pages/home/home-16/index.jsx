import React from "react";

import Home from "@/components/home-16";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Home-16 || Abrodium - Job Borad ReactJs Template",
  description: "Abrodium - Job Borad ReactJs Template",
};

const HomePage16 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Home />
    </>
  );
};

export default HomePage16;
