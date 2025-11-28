import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Container from "components/Container";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Email } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { postData, SIGN_UP } from "services";
import toast from "react-hot-toast";
import { SignUpFormDTO } from "interfaces";
import { FaSpinner } from "react-icons/fa";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormDTO>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const nav = useNavigate();
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const onSubmit: SubmitHandler<SignUpFormDTO> = async (data) => {
    const res = await postData(SIGN_UP, data);
    if (res?.isSuccess) {
      toast.success("Registered successfully");
      nav(`/verification?email=${data?.email}`);
    } else if (typeof res?.errors !== "string") {
      const errorMessages = res?.errors?.map((err: any) => err?.errorMessage);
      toast.error(errorMessages?.join("\n"));
    } else toast.error(res?.errors?.message);
  };

  return (
    <Container>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[480px] mx-auto p-3 py-5 md:p-10 bg-white rounded-lg shadow-lg my-40"
      >
        <h2 className="text-[32px] font-[600] text-center mb-10 text-mainLight">
          Sign Up
        </h2>

        <div className="mb-4 flex flex-col gap-2">
          <label className="text-mainLight font-[600]" htmlFor="firstName">
            First Name
          </label>
          <TextField
            id="firstName"
            type="text"
            placeholder="Enter your first name"
            variant="outlined"
            fullWidth
            className="bg-[#F8F8F8] rounded-[10px]"
            {...register("firstName", { required: true, maxLength: 50 })}
            error={!!errors.firstName}
            helperText={
              errors.firstName
                ? "First name is required and should be less than 50 characters"
                : ""
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="mb-4 flex flex-col gap-2">
          <label className="text-mainLight font-[600]" htmlFor="lastName">
            Last Name
          </label>
          <TextField
            id="lastName"
            type="text"
            placeholder="Enter your last name"
            variant="outlined"
            fullWidth
            className="bg-[#F8F8F8] rounded-[10px]"
            {...register("lastName", { required: true, maxLength: 50 })}
            error={!!errors.lastName}
            helperText={
              errors.lastName
                ? "Last name is required and should be less than 50 characters"
                : ""
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="mb-4 flex flex-col gap-2">
          <label className="text-mainLight font-[600]" htmlFor="username">
            Username
          </label>
          <TextField
            id="username"
            type="text"
            placeholder="example@domain.com"
            variant="outlined"
            fullWidth
            className="bg-[#F8F8F8] rounded-[10px]"
            {...register("username", { required: true })}
            error={!!errors.username}
            helperText={errors.username ? "Valid Username is required" : ""}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="mb-4 flex flex-col gap-2">
          <label className="text-mainLight font-[600]" htmlFor="email">
            Email Address
          </label>
          <TextField
            id="email"
            type="email"
            placeholder="example@domain.com"
            variant="outlined"
            fullWidth
            className="bg-[#F8F8F8] rounded-[10px]"
            {...register("email", { required: true })}
            error={!!errors.email}
            helperText={errors.email ? "Valid email is required" : ""}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="mb-4 flex flex-col gap-2">
          <label className="text-mainLight font-[600]" htmlFor="password">
            Password
          </label>
          <TextField
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            variant="outlined"
            fullWidth
            className="bg-[#F8F8F8] rounded-[10px]"
            {...register("password", {
              required: true,
              minLength: 8,
              pattern:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%.^&*])[A-Za-z\d!@#$%.^&*]{8,}$/,
            })}
            error={!!errors.password}
            helperText={
              errors.password
                ? "Password must be at least 8 characters long and include letters, numbers, and special characters"
                : ""
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="mb-4 flex flex-col gap-2">
          <label
            className="text-mainLight font-[600]"
            htmlFor="reEnteredPassword"
          >
            Confirm Password
          </label>
          <TextField
            id="reEnteredPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Enter password"
            variant="outlined"
            fullWidth
            className="bg-[#F8F8F8] rounded-[10px]"
            {...register("reEnteredPassword", {
              required: true,
              validate: (value: string) =>
                value === watch("password") || "Passwords do not match",
            })}
            error={!!errors.reEnteredPassword}
            helperText={errors.reEnteredPassword ? "Passwords must match" : ""}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="mb-4">
          <div className="flex">
            <input
              id="agree"
              type="checkbox"
              {...register("isAgreedToTerms", { required: true })}
              className="mr-2"
            />
            <label htmlFor="agree" className="text-[#535353]">
              By clicking “Sign Up”, I agree to D’EventMatcha’s{" "}
              <a href="/sign-up" className="text-[#008C8F]">
                Terms and Policies of Service
              </a>
              .
            </label>
          </div>
          {errors.isAgreedToTerms && (
            <p className="text-red-500 text-sm mt-3 ml-5">
              You must agree to the terms and policies
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full h-[62px] py-3 rounded-[10px] disabled:bg-[#008C8F] disabled:opacity-25 bg-primaryLight text-white  hover:bg-primary inline-flex justify-center items-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? <FaSpinner className="animate-spin" /> : "Sign Up"}
        </button>

        <p className="text-center mt-10">
          Already have an account?{" "}
          <a href="/login" className="text-primary">
            Login
          </a>
        </p>
      </form>
    </Container>
  );
};

export default SignUp;
