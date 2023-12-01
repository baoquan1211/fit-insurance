import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Banner from "./banner";
import BannerSlogan from "./banner-slogan";

const banner = [
  {
    title: "Mua bảo hiểm online tại FIT thật dễ dàng chỉ với vài thao tác",
    titleColor: "white",
    bannerSrc: "./banner-1.png",
  },
  {
    title: "Bảo hiểm sức khoẻ ưu việt chỉ từ 3.000đ/ngày",
    titleColor: "black",
    bannerSrc: "./banner-2.png",
  },
  // {
  //   title: "Bảo hiểm ô tô toàn diện chỉ từ 1.200đ/ngày",
  //   titleColor: "white",
  //   bannerSrc: "./banner-3.png",
  // },
];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function BannerCarousel() {
  return (
    <section className="relative flex flex-col">
      <Carousel
        infinite
        draggable={false}
        responsive={responsive}
        showDots={true}
        autoPlay
      >
        {banner.map((bannerItem) => (
          <Banner
            key={bannerItem.bannerSrc}
            bannerSrc={bannerItem.bannerSrc}
            title={bannerItem.title}
            titleColor={bannerItem.titleColor}
          />
        ))}
      </Carousel>
      <BannerSlogan />
    </section>
  );
}

export default BannerCarousel;
