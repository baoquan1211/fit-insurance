import { Button } from "@/components/ui/button";
import { logoutAction } from "@/stores/actions/auth";
import { useAppDispatch } from "@/hooks/redux.hook";
import useUser from "@/hooks/useUser";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function MenuContent() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: user } = useUser();
  const queryClient = useQueryClient();

  return (
    <>
      <Button
        variant={"ghost"}
        className="h-fit min-w-[360px] flex-col items-start justify-start text-start text-lg"
        onClick={() => navigate("/nguoi-dung")}
      >
        <span className="text-base font-semibold">
          {user?.name.toUpperCase()}
        </span>
        <span className="text-sm font-normal text-slate-500">
          {user?.email}
        </span>
      </Button>
      <Button
        variant={"ghost"}
        className="justify-between text-sm text-primary hover:text-primary"
        onClick={() => {
          dispatch(logoutAction()).then(() => {
            queryClient.invalidateQueries();
          });
        }}
      >
        Đăng xuất
      </Button>
    </>
  );
}

export default MenuContent;
