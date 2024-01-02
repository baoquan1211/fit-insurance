import { formatDate, convertGender, numberToCurrency } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AlertIcon from "@/components/alert-icon";
import { Button } from "@/components/ui/button";
import useFetchContractById from "@/hooks/useFetchContractById";
import { useParams } from "react-router-dom";
import useFetchInsuranceTypeById from "@/hooks/useFetchInsuranceTypeById";
import useFetchInsuranceById from "@/hooks/useFetchInsuranceById";
import ContractStatusField from "./components/contract-status";
import PaymentBox from "./components/payment-box";

type InsuredPersonInfo = {
  key: string;
  title: string;
  type?: "string" | "date" | "gender";
};

const insuredPersonInfo: InsuredPersonInfo[] = [
  { key: "name", title: "Họ và tên" },
  { key: "birthdate", title: "Ngày sinh", type: "date" },
  { key: "gender", title: "Giới tính", type: "gender" },
  { key: "identityCard", title: "Số Căn cước công dân" },
  { key: "phone", title: "Số điện thoại" },
  { key: "email", title: "Email" },
  { key: "address", title: "Địa chỉ liên lạc" },
];

function ContractDetail() {
  const { id } = useParams();
  const { data: contract } = useFetchContractById(Number(id));

  const { data: insurance } = useFetchInsuranceById(
    Number(contract?.insurance.id),
  );
  const { data: insuranceType } = useFetchInsuranceTypeById(
    Number(insurance?.insuranceTypeId),
  );

  if (contract) {
    return (
      <main className="relative flex min-h-[calc(100dvh-72px)] w-full flex-col items-center bg-gray-100 px-3 py-6 md:py-16">
        <section>
          <h1 className="mb-4 w-fit self-start text-2xl font-semibold">
            Thông tin hợp đồng
          </h1>
          <div className="flex flex-col gap-1 md:gap-6 lg:flex-row">
            <div className="flex w-fit flex-col gap-6">
              <div className="flex max-w-3xl flex-col gap-4 rounded-lg bg-background p-6">
                <h2 className="text-xl font-semibold">Sản phẩm bảo hiểm</h2>
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-2 items-center md:flex md:gap-14">
                    <div className="w-28 text-sm font-medium text-slate-500 md:w-40">
                      Mã hợp đồng
                    </div>
                    <div>{contract?.id}</div>
                  </div>
                  <div className="grid grid-cols-2 items-center md:flex md:gap-14">
                    <div className="w-28 text-sm font-medium text-slate-500 md:w-40">
                      {insuranceType?.name}
                    </div>
                    <div>Bảo hiểm sức khỏe</div>
                  </div>
                  {contract?.status !== "INITIAL" ? (
                    <div className="grid grid-cols-2 items-center md:flex md:gap-14">
                      <div className="w-28 text-sm font-medium text-slate-500 md:w-40">
                        Trạng thái
                      </div>
                      <ContractStatusField contract={contract} />
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="flex max-w-3xl flex-col gap-4 rounded-lg bg-background p-6">
                <h2 className="text-xl font-semibold">
                  Thông tin chương trình bảo hiểm
                </h2>
                <div className="flex items-center gap-12 rounded-md border-[1px] border-gray-100 p-3">
                  <span className="text-sm font-medium text-slate-500">
                    Chương trình bảo hiểm
                  </span>
                  <div className="flex items-center gap-3">
                    <img
                      src={insurance?.logo}
                      className="size-8"
                      alt="insurance"
                    />
                    {insurance?.name}
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-2 items-center md:flex md:gap-14">
                    <div className="w-28 text-sm font-medium text-slate-500 md:w-40">
                      Thời hạn bảo hiểm
                    </div>
                    <div className="break-words">
                      {formatDate(contract?.startAt as string)} {" - "}{" "}
                      {formatDate(contract?.endAt as string)}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-center md:flex md:gap-14">
                    <div className="w-28 text-sm font-medium text-slate-500 md:w-40">
                      Tổng phí
                    </div>
                    <div className="break-words">
                      {numberToCurrency(contract?.price as number)}đ
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex max-w-3xl flex-col gap-4 rounded-lg bg-background p-6">
                <h2 className="text-xl font-semibold">
                  Thông tin người được bảo hiểm
                </h2>
                <div className="flex flex-col gap-6">
                  {insuredPersonInfo.map((info) => (
                    <div
                      className="grid grid-cols-2 items-center md:flex md:gap-14"
                      key={info.key}
                    >
                      <div className="w-28 text-sm font-medium text-slate-500 md:w-40">
                        {info.title}
                      </div>
                      <div className="max-w-[480px] overflow-clip text-wrap">
                        {info.type == "gender"
                          ? convertGender(contract[info.key])
                          : info.type == "date"
                            ? formatDate(contract[info.key])
                            : contract[info.key]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {contract?.status === "INITIAL" ||
            contract?.status === "INITIAL" ? (
              <PaymentBox contract={contract} />
            ) : (
              <div className="sticky bottom-0 left-0 flex h-fit w-full flex-row gap-3 rounded-lg bg-background p-3 md:p-6 lg:w-fit lg:flex-col">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="font-me w-full border-[1px] border-primary text-primary hover:bg-primary/5 hover:text-primary lg:w-[250px]"
                    >
                      Mua lại
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="flex flex-col items-center">
                    <AlertIcon height={48} width={48} />
                    <DialogHeader>
                      <DialogTitle>Không đủ điều kiện mua bảo hiểm</DialogTitle>
                      <DialogDescription>
                        Lịch sử bệnh lý của Người được bảo hiểm chưa đảm bảo
                        điều kiện tham gia bảo hiểm sức khỏe
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex w-full gap-1">
                      <Button
                        variant={"outline"}
                        className="flex-1 border-primary text-primary hover:bg-primary/5 hover:text-primary"
                      >
                        Quay về trang chủ
                      </Button>

                      <Button className="flex-1">
                        Thay đổi Người được bảo hiểm
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button
                  variant={"outline"}
                  className="w-full border-[1px] border-primary font-medium text-primary hover:bg-primary/5 hover:text-primary lg:w-[250px]"
                >
                  Xóa
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
    );
  }
}

export default ContractDetail;
