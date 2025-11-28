import cookies from "js-cookie";
import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY || "";

const saveToken = (value: string) => {
  cookies.set("token", value, {
    expires: 7,
  });
};

const getToken = () => {
  const t = cookies.get("token");
  return t;
};

const deleteToken = () => {
  cookies.remove("token");
};

const encryptData = (data: any) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

const decryptData = (encryptedData: any) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedData);
};

export { getToken, saveToken, deleteToken, encryptData, decryptData };
