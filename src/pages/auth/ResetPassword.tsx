import { useForm, SubmitHandler } from "react-hook-form";
import Container from "components/Container";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Email } from "@mui/icons-material";
import { postData, RESET_PASSWORD_LINK } from "services";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ResetPasswordFormDTO } from "interfaces";
import { FaSpinner } from "react-icons/fa";

const ResetPassword = () => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormDTO>();

  const onSubmit: SubmitHandler<ResetPasswordFormDTO> = async (data) => {
    const res = await postData(RESET_PASSWORD_LINK, data);

    if (res?.isSuccess) {
      toast.success(
        res?.message || `Reset password link sent to ${data?.email}`
      );

      nav(`/verify-reset-password?email=${data?.email}`);
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
        <h2 className="text-[32px] font-[600] text-center mb-10 text-mainLight">
          Reset your Password
        </h2>
        <p className="mb-6 text-center text-[#757575]">
          To continue, kindly enter the email address registered with
          D’EventMatcha below.
        </p>
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
        <button
          type="submit"
          className="w-full h-[62px] py-3 rounded-[10px] disabled:bg-[#008C8F] disabled:opacity-25 bg-primaryLight text-white  hover:bg-primary my-10 inline-flex justify-center items-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? <FaSpinner className="animate-spin" /> : "Continue"}
        </button>

        <p className="text-center ">
          <a href="/login" className="text-primary">
            Back to Login
          </a>
        </p>
      </form>
    </Container>
  );
};

export default ResetPassword;
