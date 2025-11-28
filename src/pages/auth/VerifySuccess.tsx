import React from "react";
import { Success } from "assets";
import Container from "components/Container";
import { Link } from "react-router-dom";

const VerificationSuccess: React.FC = () => {
  return (
    <Container>
      <div className="flex items-center justify-center max-w-[505px] mx-auto px-[26px] py-10 bg-white rounded-lg shadow-lg my-40">
        <div className="flex flex-col items-center">
          <img src={Success} alt="Check your mail" className="mb-4" />
          <h2 className="mb-3 text-[32px] font-[600] text-mainLight text-center">
            OTP Verification Successful!🎉
          </h2>
          <p className="mb-6 text-center text-[#757575]">
            Your account has been created successfully. You can now proceed to
            Login.
          </p>
          <Link
            to="/login"
            className="w-full flex items-center justify-center h-[62px] p-[10px] mt-6 text-white bg-primary rounded-md hover:bg-primaryLight"
          >
            <span>Take me to Login</span>
            <svg
              className="w-5 h-5 ml-4 self-center"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m13 0H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default VerificationSuccess;
