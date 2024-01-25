import BannerCarousel from "./components/banner-carousel";
import Instruction from "@/components/instruction";
import ProductShow from "./components/product-show";

export default function HomePage() {
  return (
    <main className="w-full bg-muted">
      <BannerCarousel />
      <ProductShow />
      <Instruction />
    </main>
  );
}
