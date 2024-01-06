import Header from "./header";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import AutoScrollUpNavigateWrapper from "@/components/auto-scroll-up-navigate-wrapper";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "@/components/error-page";
import { useAppSelector } from "@/hooks/redux.hook";

function RootLayout() {
  const auth = useAppSelector((state) => state.auth);
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
      <ErrorBoundary fallback={<ErrorPage />}>
        <Outlet />
      </ErrorBoundary>
      <Toaster />
    </AutoScrollUpNavigateWrapper>
  );
}

export default RootLayout;
