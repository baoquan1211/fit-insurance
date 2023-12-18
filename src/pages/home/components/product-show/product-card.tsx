import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AdvantageCard from "./advantage-card";

type ProductCardProps = {
  name: string;
  detail: string;
  advantages: string[];
  slug: string;
  imageSrc: string;
  isActive?: boolean;
};

function ProductCard({
  name,
  detail,
  slug,
  advantages,
  imageSrc,
  isActive = true,
}: ProductCardProps) {
  return (
    <div className="h-fit w-full rounded-2xl bg-primary-foreground drop-shadow-lg md:max-w-[330px]">
      <img src={imageSrc} alt="product-card" className="w-full rounded-t-2xl" />
      <div className="flex flex-col gap-2 px-6 py-4">
        <h4 className="font-bold">{name}</h4>
        <p>{detail}</p>
        <AdvantageCard advantages={advantages} />
        <Button disabled={!isActive} className="p-0">
          <Link
            className="flex h-full w-full items-center justify-center"
            to={`baohiem/${slug}`}
          >
            {"Mua ngay"}
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
