import { createBrowserRouter } from "react-router";
import { LandingPage } from "../pages/home/index";
import { MainPage } from "../../src/components/section/layout/NavBar";
import { RegisterPage } from "../pages/auth/Signup";
import { LoginPage } from "../pages/auth/Login";

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
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);