import Instruction from "@/components/instruction";
import Banner from "../home/components/banner-carousel/banner";
import InformationCard, {
  InformationItem,
} from "./components/information-card";
import ProductList from "./components/product-list";

const banner = [
  {
    title: "Bảo hiểm sức khoẻ ưu việt chỉ từ 3.000đ/ngày",
    titleColor: "black",
    bannerSrc: "/banner-2.png",
  },
];

const informations: InformationItem[] = [
  {
    item: [
      "Phí chỉ từ 3.000 đồng/ngày",
      "Tổng quyền lợi lên tới 454 triệu đồng/năm",
      "Đăng ký & nhận hợp đồng bảo hiểm trực tuyến nhanh - gọn - đơn giản",
      "Bồi thường trong vòng 15 ngày làm việc",
    ],
  },
];

const informations_2: InformationItem[] = [
  {
    title: "Người được bảo hiểm là",
    item: [
      "Công dân Việt Nam từ 6 tuổi đến 60 tuổi (mua mới) hoặc đến 65 tuổi (tái tục)",
    ],
  },
  {
    title: "Người mua bảo hiểm là",
    item: [
      "Cá nhân từ 18 tuổi trở lên",
      "Bản thân hoặc bố/mẹ, vợ/chồng, con của Người được bảo hiểm",
      "Bảo hiểm trong phạm vi lãnh thổ Việt Nam",
    ],
  },
];

function ProductPage() {
  return (
    <main className="relative bg-background w-full">
      <section className="relative flex flex-col w-full">
        <Banner
          bannerSrc={banner[0].bannerSrc}
          title={banner[0].title}
          titleColor={banner[0].titleColor}
          button="Mua ngay"
        />
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-[100%] lg:translate-y-1/2">
          <InformationCard
            informations={informations}
            title={"Ưu điểm nổi bật"}
          />
        </div>
      </section>
      <section className="bg-background py-20 w-full flex justify-center mt-72 lg:mt-40">
        <InformationCard
          informations={informations_2}
          title={"Điều kiện tham gia"}
        />
      </section>
      <ProductList />
      <Instruction />
    </main>
  );
}

export default ProductPage;
