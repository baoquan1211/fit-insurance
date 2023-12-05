import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth-hooks";
import UserDropDownMenu from "./components/user-drowdown-menu";

function Header() {
  const auth = useAuth();

  return (
    <header
      className="h-20 w-full flex items-center justify-between md:px-8 px-3 bg-primary-foreground font-sans overflow-hidden"
      id="header"
    >
      <Link
        to={"/"}
        className="font-extrabold text-2xl md:text-3xl text-primary select-none"
      >
        fit<span className="text-foreground/95">@insurance</span>
      </Link>
      {!auth.access ? (
        <Link to={"/login"}>
          <Button
            variant={"outline"}
            className="text-primary border-[1px] border-primary hover:text-primary"
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
