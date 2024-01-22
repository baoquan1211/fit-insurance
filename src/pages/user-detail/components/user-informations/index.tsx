import UserAvatar from "@/components/user-avatar";
import useUser from "@/hooks/useUser";
import UserContracts from "./user-contracts";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function UserInformation() {
  const { data: user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Thông tin cá nhân</h1>
        <Button
          variant={"outline"}
          onClick={() => navigate("/nguoi-dung/chinh-sua")}
        >
          Chỉnh sửa
        </Button>
      </div>
      <div className="mt-2 flex flex-col gap-4 lg:flex-row">
        <div className="flex gap-3 rounded-lg bg-background p-6">
          <div className="flex items-center gap-2">
            <UserAvatar />

            <div className="flex flex-col">
              <div className="font-medium">{user?.name}</div>
              <span className="text-sm text-slate-500">{user?.email}</span>
            </div>
          </div>
        </div>
        <UserContracts />
      </div>
      <div className="mt-6 flex w-full flex-col justify-between gap-y-6 rounded-lg bg-background p-6 lg:flex-row">
        <div className="flex flex-col">
          <div className="text-sm text-slate-500">Họ tên</div>
          {user?.name}
        </div>
        <div className="flex flex-col">
          <div className="text-sm text-slate-500">Email</div>
          {user?.email}
        </div>
        <div className="flex flex-col">
          <div className="text-sm text-slate-500">Số điện thoại</div>
          {user?.phone ? user?.phone : "Chưa cập nhật"}
        </div>
        <div className="flex flex-col">
          <div className="text-sm text-slate-500">CCCD</div>
          {user?.identityCard ? user?.identityCard : "Chưa cập nhật"}
        </div>
      </div>
    </div>
  );
}

export default UserInformation;
