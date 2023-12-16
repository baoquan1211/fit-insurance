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
    <div className="w-[95%] sm:w-[333px] p-6 bg-primary-foreground h-fit gap-6 flex flex-col rounded-xl drop-shadow-md">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <img src={logoUrl} alt="logo" />
          <span className="font-bold text-lg">{name}</span>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Link
              to={"#"}
              className="flex gap-1 font-semibold text-primary items-center justify-center"
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
        <div className="text-slate-600 font-light text-sm">
          {"Quyền lợi chính"}
        </div>
        <div className="font-semibold text-base">
          {numberToCurrency(benefit)}
          {"đ"}
        </div>
      </div>
      <div className="flex justify-between">
        <div className="text-slate-600 font-light text-sm">{"Phí"}</div>
        <div className="font-semibold text-base">
          {"Từ "}
          {numberToCurrency(fee)}
          {"đ/năm"}
        </div>
      </div>
    </div>
  );
}

export default InsuranceCard;
