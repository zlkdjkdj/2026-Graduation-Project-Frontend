import Home from "../pages/Home";

import type { RouteObject } from "react-router-dom";

// 모든 페이지 경로(Route)를 정의하는 리스트
export const routes : RouteObject[] = [
  {
    path : "/", 
    element : <Home />
  },
]