import UserAvatar from "./user-avatar";
import { ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import MenuContent from "./menu-content";

function DropDownMenu() {
  return (
    <>
      <Popover>
        <PopoverTrigger className="flex items-center gap-3">
          <UserAvatar />
          <ChevronDown />
        </PopoverTrigger>
        <PopoverContent className="z-30 flex w-full -translate-x-[10%] flex-col rounded-md bg-primary-foreground px-0 py-1 drop-shadow-xl">
          <MenuContent />
        </PopoverContent>
      </Popover>
    </>
  );
}

export default DropDownMenu;
