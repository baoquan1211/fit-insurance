import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import MenuContent from "./menu-content";

function BurgerMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="h-fit bg-transparent p-0" variant={"link"}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="z-[1100] w-full rounded-tr-3xl p-0 drop-shadow-2xl"
      >
        <SheetHeader className="border-b-[1px] p-3 drop-shadow-md">
          <Link
            to={"/"}
            className="select-none text-[30px] font-extrabold text-primary"
          >
            fit<span className="text-foreground/95">@insurance</span>
          </Link>
        </SheetHeader>
        <MenuContent />
      </SheetContent>
    </Sheet>
  );
}

export default BurgerMenu;
