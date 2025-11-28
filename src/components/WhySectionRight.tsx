import React from "react";

const WhySectionleRight = ({ subHeading, img1, img2, p }: any) => {
  return (
    <div className="flex flex-col gap-4 w-full sm:flex-row justify-between items-center">
      <div className="sm:w-[45%] px-5 sm:px-0 text-justify">
        <div className="flex sm:block sm:gap-4 items-center gap-4">
          <img src={img1} alt="" className=" h-12 sm:h-16  " />
          <p className="sm:text-3xl text-lg font-bold my-4">{subHeading}</p>
        </div>
        <p className="sm:text-lg font-light">{p}</p>
      </div>
      <img
        src={img2}
        alt=""
        className="sm:w-[38%] px-5 sm:px-0 sm:h-96 sm:ms-0"
      />
    </div>
  );
};

export default WhySectionleRight;
