import { EmailOutlined } from "@mui/icons-material";
import { Email } from "assets";
import Container from "components/Container";
import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { postData, VALIDATE_OTP } from "services";
import { RESEND_OTP } from "services/routes";

const VerificationC: React.FC = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const otp = searchParams.get("otp") || "";
  const [isLoading, setIsLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(120);
  const [code, setCode] = useState<string[]>(
    otp.split("").concat(new Array(4 - otp.length).fill(""))
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const nav = useNavigate();

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    // Get the pasted content
    const pastedData = e.clipboardData.getData("text");

    // If the pasted content is a 6-digit code, distribute it into the input fields
    if (/^\d{6}$/.test(pastedData)) {
      const newCode = pastedData.split("").slice(0, 6);
      setCode(newCode);
      newCode.forEach((digit, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index]!.value = digit;
        }
      });
    }
  };

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only digits
    if (value.length > 1) return; // Ensure only one digit is entered per input

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to the next input
    if (value !== "" && index < code.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && code[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1]?.focus(); // Move to previous input
      }
    }
  };

  const handleVerify = async () => {
    try {
      setIsLoading(true);
      const otp = code.join("");
      const payload = {
        otp,
        email,
      };
      const res = await postData(VALIDATE_OTP, payload);

      if (res?.isSuccess) {
        toast.success(res?.message || "Verified successfully");
        nav("/success");
      } else if (typeof res?.errors !== "string") {
        const errorMessages = res?.errors
          ?.map((err: any) => err?.errorMessage)
          ?.join("\n");
        toast.error(errorMessages);
      } else toast.error(res?.message);
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

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
            We sent an OTP to <strong>{email}</strong>. Kindly enter the OTP
            below to complete your sign up.
          </p>
          <div className="flex my-10 space-x-2">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                maxLength={1}
                onPaste={handlePaste}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-[45px] md:w-[68px] h-[45px] md:h-[68px] border border-[#E9E7E8] text-[#4A3C40] font-bold text-center rounded-[10pxs]"
              />
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Didn’t get the mail? Can resend in{" "}
            <span className="font-bold text-orange-500">
              {`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}
            </span>
          </p>
          {remainingTime === 0 && (
            <button
              onClick={handleResendVerification}
              className="mt-2 font-semibold text-primaryLight"
            >
              Resend Email Verifcation
            </button>
          )}
          <button
            onClick={handleVerify}
            disabled={isLoading}
            className="w-full h-[62px] p-[10px] mt-6 text-white bg-primaryLight rounded-md hover:bg-primary inline-flex justify-center items-center"
          >
            {isLoading ? <FaSpinner className="animate-spin" /> : "Verify OTP"}
          </button>
          <Link to="/sign-up" className="w-full">
            <button className="flex items-center justify-center w-full h-[62px] p-[10px] text-[18px] border mt-4 text-primary bg-white rounded-[10px] hover:bg-gray-300">
              <svg
                className="w-5 h-5 mr-2 rotate-180"
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
              Change this Email
              <EmailOutlined className="text-primaryLight ml-2" />
            </button>
          </Link>
          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-primary">
              Login
            </a>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default VerificationC;
