import { Outlet } from "react-router-dom";
import Footer from "./footer";

function FooterLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}
export default FooterLayout;
