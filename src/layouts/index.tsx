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
  const WHITE_LIST: string[] = ["/login", "/register", "/baohiem"];

  useEffect(() => {
    if (
      !WHITE_LIST.reduce(
        (state, current) => state || location.pathname.startsWith(current),
        false
      ) &&
      location.pathname != "/"
    ) {
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
