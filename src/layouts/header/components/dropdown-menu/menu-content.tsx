import { Button } from "@/components/ui/button";
import { logoutAction } from "@/stores/actions/auth";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import useUser from "@/hooks/useUser";

function MenuContent() {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { data: user } = useUser();

  return (
    <>
      <Button
        variant={"ghost"}
        className="h-fit min-w-[360px] flex-col items-start justify-start text-start text-lg"
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
          if (auth.refresh !== null)
            dispatch(logoutAction({ refreshToken: auth.refresh }));
        }}
      >
        Đăng xuất
      </Button>
    </>
  );
}

export default MenuContent;
