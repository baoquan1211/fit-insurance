import ProductCard from "./ProductCard";

const product = [
  {
    name: "Bảo hiểm sức khỏe",
    detail:
      "Giải pháp bảo vệ sức khoẻ ưu việt cho gia đình bạn sống vui khoẻ và an tâm tận hưởng cuộc sống",
    image: "./banner-2.png",
  },
  {
    name: "Bảo hiểm ô tô",
    detail:
      "Giải pháp bảo vệ toàn diện giúp bảo vệ bản thân và tài sản trước những rủi ro trên mọi hành trình của bạn",
    image: "./banner-4.png",
  },
];

function ProductShow() {
  return (
    <section className="w-full mt-96 lg:mt-36 items-center flex flex-col px-4 lg:px-0">
      <h1 className="text-3xl font-bold">{"Các sản phẩm bảo hiểm"}</h1>{" "}
      <div className="flex gap-x-8 mt-10">
        {product.map((productItem) => (
          <ProductCard
            key={productItem.name}
            name={productItem.name}
            detail={productItem.detail}
            imageSrc={productItem.image}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductShow;
