import ProductCard from "./product-card";

const product = [
  {
    name: "Bảo hiểm sức khỏe",
    detail:
      "Giải pháp bảo vệ sức khoẻ ưu việt cho gia đình bạn sống vui khoẻ và an tâm tận hưởng cuộc sống",
    image: "./banner-2.png",
    isActive: true,
  },
  {
    name: "Bảo hiểm ô tô",
    detail:
      "Giải pháp bảo vệ toàn diện giúp bảo vệ bản thân và tài sản trước những rủi ro trên mọi hành trình của bạn",
    image: "./banner-4.png",
    isActive: false,
  },
];

function ProductShow() {
  return (
    <section
      className="w-full mt-80 pt-16 mb-8 lg:mt-36 items-center flex flex-col px-4 lg:px-0"
      id="landing-page-product-show"
    >
      <h1 className="text-2xl w-full md:text-center text-start md:text-3xl font-bold">
        {"Các sản phẩm bảo hiểm"}
      </h1>{" "}
      <div className="flex md:flex-row flex-col gap-8 mt-10">
        {product.map((productItem) => (
          <ProductCard
            key={productItem.name}
            name={productItem.name}
            detail={productItem.detail}
            imageSrc={productItem.image}
            isActive={productItem.isActive}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductShow;
