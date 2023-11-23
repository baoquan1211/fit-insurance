import { Button } from "@/components/ui/button";

interface IProductCard {
  name: string;
  detail: string;
  imageSrc: string;
}

function ProductCard({ name, detail, imageSrc }: IProductCard) {
  return (
    <div className="max-w-[330px] rounded-2xl drop-shadow-lg bg-primary-foreground">
      <img src={imageSrc} alt="product-card" className="w-full rounded-t-2xl" />
      <div className="flex flex-col px-6 py-4 gap-2">
        <h1 className="font-bold">{name}</h1>
        <p>{detail}</p>
        <button className="flex justify-between mt-2 font-semibold">
          {"Xem ưu điểm sản phẩm"}
          <svg
            viewBox="0 0 24 24"
            focusable="false"
            data-icon="down"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              d="M5.43 8.43a.8.8 0 011.14 0L12 13.87l5.43-5.44a.8.8 0 011.14 1.14l-6 6a.8.8 0 01-1.14 0l-6-6a.8.8 0 010-1.14z"
              fillRule="evenodd"
            ></path>
          </svg>
        </button>
        <Button>{"Mua ngay"}</Button>
      </div>
    </div>
  );
}

export default ProductCard;
