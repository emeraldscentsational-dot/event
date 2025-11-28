import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { testimonials } from "./constants";
import TestimonialCard from "components/Cards/TestimonialCard";
import Container from "components/Container";
import { useGetTestimonialsQuery } from "../../redux/api/testimonialsApiSlice";
import PageLoader from "components/PageLoader";
const { headText, subText, settings } = testimonials;
const Testimonials = () => {
  const { data: testimonies, isLoading, isError } = useGetTestimonialsQuery({});

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <div className="text-center">Something Happened </div>;
  }
  console.log(testimonies);
  return (
    <Container>
      <div className="flex flex-col w-full justify-center items-center gap-8 md:gap-[72px] py-[120px]">
        <div className="w-full max-w-[275px] flex flex-col gap-4 mx-auto ">
          <h1 className="text-[28px] md:text-[40px] leading-[52px] text-center font-[700] text-mainLight">
            {headText}
          </h1>

          <h2 className="text-bodyLight text-[18px] md:text-[20px] leading-[24px] text-center">
            {subText}
          </h2>
        </div>
        <div className="w-full mx-auto overflow-hidden md:overflow-visible">
          <Slider {...settings}>
            {testimonies?.value?.length > 0 ? (
              testimonies?.value.map((testimonial: any, index: any) => (
                <TestimonialCard key={index} testimonial={testimonial} />
              ))
            ) : (
              <p className=" text-center">
                no testimonies available at the moment
              </p>
            )}
          </Slider>
        </div>
      </div>
    </Container>
  );
};

export default Testimonials;
