import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthInfo {
  id: string;
  isAuth: boolean;
  email?: string;
  emailOrUsername: string;
  firstName:string;
  lastName:string;
}

const initialState: AuthInfo = {
  id: '',
  isAuth: false,
  email: "",
  emailOrUsername: "",
  firstName:"",
  lastName:""
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<AuthInfo>) {
      state.id = action.payload.id;
      // state.email = action.payload.email;
      state.emailOrUsername = action.payload.emailOrUsername;
      state.isAuth = action.payload.isAuth;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    resetAuth() {
      return initialState;
    },
  },
});

export const { resetAuth, setAuth } = auth.actions;

export const authReducer = auth.reducer;
