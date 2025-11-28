import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Container from "components/Container";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate, useSearchParams } from "react-router-dom";
import { postData, RESET_PASSWORD } from "services";
import toast from "react-hot-toast";
import { ForgotPasswordFormDTO } from "interfaces";
import { FaSpinner } from "react-icons/fa";

const ForgotPassword = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") || "User";
  const token = searchParams.get("token") || "";
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormDTO>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const onSubmit: SubmitHandler<ForgotPasswordFormDTO> = async (data) => {
    const res = await postData(`${RESET_PASSWORD}?token=${token}`, data);
    if (res?.isSuccess) {
      toast.success(res?.message || `Password reset successfully`);
      nav(`/reset-success`);
    } else if (typeof res?.errors !== "string") {
      const errorMessages = res?.errors
        ?.map((err: any) => err?.errorMessage)
        ?.join("\n");
      toast.error(errorMessages);
    } else toast.error(res?.message);
  };

  return (
    <Container>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[480px] mx-auto p-10 bg-white rounded-lg shadow-lg my-40"
      >
        <h2 className="text-[32px] font-[600] text-center mb-4 text-mainLight">
          Hello, {name}
        </h2>
        <p className="mb-6 text-center text-[#757575]">
          Let’s help you reset your password.😎
        </p>
        <p className="text-[#757575] mb-4 text-sm">
          Kindly create a new password below.
        </p>

        <div className="mb-4 flex flex-col gap-2">
          <label className="text-mainLight font-[600]" htmlFor="newPassword">
            New Password
          </label>
          <TextField
            id="newPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            variant="outlined"
            fullWidth
            className="bg-[#F8F8F8] rounded-[10px]"
            {...register("newPassword", {
              required: true,
              minLength: 8,
              pattern:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$.%^&*])[A-Za-z\d!@#$%.^&*]{8,}$/,
            })}
            error={!!errors.newPassword}
            helperText={
              errors.newPassword
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

        <div className="mb-10 flex flex-col gap-2">
          <label
            className="text-mainLight font-[600]"
            htmlFor="confirmPassword"
          >
            Re-Enter New Password
          </label>
          <TextField
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Re-Enter new password"
            variant="outlined"
            fullWidth
            className="bg-[#F8F8F8] rounded-[10px]"
            {...register("confirmPassword", {
              required: true,
              validate: (value: string) =>
                value === watch("newPassword") || "Passwords do not match",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword ? "Passwords must match" : ""}
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

        <button
          type="submit"
          className="w-full h-[62px] py-3 rounded-[10px] disabled:bg-[#008C8F] disabled:opacity-25 bg-primaryLight text-white  hover:bg-primary inline-flex justify-center items-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <FaSpinner className="animate-spin" />
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </Container>
  );
};

export default ForgotPassword;
