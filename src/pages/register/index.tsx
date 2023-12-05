import InputField from "@/components/input-field";
import { Button } from "@/components/ui/button";
import { RegisterResquest } from "@/services/auth";
import { useRef } from "react";
import { ZodError, z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/services/auth";
import { DataResponse } from "@/services";

const registerSchema = z
  .object({
    name: z.string(),
    email: z.string().email({ message: "Email không hợp lệ" }),
    password: z.string().min(6, {
      message: "Mật khẩu phải tối thiếu 6 ký tự",
    }),
    confirmPassword: z.string().min(6, {
      message: "Mật khẩu phải tối thiếu 6 ký tự",
    }),
  })
  .refine((val) => val.password == val.confirmPassword, {
    message: "Xác nhận lại mật khẩu không trùng khớp",
  });

function RegisterPage() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: (data: RegisterResquest) => register(data),
  });
  const { toast } = useToast();

  const loginHandle = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    if (
      emailRef.current &&
      passwordRef.current &&
      nameRef.current &&
      confirmPasswordRef.current
    ) {
      registerSchema
        .parseAsync({
          name: nameRef.current.value as string,
          email: emailRef.current.value as string,
          password: passwordRef.current.value as string,
          confirmPassword: confirmPasswordRef.current.value as string,
        })
        .then((data) => {
          if (!isPending)
            mutateAsync(data).then((res: DataResponse) => {
              if (res.status >= 400) {
                toast({
                  variant: "destructive",
                  title: "Có lỗi xảy ra!",
                  description:
                    res.message == "The email is existed"
                      ? "Email đã tồn tại. Vui lòng điền email khác."
                      : res.message,
                });
                return;
              }
              if (res.status === 201) {
                toast({
                  title: "Đăng ký thành công",
                  description: "Vui lòng tiến hành đăng nhập",
                });
                navigate("/login");
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
      className="bg-gray-100 flex justify-center py-16"
    >
      <section className="bg-background h-fit p-12 rounded-xl flex flex-col gap-1 md:min-w-[500px]">
        <h1 className="text-xl font-semibold">Đăng ký tài khoản</h1>
        <h2 className="text-sm">
          Xin vui lòng điền các trường thông tin chính xác nhất để mở tài khoản
        </h2>
        <form className="flex flex-col gap-3 mt-6">
          <InputField
            placeholder="Họ và tên"
            label="Họ và tên"
            name={"name"}
            inputRef={nameRef}
          />
          <InputField
            placeholder="Email"
            label="Email đăng ký tài khoản"
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
          <InputField
            placeholder="Xác nhận lại mật khẩu"
            label="Xác nhận lại mật khẩu"
            name={"confirmPassword"}
            type="password"
            inputRef={confirmPasswordRef}
          />
          <span className="text-xs">
            Đã có tài khoản. Vui lòng{" "}
            <Link to="/login" className="text-primary">
              tại đây
            </Link>
            .
          </span>
          <Button type="submit" disabled={isPending} className="self-end">
            Đăng nhập
          </Button>
        </form>
      </section>
    </main>
  );
}

export default RegisterPage;
