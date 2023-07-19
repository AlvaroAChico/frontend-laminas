import React from "react";
import Header from "../../components/header/header";
import SectionLaminas from "./section-laminas/section-laminas";
import SectionPopularSearch from "./section-popular-search/section-popular-search";
import SectionCategories from "./section-categories/section-categories";
import SectionTutorial from "./section-tutorial/section-tutorial";

const LandingPage: React.FC = () => {
  return (
    <>
      <Header />
      <SectionLaminas />
      <SectionPopularSearch />
      <SectionCategories />
      <SectionTutorial />
    </>
  );
};

export default LandingPage;
