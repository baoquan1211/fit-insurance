import { Outlet } from "react-router-dom";
import Footer from "./footer";

function FooterLayout() {
  return (
    <div className="flex h-full min-h-[calc(100dvh-72px)] flex-col">
      <Outlet />
      <Footer />
    </div>
  );
}
export default FooterLayout;
