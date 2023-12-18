import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { numberToCurrency } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import InsuranceFeeForm from "./insurance-fee-form";

type InsuranceCard = {
  id: number;
  name: string;
  logoUrl: string;
  fee: number;
  benefit: number;
};

function InsuranceCard({ id, name, benefit, logoUrl, fee }: InsuranceCard) {
  return (
    <div className="flex h-fit w-[95%] flex-col gap-6 rounded-xl bg-primary-foreground p-6 drop-shadow-md sm:w-[333px]">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <img src={logoUrl} alt="logo" />
          <span className="text-lg font-bold">{name}</span>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Link
              to={"#"}
              className="flex items-center justify-center gap-1 font-semibold text-primary"
            >
              {"Chi tiết"} <ChevronRight size={16} />
            </Link>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="mb-3">
              <SheetTitle>Xem chi tiết quyền lợi và phí</SheetTitle>
              <SheetDescription>
                Nhập thông tin Người được bảo hiểm để nhận quyền lợi và mức phí
                chính xác
              </SheetDescription>
            </SheetHeader>
            <InsuranceFeeForm insuranceId={id} />
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex justify-between">
        <div className="text-sm font-light text-slate-600">
          {"Quyền lợi chính"}
        </div>
        <div className="text-base font-semibold">
          {numberToCurrency(benefit)}
          {"đ"}
        </div>
      </div>
      <div className="flex justify-between">
        <div className="text-sm font-light text-slate-600">{"Phí"}</div>
        <div className="text-base font-semibold">
          {"Từ "}
          {numberToCurrency(fee)}
          {"đ/năm"}
        </div>
      </div>
    </div>
  );
}

export default InsuranceCard;
