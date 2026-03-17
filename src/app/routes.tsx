import { createBrowserRouter } from "react-router";
import { LandingPage } from "../pages/home/index";
import { MainPage } from "../../src/components/section/layout/NavBar";
import { RegisterPage } from "../pages/auth/register";
import { LoginPage } from "../pages/auth/login";

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