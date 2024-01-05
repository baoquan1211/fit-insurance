import { Button } from "@/components/ui/button";
import { logoutAction } from "@/stores/actions/auth";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import useUser from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";
import { SheetClose } from "@/components/ui/sheet";
import { useQueryClient } from "@tanstack/react-query";

function MenuContent() {
  const queryClient = useQueryClient();
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { data: user } = useUser();
  const navigate = useNavigate();

  return (
    <section>
      {auth.access ? (
        <Button
          variant={"ghost"}
          className="h-fit w-full flex-col items-start justify-start rounded-none bg-primary/5 text-start text-lg hover:bg-primary/5"
        >
          <span className="text-base font-semibold">
            {user?.name.toUpperCase()}
          </span>
          <span className="text-sm font-normal text-slate-500">
            {user?.email}
          </span>
        </Button>
      ) : null}

      <div className="mt-2 flex flex-col gap-2">
        <SheetClose asChild>
          <Button
            variant={"ghost"}
            className="justify-between text-sm hover:bg-background hover:text-primary"
            onClick={() => navigate("/hopdong/quan-ly")}
          >
            Quản lý Hợp đồng bảo hiểm
          </Button>
        </SheetClose>

        {!auth.access ? (
          <SheetClose asChild>
            <Button
              variant={"ghost"}
              className="justify-between text-sm text-primary hover:bg-background hover:text-primary"
              onClick={() => navigate("/login")}
            >
              Đăng nhập/Đăng ký
            </Button>
          </SheetClose>
        ) : (
          <Button
            variant={"ghost"}
            className="justify-between text-sm text-primary hover:bg-background hover:text-primary"
            onClick={() => {
              if (auth.refresh !== null) {
                dispatch(logoutAction({ refreshToken: auth.refresh }));
                queryClient.invalidateQueries();
              }
            }}
          >
            Đăng xuất
          </Button>
        )}
      </div>
    </section>
  );
}

export default MenuContent;
