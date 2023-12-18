import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth.hook";
import UserDropDownMenu from "./components/user-drowdown-menu";

function Header() {
  const auth = useAuth();

  return (
    <header
      className="flex h-[72px] w-full items-center justify-between overflow-hidden bg-white px-3 font-sans md:px-8"
      id="header"
    >
      <Link
        to={"/"}
        className="select-none text-2xl font-extrabold text-primary md:text-3xl"
      >
        fit<span className="text-foreground/95">@insurance</span>
      </Link>
      {!auth.access ? (
        <Link to={"/login"}>
          <Button
            variant={"outline"}
            className="border-[1px] border-primary text-primary hover:text-primary"
          >
            {"Đăng nhập/Đăng ký"}
          </Button>
        </Link>
      ) : (
        <UserDropDownMenu />
      )}
    </header>
  );
}

export default Header;
