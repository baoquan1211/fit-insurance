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
    <div className="relative flex-col md:flex md:h-[50vh] lg:h-[60vh] xl:h-[70vh] 2xl:h-[100vh]">
      <img src={bannerSrc} alt="banner" className="h-full w-full" />
      <div className="left-[17%] top-[50%] flex w-full flex-col gap-y-6 px-6 py-10 text-black md:absolute md:w-fit md:-translate-y-1/2 md:gap-y-12">
        <span
          className={`z-20 break-words text-2xl font-bold md:text-3xl xl:text-5xl ${
            titleColor === "white" ? "md:text-white" : "md:text-black"
          } md:max-w-[45%]`}
        >
          {title}
        </span>
        <a href={"#insurances"}>
          <Button
            variant={titleColor === "white" ? "secondary" : "default"}
            className="hidden w-fit px-12 font-semibold md:block"
            size={"lg"}
          >
            {button}
          </Button>
          <Button className="block w-full font-semibold md:hidden" size={"lg"}>
            {button}
          </Button>
        </a>
      </div>
    </div>
  );
}

export default Banner;
