import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import useUser from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";

function UserInfoField() {
  const { data: user } = useUser();
  const navigate = useNavigate();

  return (
    <SheetClose asChild>
      <Button
        variant={"ghost"}
        className="h-fit w-full flex-col items-start justify-start rounded-none bg-primary/5 text-start text-lg hover:bg-primary/5"
        onClick={() => navigate("/nguoi-dung")}
      >
        <span className="text-base font-semibold">{user?.name}</span>
        <span className="text-sm font-normal text-slate-500">
          {user?.email}
        </span>
      </Button>
    </SheetClose>
  );
}

export default UserInfoField;
