import { Button } from "@/components/ui/button";
import { numberToCurrency } from "@/lib/utils";
import { Contract } from "@/services/app/contract";
import useFetchPaymentUrl from "../hooks/useGetPaymentUrl";

type PaymentBoxProps = {
  contract: Contract;
};

function PaymentBox({ contract }: PaymentBoxProps) {
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
      <Button onClick={handlePayment}>Thanh toán</Button>
    </div>
  );
}

export default PaymentBox;
