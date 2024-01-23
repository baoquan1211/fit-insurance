import InputField from "@/components/input-field";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/redux.hook";
import { useRef } from "react";
import { ZodError, z } from "zod";
import useChangePassword from "../../hooks/useChangePassword";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import LoadingPage from "@/components/loading-page";

const changePasswordSchema = z
  .object({
    email: z.string().email({ message: "Email không hợp lệ" }),
    password: z.string().min(6, {
      message: "Mật khẩu phải tối thiếu 6 ký tự",
    }),
    newPassword: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "Mật khẩu phải chứa ký tự hoa, ký tự thường và số",
      )
      .min(6, {
        message: "Mật khẩu phải tối thiếu 6 ký tự",
      }),
    confirmNewPassword: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "Mật khẩu chứa ít nhất một ký tự hoa và một ký tự thường",
      )
      .min(6, {
        message: "Mật khẩu phải tối thiếu 6 ký tự",
      }),
  })
  .refine((val) => val.newPassword == val.confirmNewPassword, {
    message: "Xác nhận lại mật khẩu không trùng khớp",
  })
  .refine((val) => val.password != val.newPassword, {
    message: "Mật khẩu mới không được trùng mật khẩu cũ",
  });

type ChangePasswordForm = z.infer<typeof changePasswordSchema>;

function ChangePassword() {
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const passwordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmNewPasswordRef = useRef<HTMLInputElement>(null);
  const { mutateAsync, isPending } = useChangePassword();
  const { toast } = useToast();
  const handleChangePassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      passwordRef.current &&
      newPasswordRef.current &&
      confirmNewPasswordRef.current
    ) {
      changePasswordSchema
        .parseAsync({
          email: auth.email,
          password: passwordRef.current.value,
          newPassword: newPasswordRef.current.value,
          confirmNewPassword: confirmNewPasswordRef.current.value,
        })
        .then((data: ChangePasswordForm) => {
          if (!isPending)
            mutateAsync({
              email: data.email,
              lastPassword: data.password,
              newPassword: data.newPassword,
            })
              .then(() => {
                toast({
                  variant: "success",
                  title: "Thành công",
                  description: "Đổi mật khẩu thành công",
                });
                navigate("/nguoi-dung");
              })
              .catch(() => {
                toast({
                  variant: "destructive",
                  title: "Có lỗi xảy ra!",
                  description: "Vui lòng thử lại sau!",
                });
              });
        })
        .catch((err: string) => {
          const error: ZodError[] = JSON.parse(err);
          toast({
            variant: "destructive",
            title: "Có lỗi xảy ra!",
            description: error[0].message,
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
        onSubmit={handleChangePassword}
        className="mt-2 rounded-lg bg-background p-6"
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <InputField
            placeholder="Mật khẩu cũ"
            label="Mặt khẩu cũ"
            type="password"
            inputRef={passwordRef}
          />
          <InputField
            placeholder="Mật khẩu mới"
            label="Mật khẩu mới"
            type="password"
            inputRef={newPasswordRef}
          />
          <InputField
            placeholder="Mật khẩu mới"
            label="Xác nhận mật khẩu mới"
            type="password"
            inputRef={confirmNewPasswordRef}
          />
        </div>
        <Button type="submit" className="mt-4 w-full md:w-fit">
          Xác nhận
        </Button>
      </form>
    </div>
  );
}

export default ChangePassword;
