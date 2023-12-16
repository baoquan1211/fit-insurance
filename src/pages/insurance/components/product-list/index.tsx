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
      className="bg-gray-100 flex flex-col items-center justify-center py-14 px-6"
      id="insurances"
    >
      <div className="xl:w-[1048px] w-[95dvw]">
        <h2 className="font-semibold text-xl md:text-3xl text-start">
          {"Các chương trình bảo hiểm"}
        </h2>
        <div className="flex flex-wrap justify-center mt-4 gap-6">
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
