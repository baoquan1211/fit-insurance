import { Button } from "@/components/ui/button";
import { logoutAction } from "@/stores/actions/auth";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import { useNavigate } from "react-router-dom";
import { SheetClose } from "@/components/ui/sheet";
import { useQueryClient } from "@tanstack/react-query";
import UserInfoField from "./user-info-field";

function MenuContent() {
  const queryClient = useQueryClient();
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <section>
      {auth.access !== null && <UserInfoField />}

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
          <SheetClose asChild>
            <Button
              variant={"ghost"}
              className="justify-between text-sm text-primary hover:bg-background hover:text-primary"
              onClick={() => {
                if (auth.refresh !== null) {
                  dispatch(logoutAction({ refreshToken: auth.refresh })).then(
                    () => {
                      queryClient.invalidateQueries();
                    },
                  );
                }
              }}
            >
              Đăng xuất
            </Button>
          </SheetClose>
        )}
      </div>
    </section>
  );
}

export default MenuContent;
