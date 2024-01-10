import React from "react";
import { Button } from "@/components/ui/button";
import { numberToCurrency } from "@/lib/utils";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { InsuranceRegistrationState } from "../insurance/components/product-list/insurance-fee-form";
import useFetchInsuranceById from "@/hooks/useFetchInsuranceById";
import useCalculateFee from "@/hooks/useCalculateFee";

const ErrorPage = React.lazy(() => import("@/components/error-page"));

function InsuranceDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const feeCalculateState = location.state as InsuranceRegistrationState;
  const { id } = useParams();

  const { data: insurance, error } = useFetchInsuranceById(Number(id));

  const { data: fee } = useCalculateFee(
    Number(id),
    feeCalculateState.birthdate,
    feeCalculateState.startDate,
  );

  if (feeCalculateState === null || error) return <ErrorPage />;

  if (insurance && fee)
    return (
      <main className="flex w-full justify-center bg-background p-3">
        <section className="flex w-full flex-col border-[1px] border-gray-300 xl:w-[1024px]">
          <div className="flex flex-col justify-between p-4 md:flex-row">
            <div className="flex items-center justify-start gap-3">
              <img src={insurance.logo} alt="logo" width={32} height={32} />
              <span className="font-bold">
                Chương trình bảo hiểm {insurance.name}
              </span>
            </div>
            <div className="flex items-center justify-between gap-6">
              <span className="ml-11 font-bold text-primary md:ml-0">
                {numberToCurrency(fee)}đ
              </span>
              <Button
                onClick={() =>
                  navigate("/cau-hoi-suc-khoe", {
                    state: feeCalculateState,
                  })
                }
                size={"lg"}
                className="self-end"
              >
                Mua Ngay
              </Button>
            </div>
          </div>
          <div className="bg-gray-100 p-4 font-[600]">
            Tổng hạn mức chi trả{" "}
            <span className="text-xs font-[500] text-gray-600">
              (Số tiền/năm)
            </span>
          </div>
          <div className="p-4 text-sm font-[500]">
            {numberToCurrency(insurance?.totalPayPerYear)}đ
          </div>
          {insurance?.benefits
            .sort((a, b) => a.amount - b.amount)
            .map((benifit, index) => (
              <React.Fragment key={index}>
                <div className="bg-gray-100 p-4 font-[600]">
                  {benifit?.name}{" "}
                  <span className="text-xs font-[500] text-gray-600">
                    ({benifit?.unit})
                  </span>
                </div>
                <div className="p-4 text-sm font-[500]">
                  {/* {numberToCurrency(insurance[benifit.key])}đ */}
                  {numberToCurrency(benifit?.amount)}đ
                </div>
              </React.Fragment>
            ))}
        </section>
      </main>
    );
}

export default InsuranceDetailPage;
