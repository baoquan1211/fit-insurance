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
      className="flex h-[72px] w-full items-center justify-between overflow-hidden bg-white px-6 font-sans md:px-8"
      id="header"
    >
      <a href={"/"} className="flex select-none gap-1 text-primary ">
        <img src="/logo.svg" alt="logo" height={28} width={28} />
        <span className="font-mplus text-[20px] font-extrabold text-foreground/95 md:text-[28px]">
          insurance
        </span>
      </a>
      <div className="hidden gap-6 md:flex">
        {auth.access === null ? (
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
              onClick={() => navigate("/hopdong/quan-ly")}
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
