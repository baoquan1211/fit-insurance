import { cn, numberToCurrency } from "@/lib/utils";
import { PayoutRequest } from "@/services/app/payout-request";
import { format } from "date-fns";

function PayoutRequestStatus({ request }: { request: PayoutRequest }) {
  const PayoutRequestStatusFieldInfo = {
    PENDING: {
      style: "border-primary bg-primary/5 text-primary",
      label: "Chờ duyệt",
    },
    ACCEPTED: {
      style: "border-green-600 bg-green-50 text-green-600",
      label: "Đã duyệt",
    },
    REJECTED: {
      style: "border-destructive bg-primary/5 text-destructive",
      label: "Từ chối",
    },
  };
  return (
    <div className="flex w-full flex-col gap-4 rounded-lg bg-background p-6">
      <h2 className="text-xl font-semibold">Thông tin yêu cầu</h2>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 items-center md:flex md:gap-14">
          <div className="w-28 text-sm font-medium text-slate-500 md:w-40">
            Mã yêu cầu
          </div>
          <div>{request?.id}</div>
        </div>

        <div className="grid grid-cols-2 items-center md:flex md:gap-14">
          <div className="w-28 text-sm font-medium text-slate-500 md:w-40">
            Ngày tạo
          </div>
          <div>{format(new Date(request?.createdAt), "dd/MM/yyyy hh:mm")}</div>
        </div>

        <div className="grid grid-cols-2 items-center md:flex md:gap-14">
          <div className="w-28 text-sm font-medium text-slate-500 md:w-40">
            Tổng bồi thường
          </div>
          <div>{numberToCurrency(request?.totalPay)}đ</div>
        </div>

        <div className="grid grid-cols-2 items-center md:flex md:gap-14">
          <div className="w-28 text-sm font-medium text-slate-500 md:w-40">
            Trạng thái
          </div>
          <div
            className={cn(
              "w-fit rounded-sm border-[1px] p-[6px] text-sm font-medium",
              `${PayoutRequestStatusFieldInfo[request.status]?.style}`,
            )}
          >
            {PayoutRequestStatusFieldInfo[request.status]?.label}
          </div>
        </div>

        {request?.status === "REJECTED" && (
          <div className="grid grid-cols-2 items-center md:flex md:gap-14">
            <div className="w-28 text-sm font-medium text-slate-500 md:w-40">
              Lý do từ chối
            </div>
            <div>{request?.message}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PayoutRequestStatus;
