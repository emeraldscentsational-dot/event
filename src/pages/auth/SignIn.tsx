import { useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { LOGIN, postData } from "services";
import toast from "react-hot-toast";
import cookies from "js-cookie";
import { saveToken } from "config";
import { decryptData, encryptData } from "config";
import { SignInFormDTO } from "interfaces";
import { FaSpinner } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setAuth } from "./../../redux/auth";

const SignIn = () => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormDTO>();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const dispatch = useDispatch();

  useEffect(() => {
    const encryptedData = cookies.get("creds");

    if (encryptedData) {
      const decryptedData = decryptData(encryptedData);
      setValue("email", decryptedData?.email);
      setValue("password", decryptedData?.password);
      setValue("remember", decryptedData?.remember);
    }
  }, []);

  const onSubmit: SubmitHandler<SignInFormDTO> = async (data) => {
    const res = await postData(LOGIN, data);
    if (res?.isSuccess) {
      saveToken(res?.data?.token);
      toast.success("Logged in successfully");
      if (data.remember) {
        const encryptedData = encryptData({
          // email: data.email,
          emailOrUsername: data.emailOrUsername,
          password: data.password,
          remember: data.remember,
        });
        cookies.set("creds", encryptedData, {
          expires: 365,
          secure: true,
          sameSite: "Strict",
        });
      } else {
        cookies.remove("creds");
      }
      dispatch(setAuth({   
        // email: data.email,
        emailOrUsername:data.emailOrUsername,
  id: res?.data.id ?? "",
  firstName: res?.data.firstName ?? "",
  lastName: res?.data.lastName ?? "",
  isAuth: true }));
      nav(`/event-venue`);
    } else if (typeof res?.errors !== "string") {
      const errorMessages = res?.errors?.map((err: any) => err?.errorMessage);
      toast.error(errorMessages?.join("\n"));
    } else {
      toast.error(res?.message);
    }
  };

  return (
    <Container>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[480px] mx-auto p-10 bg-white rounded-lg shadow-lg my-40"
      >
        <h2 className="text-[32px] font-[600] text-center mb-10 text-mainLight">
          Login
        </h2>
        {/* <div className="mb-4 flex flex-col gap-2">
          <label className="text-mainLight font-[600]" htmlFor="email">
            Email Address
          </label>
          <TextField
            id="email"
            type="email"
            placeholder="example@domain.com"
            variant="outlined"
            fullWidth
            className="bg-[#F8F8F8] rounded-[10px] px-3"
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
        </div> */}
 <div className="mb-4 flex flex-col gap-2">
          <label className="text-mainLight font-[600]" htmlFor="emailOrUsername">
            Username Or Email
          </label>
          <TextField
            id="emailOrUsername"
            type="text"
            placeholder="example@domain.com"
            variant="outlined"
            fullWidth
            className="bg-[#F8F8F8] rounded-[10px]"
            {...register("emailOrUsername", { required: true })}
            error={!!errors.emailOrUsername}
            helperText={errors.emailOrUsername ? "Valid Username or Email is required" : ""}
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
          <label className="text-mainLight font-[600]" htmlFor="password">
            Password
          </label>
          <TextField
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            variant="outlined"
            fullWidth
            className="bg-[#F8F8F8] rounded-[10px] px-3"
            {...register("password", {
              required: true,
              minLength: 8,
              pattern:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$.%^&*])[A-Za-z\d!@#$%.^&*]{8,}$/,
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
        <div className="mb-4 flex justify-between items-center">
          <div className="flex">
            <input
              id="remember"
              type="checkbox"
              {...register("remember")}
              className="mr-2"
            />
            <label htmlFor="remember" className="text-mainLight">
              Remember me
            </label>
          </div>
          <Link to="/reset-password" className="text-primary">
            Forgot password
          </Link>
        </div>

        <button
          type="submit"
          className="w-full h-[62px] py-3 rounded-[10px] disabled:bg-[#008C8F] disabled:opacity-25 bg-primaryLight text-white hover:bg-primary inline-flex items-center justify-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? <FaSpinner className="animate-spin" /> : "Login"}
        </button>

        <p className="text-center mt-10">
          Don't have an account?{" "}
          <a href="/sign-up" className="text-primary">
            Sign Up
          </a>
        </p>
      </form>
    </Container>
  );
};

export default SignIn;
