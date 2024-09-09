import React from "react";

import Home from "@/components/home-12";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Home-12 || Abroadium - Job Borad ReactJs Template",
  description: "Abroadium - Job Borad ReactJs Template",
};

const HomePage12 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Home />
    </>
  );
};

export default HomePage12;
