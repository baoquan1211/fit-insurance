import { Button } from "../ui/button";

function Header() {
  return (
    <header className="h-20 w-screen flex items-center justify-between px-8 bg-primary-foreground font-sans overflow-hidden">
      <h1 className="font-extrabold text-3xl text-primary">
        fit<span className="text-foreground/80">@insurance</span>
      </h1>
      <Button
        variant={"outline"}
        className="text-primary border-[1px] border-primary hover:text-primary"
      >
        {"Đăng nhập/Đăng ký"}
      </Button>
    </header>
  );
}

export default Header;
