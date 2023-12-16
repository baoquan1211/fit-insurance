import { Button } from "@/components/ui/button";

type BannerProps = {
  bannerSrc: string;
  title: string;
  titleColor?: string;
  button: string;
};

function Banner({
  bannerSrc,
  title,
  titleColor = "white",
  button,
}: BannerProps) {
  return (
    <div className="md:h-[50vh] lg:h-[60vh] xl:h-[70vh] 2xl:h-[100vh] relative md:flex flex-col">
      <img src={bannerSrc} alt="banner" className="w-full h-full" />
      <div className="md:absolute top-[50%] md:-translate-y-1/2 left-[17%] flex flex-col gap-y-6 md:gap-y-12 w-full md:w-fit text-black py-10 px-6">
        <span
          className={`z-20 font-bold text-2xl md:text-3xl xl:text-5xl break-words ${
            titleColor === "white" ? "md:text-white" : "md:text-black"
          } md:max-w-[45%]`}
        >
          {title}
        </span>
        <a href={"#insurances"}>
          <Button
            variant={titleColor === "white" ? "secondary" : "default"}
            className="w-fit font-semibold md:block hidden"
            size={"lg"}
          >
            {button}
          </Button>
          <Button className="w-full font-semibold md:hidden block" size={"lg"}>
            {button}
          </Button>
        </a>
      </div>
    </div>
  );
}

export default Banner;
