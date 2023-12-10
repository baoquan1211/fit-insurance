import InsuranceCard from "./insurance-cards";

const insurances = [
  {
    name: "Đồng",
    benefit: 93_800_000,
    logoUrl: "/bronze-insurance.png",
    fee: 1_196_000,
  },
  {
    name: "Bạc",
    benefit: 137_600_000,
    logoUrl: "/silver-insurance.png",
    fee: 1_716_000,
  },
  {
    name: "Vàng",
    benefit: 230_000_000,
    logoUrl: "/gold-insurance.png",
    fee: 2_600_000,
  },
  {
    name: "Bạch kim",
    benefit: 342_000_000,
    logoUrl: "/plantinum-insurance.png",
    fee: 3_510_000,
  },
  {
    name: "Kim cương",
    benefit: 454_000_000,
    logoUrl: "/diamond-insurance.png",
    fee: 4_290_000,
  },
];

function ProductList() {
  return (
    <section
      className="bg-gray-100 flex flex-col items-center justify-center py-14 px-6"
      id="landing-page-product-show"
    >
      <div className="xl:w-[1048px] w-[95dvw]">
        <h1 className="font-semibold text-xl md:text-3xl text-start">
          {"Các chương trình bảo hiểm"}
        </h1>
        <div className="flex flex-wrap justify-center mt-4 gap-6">
          {insurances.map((insurance) => (
            <InsuranceCard
              key={insurance.name}
              benefit={insurance.benefit}
              fee={insurance.fee}
              name={insurance.name}
              logoUrl={insurance.logoUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductList;
