import Footer from "./footer";
import Header from "./header";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/hooks/auth-hooks";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

function RootLayout() {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const WHITE_LIST: string[] = ["/login", "/register", "/"];

  useEffect(() => {
    if (!WHITE_LIST.includes(location.pathname)) {
      if (auth.access && auth.refresh && auth.status == "success") return;
      navigate("/login");
    }
  });

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <Toaster />
    </>
  );
}

export default RootLayout;
