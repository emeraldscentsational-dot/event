import WhySectionleLeft from "../components/WhySectionleLeft";
import WhySectionleRight from "../components/WhySectionRight";
import img11 from "../assets/Icon11.png";
import img12 from "../assets/Img12.png";
import img21 from "../assets/Icon21.png";
import img22 from "../assets/Img22.png";
import img31 from "../assets/Icon31.png";
import img32 from "../assets/Img32.png";
import img41 from "../assets/Icon41.png";
import img43 from "../assets/Product-shot.png";
import Container from "./Container";
const WhySection = () => {
  return (
    <Container>
      <div className="py-[100px]">
        <p className="text-[28px] sm:text-4xl text-xl font-bold text-center mb-10 md:mb-20">
          Why D’EventMatcha?
        </p>
        <div className="flex flex-col gap-10">
          <WhySectionleLeft
            img1={img11}
            img2={img12}
            p={
              "We work only with reputable and vetted event service providers to ensure reliability and quality for every event."
            }
            subHeading={"Reliability"}
          />
          <WhySectionleRight
            img1={img21}
            img2={img22}
            p={
              "We have built an extensive network of trusted and experienced event service providers, ensuring you have access to the best in the industry."
            }
            subHeading={"Comprehensive Network"}
          />
          <WhySectionleLeft
            img1={img31}
            img2={img32}
            p={
              "Say goodbye to endless searching and inquiries. Our platform streamlines the entire process, saving you time and effort in finding the right event service providers for your event."
            }
            subHeading={"Efficiency and Convenience"}
          />
          <WhySectionleRight
            img1={img41}
            img2={img43}
            p={
              "Our algorithms learn from your preferences and requirements, providing personalized recommendations that match your unique event needs."
            }
            subHeading={"Personalized Recommendations"}
          />
        </div>
      </div>
    </Container>
  );
};

export default WhySection;
