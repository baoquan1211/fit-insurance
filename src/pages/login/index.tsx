import InputField from "@/components/input-field";
import { Button } from "@/components/ui/button";
import { loginAction } from "@/redux/actions/auth";
import { LoginResquest } from "@/services/auth";
import { useRef, useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { ZodError, z } from "zod";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/auth-hooks";
import { useNavigate } from "react-router-dom";
const loginSchema = z.object({
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(6, {
    message: "Mật khẩu phải tối thiếu 6 ký tự",
  }),
});

function LoginPage() {
  const auth = useAuth();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (auth.access && auth.refresh) {
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
          dispatch(loginAction(data));
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
      className="bg-gray-100 flex justify-center py-16"
    >
      <section className="bg-background h-fit p-12 rounded-xl flex flex-col gap-1 md:min-w-[500px]">
        <h1 className="text-xl font-semibold">Đăng nhập</h1>
        <h2 className="text-sm">Cung cấp thông tin cần thiết để đăng nhập</h2>
        <form className="flex flex-col gap-3 mt-6">
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
