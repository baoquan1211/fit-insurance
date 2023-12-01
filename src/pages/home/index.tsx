import BannerCarousel from "./components/banner-carousel";
import Instruction from "./components/instruction";
import ProductShow from "./components/product-show";

export default function HomePage() {
  return (
    <main className="bg-gray-100 w-screen">
      <BannerCarousel />
      <ProductShow />
      <Instruction />
    </main>
  );
}
