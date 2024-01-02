import ProductCard from "./product-card";
import useFetchInsuranceType from "../../hooks/useFetchInsuranceType";

function ProductShow() {
  const { data } = useFetchInsuranceType();
  return (
    <section
      className="mb-8 mt-80 flex w-full flex-col items-center px-4 pt-16 lg:mt-36 lg:px-0"
      id="insurances"
    >
      <h2 className="w-full text-start text-2xl font-bold md:text-center md:text-3xl">
        {"Các sản phẩm bảo hiểm"}
      </h2>
      <div className="mt-10 flex flex-col gap-8 md:flex-row">
        {data?.map((productItem) => (
          <ProductCard
            advantages={productItem.advantage}
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
