import BannerCarousel from "./BannerCarousel";
import Instruction from "./Instruction";
import ProductShow from "./ProductShow";

export default function HomePage() {
  return (
    <div className="bg-gray-100 w-screen">
      <BannerCarousel />
      <ProductShow />
      <Instruction />
    </div>
  );
}
