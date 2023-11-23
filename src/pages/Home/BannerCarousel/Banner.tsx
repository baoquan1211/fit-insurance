import { Button } from "@/components/ui/button";

export interface IBannerProps {
  bannerSrc: string;
  title: string;
  titleColor: string;
}

function Banner({ bannerSrc, title, titleColor }: IBannerProps) {
  return (
    <div className="h-[50vh] lg:h-[60vh] xl:h-[70vh] 2xl:h-[100vh] relative">
      <img
        src={bannerSrc}
        alt="banner"
        className="w-full h-full"
        loading="lazy"
      />
      <div className="absolute top-[50%] -translate-y-1/2 left-[10%] flex flex-col gap-y-12">
        <h1
          className={`z-20 font-bold text-2xl md:text-3xl xl:text-5xl ${
            titleColor === "white" ? "text-white" : "text-black"
          } max-w-[40%]`}
        >
          {title}
        </h1>
        <Button
          variant={titleColor === "white" ? "secondary" : "default"}
          className="w-fit font-semibold"
          size={"lg"}
        >
          Tìm hiểu ngay
        </Button>
      </div>
    </div>
  );
}

export default Banner;
