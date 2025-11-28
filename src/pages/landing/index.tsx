import React from "react";
import Faq from "./Faq";
import Testimonials from "./Testimonials";
import HomeSectionOne from "../../components/HomeSectionOne";
import Stats from "../../components/Stats";
import WhySection from "../../components/WhySection";
import FeaturedImages from "./FeaturedImages";

const Landing = () => {
  return (
    <>
      <HomeSectionOne />
      <Stats />
      <WhySection />
      <FeaturedImages />
      <Testimonials />
      <Faq />
    </>
  );
};

export default Landing;
