import { Email } from "assets";
import Container from "components/Container";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { postData } from "services";
import { RESEND_OTP } from "services/routes";

const VerifyResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "example@domain.com";
  const [remainingTime, setRemainingTime] = useState(120);

  const handleResendVerification = async () => {
    try {
      const res = await postData(RESEND_OTP, { email });
      if (res?.isSuccess) {
        toast.success(res?.message || `OTP sent to ${email}`);
      } else if (typeof res?.errors !== "string") {
        const errorMessages = res?.errors
          ?.map((err: any) => err?.errorMessage)
          ?.join("\n");
        toast.error(errorMessages);
      } else toast.error(res?.message);
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setRemainingTime(120);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timer;
    if (remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setRemainingTime(0);
    }

    return () => clearInterval(timer);
  }, [remainingTime]);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <Container>
      <div className="flex items-center justify-center max-w-[480px] mx-auto px-[26px] py-10 bg-white rounded-lg shadow-lg my-40">
        <div className="flex flex-col items-center">
          <img src={Email} alt="Check your mail" className="mb-4" />
          <h2 className="mb-3 text-[32px] font-[600] text-mainLight">
            Check your Mail!
          </h2>
          <p className="mb-6 text-center text-[#757575]">
            We sent you an email with a link to reset your password.
          </p>

          <a
            href={`mailto:${email}`}
            className="w-full flex justify-center items-center h-[62px] p-[10px] my-6 text-white bg-primary rounded-md hover:bg-primaryLight"
          >
            Open Mail App
          </a>
          <p>
            Didn’t get the mail? Can resend in
            <span className="font-bold text-orange-500 ml-2">
              {`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}
            </span>
          </p>
          {remainingTime === 0 && (
            <button
              onClick={handleResendVerification}
              className="my-2 font-semibold text-primaryLight"
            >
              Resend Email
            </button>
          )}
          <p className="text-center font-semibold mt-5">
            <a href="/login" className="text-primaryLight">
              Back to Login
            </a>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default VerifyResetPassword;
