import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DropDownMenu from "./components/dropdown-menu";
import { useAppSelector } from "@/hooks/redux.hook";
import BurgerMenu from "./components/burger-menu";
function Header() {
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <header
      className="flex h-[72px] w-full items-center justify-between overflow-hidden bg-white px-3 font-sans md:px-8"
      id="header"
    >
      <a
        href={"/"}
        className="select-none text-2xl font-extrabold text-primary md:text-3xl"
      >
        fit<span className="text-foreground/95">@insurance</span>
      </a>
      <div className="hidden gap-6 md:flex">
        {!auth.access ? (
          <Button
            variant={"outline"}
            className="border-[1px] border-primary text-primary hover:text-primary"
            onClick={() => navigate("login")}
          >
            {"Đăng nhập/Đăng ký"}
          </Button>
        ) : (
          <>
            <Button
              variant={"outline"}
              className="border-[1px] border-primary text-primary hover:text-primary"
            >
              Quản lý hợp đồng
            </Button>
            <DropDownMenu />
          </>
        )}
      </div>
      <div className="md:hidden">
        <BurgerMenu />
      </div>
    </header>
  );
}

export default Header;
