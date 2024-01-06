import { Button } from "@/components/ui/button";
import useUser from "@/hooks/useUser";

function UserInfoField() {
  const { data: user } = useUser();

  return (
    <Button
      variant={"ghost"}
      className="h-fit w-full flex-col items-start justify-start rounded-none bg-primary/5 text-start text-lg hover:bg-primary/5"
    >
      <span className="text-base font-semibold">
        {user?.name.toUpperCase()}
      </span>
      <span className="text-sm font-normal text-slate-500">{user?.email}</span>
    </Button>
  );
}

export default UserInfoField;
