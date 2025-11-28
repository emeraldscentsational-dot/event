import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import Slider from "./Slider";
import SliderRight from "./SliderRight";
import Container from "./Container";
import { vectorCirlce } from "assets";
import { useGetfeaturdImageQuery } from "./../redux/api/featurdImageApiSlice";
import { FeaturedImage } from "./../types/types";
import PageLoader from "./PageLoader";
import { Link } from "react-router-dom";

const HomeSectionOne = () => {
  const { data: image64, isLoading, isError } = useGetfeaturdImageQuery({});
  const [randomImages, setRandomImages] = useState<string[][]>([]); // State to store sets of random images

  // Function to extract random base64 images
  const getThreeRandomBase64Images = (images: FeaturedImage[]): string[] => {
    const base64Images = images?.map(
      (image) => image.imageDetails.imageDataBase64
    );

    if (base64Images?.length < 3) {
      return base64Images || [];
    }

    return base64Images.sort(() => Math.random() - 0.5).slice(0, 3);
  };

  useEffect(() => {
    if (image64?.value) {
      // Generate three unique sets of random images for each slider
      const uniqueRandomImages = [
        getThreeRandomBase64Images(image64.value),
        getThreeRandomBase64Images(image64.value),
        getThreeRandomBase64Images(image64.value),
      ];
      setRandomImages(uniqueRandomImages);
    }
  }, [image64]);

  return (
    <Container>
      <div className="flex flex-col sm:flex-row justify-between text-center sm:text-start sm:mt-40">
        <div className="w-full sm:w-[50%]">
          <p className=" sm:text-[48px] text-2xl font-bold sm:font-semibold sm:leading-[60px] ">
            Your Ultimate Destination for Booking and Showcasing
          </p>
          <div className="relative sm:mt-4 sm:mb-12 mb-4">
            <p className="sm:text-[48px] text-2xl font-medium  text-gold">
              Premium Event Services
            </p>
            <img
              src={vectorCirlce}
              alt=""
              className="absolute left-[-10px] top-[-10px]"
            />
          </div>
          <p className="text-wrap sm:mb-12 font-normal text-gray-500 text-lg text-justify px-2 sm:px-0 sm:w-[84%] mb-2">
            Our platform caters to both service providers showcasing their
            expertise and event needers seeking top-notch services. Connect,
            book, and showcase with ease and sophistication.
          </p>
          <Link
            to="/sign-up"
            className="flex justify-center  mx-2 sm:mx-0 items-center gap-2 mb-4 bg-green text-white py-3 px-5 rounded-lg w-max"
          >
            Get Started <FaArrowRightLong />
          </Link>
        </div>
        {isLoading ? (
          <div className="flex flex-col sm:w-[45%]">
            <PageLoader />
            <PageLoader />
          </div>
        ) : isError ? (
          <p className="text-red-600 text-center mx-auto">Something Happened</p>
        ) : image64?.value && randomImages.length === 3 ? (
          <div className="w-full sm:w-[45%] flex flex-col overflow-hidden rounded-3xl">
            <Slider images={randomImages[0]} />
            <SliderRight images={randomImages[1]} />
            <Slider images={randomImages[2]} />
          </div>
        ) : null}
      </div>
    </Container>
  );
};

export default HomeSectionOne;
