import toast from "react-hot-toast";
import { deleteToken } from "config";
import { useDispatch } from "react-redux";
import { purgeStoredState } from "redux-persist";
import { useNavigate } from "react-router-dom";
import { resetAuth } from "../redux/auth";
import { config } from "../redux/store";

const useLogout = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    toast.dismiss();
    dispatch(resetAuth());
    purgeStoredState(config);
    deleteToken();
    nav("/");
    toast.success("Logged out");
  };

  return { handleLogout };
};

export default useLogout;
