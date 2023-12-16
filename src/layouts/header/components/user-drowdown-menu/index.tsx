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
        <HoverCardTrigger className="flex gap-3 items-center">
          <UserAvatar />
          <ChevronDown className="stroke-gray-" />
        </HoverCardTrigger>
        <HoverCardContent className="z-30 drop-shadow-xl bg-primary-foreground flex flex-col rounded-md py-2 -translate-x-[10%]">
          <Button variant={"ghost"} className="text-lg text-start">
            {auth.email}
          </Button>
          <Button
            variant={"ghost"}
            className="text-primary hover:text-primary text-lg justify-between"
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
