import InputField from "@/components/input-field";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { ZodError, z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import useRegister from "./hooks/useRegister";
import { ErrorResponse, SuccessResponse } from "@/services";
import LoadingPage from "@/components/loading-page";

const registerSchema = z
  .object({
    name: z
      .string()
      .regex(/^[A-Z\s]+$/, "Tên in hoa không chứa dấu hay ký tự đặc biệt"),
    email: z.string().email({ message: "Email không hợp lệ" }),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "Mật khẩu phải chứa ký tự hoa, ký tự thường và số",
      )
      .min(6, {
        message: "Mật khẩu phải tối thiếu 6 ký tự",
      }),
    confirmPassword: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "Mật khẩu chứa ít nhất một ký tự hoa và một ký tự thường",
      )
      .min(6, {
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
  const { mutateAsync, isPending } = useRegister();
  const { toast } = useToast();

  const handleLogin = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    if (
      emailRef.current &&
      passwordRef.current &&
      nameRef.current &&
      confirmPasswordRef.current
    ) {
      registerSchema
        .parseAsync({
          name: nameRef.current.value.toUpperCase() as string,
          email: emailRef.current.value as string,
          password: passwordRef.current.value as string,
          confirmPassword: confirmPasswordRef.current.value as string,
        })
        .then((data) => {
          if (!isPending)
            mutateAsync(data).then(
              (res: ErrorResponse & SuccessResponse<unknown>) => {
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
                    variant: "success",
                    title: "Đăng ký thành công",
                    description: "Vui lòng tiến hành đăng nhập",
                  });
                  navigate("/login");
                }
              },
            );
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
      onSubmit={handleLogin}
      className="flex h-[calc(100dvh-72px)] justify-center bg-gray-100 py-16"
    >
      {isPending ? <LoadingPage isLayout={true} /> : null}
      <section className="flex h-fit flex-col gap-1 rounded-xl bg-background p-12 md:min-w-[500px]">
        <h2 className="text-xl font-semibold">Đăng ký tài khoản</h2>
        <h3 className="text-sm">
          Xin vui lòng điền các trường thông tin chính xác nhất để mở tài khoản
        </h3>
        <form className="mt-6 flex flex-col gap-3">
          <InputField
            placeholder="Họ và tên"
            label="Họ và tên"
            name={"name"}
            inputRef={nameRef}
            className="uppercase placeholder:normal-case"
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
            Đăng ký
          </Button>
        </form>
      </section>
    </main>
  );
}

export default RegisterPage;
