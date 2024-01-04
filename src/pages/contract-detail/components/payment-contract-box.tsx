import { Button } from "@/components/ui/button";
import { numberToCurrency } from "@/lib/utils";
import { Contract } from "@/services/app/contract";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import useFetchPaymentUrl from "../hooks/useGetPaymentUrl";
import { ContractStatus, handleStatusContract } from "..";

type PaymentContractBoxProps = {
  contract: Contract;
};

function PaymentContractBox({ contract }: PaymentContractBoxProps) {
  const { mutateAsync } = useFetchPaymentUrl();

  const handlePayment = async () => {
    try {
      const url = await mutateAsync({ contractId: contract?.id });
      console.log(url);
      if (url) window.location.href = url;
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="sticky bottom-0 left-0 flex h-fit w-full min-w-[300px] flex-col gap-4 rounded-lg bg-background p-3 md:p-6 lg:w-fit">
      <div className="flex flex-row items-center justify-between gap-3 md:flex-col md:items-start">
        <h3 className="text-sm font-medium text-slate-500">Tổng phí</h3>
        <div className="text-2xl font-semibold">
          {numberToCurrency(contract?.price)}đ
        </div>
      </div>
      {contract && handleStatusContract(contract) === ContractStatus.INITIAL ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Tiếp tục</Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center">
            <DialogHeader>
              <DialogTitle>Xác nhận thông tin</DialogTitle>
              <DialogDescription className="text-justify">
                Vui lòng kiểm tra toàn bộ thông tin cá nhân, bảo hiểm cùng giá
                tiền. Xác nhận thanh toán đồng nghĩ với việc đồng ý với các
                chính sách bảo hiểm cũng như chịu trách nhiệm về sự chính xác
                của thông tin đã cung cấp
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex w-full gap-1">
              <DialogClose asChild>
                <Button
                  variant={"outline"}
                  className="flex-1 border-primary text-primary hover:bg-primary/5 hover:text-primary"
                >
                  Quay lại kiểm tra
                </Button>
              </DialogClose>

              <Button className="flex-1" onClick={handlePayment}>
                Xác nhận thanh toán
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Button onClick={handlePayment}>Thanh toán</Button>
      )}
    </div>
  );
}

export default PaymentContractBox;
