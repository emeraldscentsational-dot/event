import App from "./App";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Landing from "pages/landing";
import SignUp from "pages/auth/SignUp";
import SignIn from "pages/auth/SignIn";
import Verifcation from "pages/auth/Verifcation";
import VerificationSuccess from "pages/auth/VerifySuccess";
import ResetPassword from "pages/auth/ResetPassword";
import VerifyResetPassword from "pages/auth/VerifyResetPassword";
import ForgotPassword from "pages/auth/ForgotPassword";
import ResetSuccess from "pages/auth/ResetSuccess";
import Profile from "pages/profile/Profile";
import ServiceNeederProfile from "pages/profile/ServiceNeederProfile";
import SelectProfile from "pages/profile/SelectProfile";
import EventVenue from "pages/event venue/EventVenue";
import AboutUs from "pages/landing/AboutUs";
import ViewProfile from "pages/profile/ViewProfile";

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Landing />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/verification" element={<Verifcation />} />
      <Route path="/success" element={<VerificationSuccess />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-reset-password" element={<VerifyResetPassword />} />
      <Route path="/profile-details" element={<ViewProfile />} />

      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/select-profile" element={<SelectProfile />} />
      <Route path="/service-providers" element={<Profile />} />
      <Route path="/service-needers" element={<ServiceNeederProfile />} />
      <Route path="/event-venue" element={<EventVenue />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/reset-success" element={<ResetSuccess />} />
    </Route>
  )
);
