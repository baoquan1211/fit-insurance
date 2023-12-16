import ProductCard from "./product-card";
import useInsuranceType from "../../hooks/useInsuranceType";

export type InsuranceType = {
  name: string;
  slug: string;
  description: string;
  image: string;
  active: boolean;
  insurances?: [];
};

function ProductShow() {
  const { data } = useInsuranceType();

  return (
    <section
      className="w-full mt-80 pt-16 mb-8 lg:mt-36 items-center flex flex-col px-4 lg:px-0"
      id="insurances"
    >
      <h2 className="text-2xl w-full md:text-center text-start md:text-3xl font-bold">
        {"Các sản phẩm bảo hiểm"}
      </h2>
      <div className="flex md:flex-row flex-col gap-8 mt-10">
        {data?.map((productItem: InsuranceType) => (
          <ProductCard
            key={productItem.slug}
            name={productItem.name}
            slug={productItem.slug}
            detail={productItem.description}
            imageSrc={productItem.image}
            isActive={productItem.active}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductShow;
