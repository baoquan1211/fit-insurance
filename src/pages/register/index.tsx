import InputField from "@/components/input-field";
import { Button } from "@/components/ui/button";
import { LoginResquest } from "@/services/auth";
import { Suspense, useRef } from "react";
import { z } from "zod";
import { Link } from "react-router-dom";

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
        .then((data: LoginResquest) => {
          console.log(data);
        })
        .catch((e) => console.log(JSON.parse(e)));
    }
  };

  return (
    <Suspense fallback={<>Loading</>}>
      <main
        onSubmit={loginHandle}
        className="bg-gray-100 flex justify-center py-16"
      >
        <section className="bg-background h-fit p-12 rounded-xl flex flex-col gap-1 md:min-w-[500px]">
          <h1 className="text-xl font-semibold">Đăng ký tài khoản</h1>
          <h2 className="text-sm">
            Xin vui lòng điền các trường thông tin chính xác nhất để mở tài
            khoản
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
              inputRef={passwordRef}
            />
            <InputField
              placeholder="Xác nhận lại mật khẩu"
              label="Xác nhận lại mật khẩu"
              name={"confirmPassword"}
              inputRef={confirmPasswordRef}
            />
            <span className="text-xs">
              Đã có tài khoản. Vui lòng{" "}
              <Link to="/login" className="text-primary">
                tại đây
              </Link>
              .
            </span>
            <Button className="self-end">Đăng nhập</Button>
          </form>
        </section>
      </main>
    </Suspense>
  );
}

export default RegisterPage;
