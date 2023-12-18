import Header from "./header";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/hooks/auth.hook";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import AutoScrollUpNavigateWrapper from "@/components/auto-scroll-up-navigate-wrapper";

function RootLayout() {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const WHITE_LIST: string[] = [
    "/login",
    "/register",
    "/baohiem/",
    "cau-hoi-suc-khoe",
  ];

  useEffect(() => {
    if (
      !WHITE_LIST.reduce(
        (state, current) => state || location.pathname.startsWith(current),
        false,
      ) &&
      location.pathname != "/"
    ) {
      if (auth.access && auth.refresh && auth.status == "success") return;
      navigate("/login");
    }
  });

  return (
    <AutoScrollUpNavigateWrapper>
      <Header />
      <Outlet />
      <Toaster />
    </AutoScrollUpNavigateWrapper>
  );
}

export default RootLayout;
