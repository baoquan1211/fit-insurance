import InputField from "@/components/input-field";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import React, { useRef } from "react";
import { Camera } from "lucide-react";
import useUser from "@/hooks/useUser";
import { useSignal } from "@preact/signals-react";
import useUpdateUserInfo from "../../hooks/useUpdateUserInfo";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import LoadingPage from "@/components/loading-page";

function UserChangeInformation() {
  const { data: user } = useUser();
  const avatarFile = useSignal<File | null>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const identifyCardRef = useRef<HTMLInputElement>(null);
  const { mutateAsync, isPending } = useUpdateUserInfo();
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleChangeInfo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (phoneRef.current && identifyCardRef.current && !isPending) {
      mutateAsync({
        email: user?.email as string,
        phone: phoneRef.current.value,
        avatar: avatarFile.value as File,
        identityCard: identifyCardRef.current.value,
      })
        .then(() => {
          toast({
            variant: "success",
            title: "Thành công",
            description: "Thay đổi thông tin người dùng thành công",
          });
          queryClient.invalidateQueries({ queryKey: ["user"] });
          navigate("/nguoi-dung");
        })
        .catch(() => {
          toast({
            variant: "destructive",
            title: "Có lỗi xảy ra!",
            description: "Vui lòng thử lại sau!",
          });
        });
    }
  };

  return (
    <div className="w-full">
      {isPending ? <LoadingPage isLayout={true} /> : null}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Thay đổi mật khẩu</h1>
      </div>
      <form
        onSubmit={handleChangeInfo}
        className="mt-2 rounded-lg bg-background p-6"
      >
        <div className="relative w-fit">
          {avatarFile.value !== null ? (
            <img
              src={URL.createObjectURL(avatarFile.value)}
              className="size-20 rounded-full border-2 border-primary"
            />
          ) : (
            <UserAvatar className="h-20 w-20 text-3xl" />
          )}
          <button className="absolute bottom-0 right-0 z-10 rounded-full p-1 hover:bg-primary/20">
            <Camera className="size-full cursor-pointer text-primary" />
            <input
              type="file"
              className="absolute bottom-0 right-0 z-20 h-8 w-8 cursor-pointer opacity-0"
              accept="image/*"
              onChange={(event) => {
                if (
                  event.target.files !== null &&
                  event.target.files[0] !== undefined
                )
                  avatarFile.value = event.target.files[0];
              }}
            />
          </button>
        </div>

        <div className="mt-2 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <InputField
            placeholder="Số điện thoại"
            label="Số điện thoại"
            defaultValue={user?.phone}
            inputRef={phoneRef}
          />
          <InputField
            placeholder="Căn cước công dân"
            label="Căn cước công dân"
            defaultValue={user?.identityCard}
            inputRef={identifyCardRef}
          />
        </div>
        <Button type="submit" className="mt-4 w-full md:w-fit">
          Xác nhận
        </Button>
      </form>
    </div>
  );
}

export default UserChangeInformation;
