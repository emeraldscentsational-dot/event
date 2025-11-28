import { Success } from "assets";
import Container from "components/Container";
import { Link } from "react-router-dom";

const ResetSuccess: React.FC = () => {
  return (
    <Container>
      <div className="flex items-center justify-center max-w-[505px] mx-auto px-[26px] py-10 bg-white rounded-lg shadow-lg my-40">
        <div className="flex flex-col items-center">
          <img src={Success} alt="Check your mail" className="mb-4" />
          <h2 className="mb-3 text-[32px] font-[600] text-mainLight text-center">
            Your Password Was Reset Successfully!🎉
          </h2>
          <p className="mb-6 text-center text-[#757575]">
            You can now use your new password to log in to your account
          </p>
          <Link
            to="/login"
            className="w-full flex items-center justify-center h-[62px] p-[10px] mt-6 text-white bg-primary rounded-md hover:bg-primaryLight"
          >
            Take me to Login
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default ResetSuccess;
