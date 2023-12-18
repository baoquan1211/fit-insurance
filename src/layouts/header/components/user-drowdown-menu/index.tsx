import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import UserAvatar from "./user-avatar";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth.hook";
import { LogOut } from "lucide-react";
import { logoutAction } from "@/stores/actions/auth";
import { useAppDispatch } from "@/hooks/redux.hook";

function UserDropDownMenu() {
  const auth = useAuth();
  const dispatch = useAppDispatch();

  return (
    <>
      <HoverCard openDelay={100}>
        <HoverCardTrigger className="flex items-center gap-3">
          <UserAvatar />
          <ChevronDown className="stroke-gray-" />
        </HoverCardTrigger>
        <HoverCardContent className="z-30 flex -translate-x-[10%] flex-col rounded-md bg-primary-foreground py-2 drop-shadow-xl">
          <Button variant={"ghost"} className="text-start text-lg">
            {auth.email}
          </Button>
          <Button
            variant={"ghost"}
            className="justify-between text-lg text-primary hover:text-primary"
            onClick={() => {
              if (auth.refresh !== null)
                dispatch(logoutAction({ refreshToken: auth.refresh }));
            }}
          >
            Đăng xuất <LogOut />
          </Button>
        </HoverCardContent>
      </HoverCard>
    </>
  );
}

export default UserDropDownMenu;
