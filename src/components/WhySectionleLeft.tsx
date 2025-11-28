import React from "react";

const WhySectionleLeft = ({ subHeading, img1, img2, p }: any) => {
  return (
    <div className="flex flex-col gap-8 w-full sm:flex-row justify-between items-center">
      <img src={img2} alt="" className="sm:w-[45%] sm:ms-0 hidden sm:block" />

      <div className="px-5 sm:px-0 sm:w-[45%]  text-justify">
        <div className="flex sm:gap-4 items-center gap-4 sm:block">
          <img src={img1} alt="" className=" h-12 sm:h-16" />

          <p className="sm:text-3xl text-lg font-bold my-4">{subHeading}</p>
        </div>
        <p className="sm:text-lg font-light">{p}</p>
      </div>
      <img src={img2} alt="" className="sm:w-[60%] px-5 sm:ms-0 sm:hidden " />
    </div>
  );
};

export default WhySectionleLeft;
