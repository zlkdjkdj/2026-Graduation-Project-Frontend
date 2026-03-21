import { createBrowserRouter } from "react-router";
import { LandingPage } from "../pages/home/index";
import { MainPage } from "../pages/main/main";
import { SignupPage } from "../pages/auth/Signup";
import { LoginPage } from "../pages/auth/Login";
import { TabPage } from "../pages/main/Tab";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/main",
    element: <MainPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/tab",
    element: <TabPage />,
  }
]);