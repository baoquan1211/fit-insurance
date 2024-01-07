import InputField from "@/components/input-field";
import { Button } from "@/components/ui/button";
import { loginAction } from "@/stores/actions/auth";
import { LoginResquest, LoginSuccess } from "@/services/auth";
import { useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import { ZodError, z } from "zod";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { type ApiResponse } from "@/services";

const loginSchema = z.object({
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(6, {
    message: "Mật khẩu phải tối thiếu 6 ký tự",
  }),
});

function LoginPage() {
  const auth = useAppSelector((state) => state.auth);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (auth.access) {
      navigate("/");
    }
  });

  const loginHandle = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    if (emailRef.current && passwordRef.current) {
      loginSchema
        .parseAsync({
          email: emailRef.current.value as string,
          password: passwordRef.current.value as string,
        })
        .then((data: LoginResquest) => {
          dispatch(loginAction(data)).then((res) => {
            const data = res.payload as ApiResponse<LoginSuccess>;

            if (data.status && data.status >= 400) {
              toast({
                variant: "destructive",
                title: "Có lỗi xảy ra!",
                description:
                  "Thông tin đăng nhập không chính xác hoặc chưa tồn tại.",
              });
              return;
            }
            if (data.status === undefined) {
              toast({
                variant: "destructive",
                title: "Có lỗi xảy ra!",
                description: "Không thể kết nối với máy chủ.",
              });
              return;
            }
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
    <main
      onSubmit={loginHandle}
      className="flex h-[calc(100dvh-72px)] justify-center bg-gray-100 py-16"
    >
      <section className="flex h-fit flex-col gap-1 rounded-xl bg-background p-16 md:min-w-[500px]">
        <h2 className="text-xl font-semibold">Đăng nhập</h2>
        <h3 className="text-sm">Cung cấp thông tin cần thiết để đăng nhập</h3>
        <form className="mt-6 flex flex-col gap-3">
          <InputField
            placeholder="Email"
            label="Email đã đăng ký tài khoản"
            name={"email"}
            inputRef={emailRef}
          />
          <InputField
            placeholder="Mật khẩu"
            label="Mặt khẩu tài khoản"
            name={"password"}
            type="password"
            inputRef={passwordRef}
          />
          <span className="text-xs">
            Chưa có tài khoản? Vui lòng đăng ký{" "}
            <Link to="/register" className="text-primary">
              tại đây
            </Link>
            .
          </span>
          <Button type="submit" className="self-end">
            Đăng nhập
          </Button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
