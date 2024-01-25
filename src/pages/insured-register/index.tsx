import AlertIcon from "@/components/alert-icon";
import { Button } from "@/components/ui/button";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { InsuranceRegistrationState } from "../insurance/components/product-list/insurance-fee-form";
import InputField from "@/components/input-field";
import { convertGender } from "@/lib/utils";
import { useAppSelector } from "@/hooks/redux.hook";
import ProvinceCombox from "./components/province-combobox";
import DistrictCombox from "./components/district-combobox";
import WardCombobox from "./components/ward-combobox";
import { ZodError, z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import useCreateContract from "./hooks/useCreateContract";
import LoadingPage from "@/components/loading-page";

const ErrorPage = React.lazy(() => import("@/components/error-page"));

const contractCreationSchema = z.object({
  buyer: z.string().email({ message: "Email của người mua không hợp lệ" }),
  name: z
    .string()
    .regex(/^[A-Z\s]+$/, "Tên in hoa không chứa dấu hay ký tự đặc biệt")
    .min(4, { message: "Tên phải đầy đủ họ tên" }),
  birthdate: z.string(),
  gender: z.string(),
  phone: z
    .string()
    .regex(/^[0-9]+$/, "Số điện thoại không chứa ký tự đặc biệt")
    .min(9, { message: "Số điện thoại tối thiểu 9 ký tự" })
    .max(12, { message: "Số điện thoại tối đa 11 ký tự" }),
  identityCard: z
    .string()
    .regex(/^[0-9]+$/, "Căn cước công dân không chứa ký tự đặc biệt")
    .length(12, { message: "Căn cước công dân phải đủ 12 số" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  street: z
    .string()
    .min(1, { message: "Vui lòng nhập đầy đủ số nhà và đường" }),
  ward: z.number().int({ message: "Vui lòng chọn Phường/Xã" }),
  district: z.number().int({ message: "Vui lòng chọn Quận/Huyện" }),
  province: z.number().int({ message: "Vui lòng chọn Tỉnh/Thành phố" }),
  insurance: z.number().int(),
  startAt: z.string(),
});

export type ContractCreation = z.infer<typeof contractCreationSchema>;

function InsuredRegisterPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth);
  const formState = location.state as InsuranceRegistrationState;
  const { mutateAsync, isPending } = useCreateContract();
  const { toast } = useToast();

  const [province, setProvince] = React.useState<number | string | undefined>();
  const [district, setDistrict] = React.useState<number | string | undefined>();
  const [ward, setWard] = React.useState<number | string | undefined>();
  const streetRef = React.useRef<HTMLInputElement>(null);

  const nameRef = React.useRef<HTMLInputElement>(null);
  const birthdateRef = React.useRef<HTMLInputElement>(null);
  const phoneRef = React.useRef<HTMLInputElement>(null);
  const identityCardRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);

  if (formState === null) return <ErrorPage />;

  const sumbitHandle = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    if (
      nameRef.current &&
      birthdateRef.current &&
      phoneRef.current &&
      identityCardRef.current &&
      emailRef.current &&
      streetRef.current
    ) {
      contractCreationSchema
        .parseAsync({
          buyer: user.email,
          name: nameRef.current.value.toUpperCase(),
          birthdate: birthdateRef.current.value,
          gender: formState.gender,
          phone: phoneRef.current.value,
          identityCard: identityCardRef.current.value,
          email: emailRef.current.value,
          street: streetRef.current.value,
          ward: ward,
          district: district,
          province: province,
          insurance: formState.insuranceId,
          startAt: formState.startDate,
        })
        .then((data: ContractCreation) => {
          if (!isPending)
            mutateAsync(data)
              .then((contract) => {
                if (contract?.id) navigate(`/hopdong/chi-tiet/${contract?.id}`);
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
    <main className="relative flex min-h-[calc(100dvh-72px)] w-full flex-col items-center bg-muted px-3 py-6 md:py-16">
      {isPending ? <LoadingPage isLayout={true} /> : null}
      <section>
        <h1 className="mb-4 self-start text-2xl font-semibold">
          Đăng ký thông tin
        </h1>
        <form
          onSubmit={sumbitHandle}
          className="flex flex-col gap-1 md:gap-6 lg:flex-row"
        >
          <div className="flex flex-col rounded-lg bg-background p-6 md:min-w-max lg:max-w-3xl">
            <h2 className="text-xl font-semibold">
              Thông tin Người được bảo hiểm
            </h2>
            {formState?.insuranceOwner === "self" && (
              <p className="mt-1 text-sm text-slate-600">
                Người được bảo hiểm đồng thời là Người mua bảo hiểm
              </p>
            )}
            <div className="mt-6 rounded-lg border-[1px] border-primary bg-primary/5 p-2 text-xs font-normal text-primary">
              Số giấy tờ tuỳ thân, số điện thoại và email được dùng để đăng nhập
              và quản lý hợp đồng
            </div>
            <div className="mt-6 flex max-w-2xl flex-wrap justify-between gap-6">
              <InputField
                label="Họ và tên (không dấu)"
                placeholder="Nhập"
                className="w-full text-base uppercase placeholder:capitalize md:w-[320px]"
                inputRef={nameRef}
              />
              <InputField
                label="Ngày sinh"
                placeholder="Nhập"
                disable
                defaultValue={formState.birthdate}
                className="w-full text-base md:w-[320px]"
                inputRef={birthdateRef}
              />
              <InputField
                label="Giới tính"
                placeholder="Nhập"
                disable
                defaultValue={convertGender(formState.gender)}
                className="w-full text-base md:w-[320px]"
              />
              <InputField
                label="Số điện thoại"
                placeholder="Nhập"
                className="w-full text-base md:w-[320px]"
                inputRef={phoneRef}
              />
              <InputField
                label="Số căn cước công dân"
                placeholder="Nhập"
                className="w-full text-base md:w-[320px]"
                inputRef={identityCardRef}
              />
              <InputField
                label="Email"
                placeholder="Nhập"
                type="email"
                defaultValue={
                  formState.insuranceOwner === "self" ? user.email! : ""
                }
                disable={formState.insuranceOwner === "self"}
                className="w-full text-base md:w-[320px]"
                inputRef={emailRef}
              />
              <div className="flex w-full flex-col gap-6">
                <h4 className="text-lg font-medium">Địa chỉ liên lạc</h4>
                <div className="flex w-full flex-col justify-between gap-3 md:flex-row">
                  <ProvinceCombox setProvince={setProvince} />
                  <DistrictCombox
                    setDistrict={setDistrict}
                    provinceId={province as number}
                  />
                  <WardCombobox
                    districtId={district as number}
                    setWard={setWard}
                  />
                </div>
                <InputField
                  label="Địa chỉ (số nhà, đường,...)"
                  placeholder="Nhập"
                  className="w-full text-base"
                  inputRef={streetRef}
                />
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 left-0 flex h-fit w-full flex-col gap-4 rounded-lg bg-background p-3 md:p-6 lg:max-w-xs">
            <div className="flex gap-2">
              <AlertIcon width={24} height={24} />
              <p className="text-justify text-sm">
                Bằng việc bấm “Tiếp tục”, tôi xác nhận toàn bộ thông tin cung
                cấp là đúng sự thật. Nếu có gì sai xót, tôi hoàn toàn chịu trách
                nhiệm trước pháp luật.
              </p>
            </div>
            <Button type="submit">Tiếp tục</Button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default InsuredRegisterPage;
