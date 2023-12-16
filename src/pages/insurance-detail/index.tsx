import { Button } from "@/components/ui/button";
import { numberToCurrency } from "@/lib/utils";
import { calculateFee, findById } from "@/services/app/insurance";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Insurance } from "../insurance/components/product-list";
import { DataResponse } from "@/services";
import { InsuranceFeeStateType } from "../insurance/components/product-list/insurance-fee-form";

export type BenefitType = {
  title: string;
  unit: string;
  key: string;
};

const benefits: BenefitType[] = [
  {
    title: "Tổng hạn mức chi trả",
    unit: "Số tiền/người/năm",
    key: "totalPayPerYear",
  },
  {
    title: "Chi phí nằm viện",
    unit: "Số tiền/ngày",
    key: "inpatientFeePayPerDay",
  },
  {
    title: "Chi phí khám và điều trị trong vòng 30 ngày trước khi nhập viện",
    unit: "Số tiền/năm",
    key: "healthCheckFeePayBeforeInpatientPerYear",
  },
  {
    title: "Chi phí khám và điều trị trong vòng 30 ngày sau khi nhập viện",
    unit: "Số tiền/năm",
    key: "healthCheckFeePayAfterInpatientPerYear",
  },
  {
    title: "Dịch vụ xe cứu thương, xe cấp cứu bằng đường bộ",
    unit: "Số tiền/năm",
    key: "medicalVehicleFeePayPerYear",
  },
  {
    title: "Chi phí phẫu thuật",
    unit: "Số tiền/năm",
    key: "surgicalFeePayPerYear",
  },
  {
    title: "Phục hồi chức năng",
    unit: "Số tiền/năm",
    key: "functionalRestorationPayPerYear",
  },
];

function InsuranceDetailPage() {
  const location = useLocation();
  const feeCalculateState = location.state as InsuranceFeeStateType;
  const { id } = useParams();

  const { data: insurance, error } = useQuery({
    queryKey: ["insurances", id],
    queryFn: async () => {
      const response: DataResponse = await findById(Number(id));
      if (response.status && response.status >= 400) {
        return Promise.reject(response.message);
      }
      if (response.data) return response.data as Insurance;
    },
  });

  const { data: fee } = useQuery({
    queryKey: ["insurance-fee", id],
    queryFn: async () => {
      const response: DataResponse = await calculateFee(
        Number(id),
        feeCalculateState.birthdate,
        feeCalculateState.startDate
      );
      if (response.status && response.status >= 400) {
        return Promise.reject(response.message);
      }
      if (response.data) return response.data as number;
    },
  });
  if (location.state === null) return null;
  if (error) return null;
  if (insurance && fee)
    return (
      <main className="bg-background flex justify-center w-full p-3">
        <section className="border-gray-300 border-[1px] flex flex-col w-full xl:w-[1024px]">
          <div className="flex flex-col md:flex-row justify-between p-4">
            <div className="flex gap-3 items-center justify-start">
              <img
                src="/silver-insurance.png"
                alt="logo"
                width={32}
                height={32}
              />
              <span className="font-bold">Chương trình bảo hiểm Đồng</span>
            </div>
            <div className="flex gap-6 items-center justify-between">
              <span className="font-bold text-primary ml-11 md:ml-0">
                {numberToCurrency(fee)}đ
              </span>
              <Button size={"lg"} className="self-end">
                Mua Ngay
              </Button>
            </div>
          </div>
          {benefits.map((benifit, index) => (
            <React.Fragment key={index}>
              {" "}
              <div className="bg-gray-100 p-4 font-[600]">
                {benifit.title}{" "}
                <span className="text-xs text-gray-600 font-[500]">
                  ({benifit.unit})
                </span>
              </div>
              <div className="p-4 text-sm font-[500]">
                {numberToCurrency(insurance[benifit.key])}đ
              </div>
            </React.Fragment>
          ))}
        </section>
      </main>
    );
}

export default InsuranceDetailPage;
