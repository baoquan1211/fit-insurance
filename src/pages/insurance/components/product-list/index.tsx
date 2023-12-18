import React from "react";
import InsuranceCard from "./insurance-cards";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Insurance extends Record<string, any> {
  id: number;
  name: string;
  description: string;
  feePerMonth: number;
  averageBenefit: number;
  minFeePerYear: number;
  benefit: number;
  logo: string;
  detail: string;
  totalPayPerYear: number;
  inpatientFeePayPerDay: number;
  healthCheckFeePayPerYear: number;
  surgicalFeePayPerYear: number;
  medicalVehicleFeePayPerYear: number;
  functionalRestorationPayPerYear: number;
}

function ProductList({ insurances }: { insurances: Insurance[] }) {
  return (
    <section
      className="flex flex-col items-center justify-center bg-gray-100 px-6 py-14"
      id="insurances"
    >
      <div className="w-[95dvw] xl:w-[1048px]">
        <h2 className="text-start text-xl font-semibold md:text-3xl">
          {"Các chương trình bảo hiểm"}
        </h2>
        <div className="mt-4 flex flex-wrap justify-center gap-6">
          {insurances.map((insurance) => (
            <InsuranceCard
              key={insurance.id}
              id={insurance.id}
              benefit={insurance.totalPayPerYear}
              fee={insurance.minFeePerYear}
              name={insurance.name}
              logoUrl={insurance.logo}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default React.memo(ProductList);
