import React from "react";
import InsuranceCard from "./insurance-cards";
import { Insurance } from "@/services/app/insurance";

function ProductList({ insurances }: { insurances: Insurance[] }) {
  return (
    <section
      className="flex flex-col items-center justify-center bg-muted px-6 py-14"
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
