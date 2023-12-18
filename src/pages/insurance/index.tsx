import React from "react";
import Instruction from "@/components/instruction";
import Banner from "../home/components/banner-carousel/banner";
import InformationCard, {
  InformationItem,
} from "./components/information-card";
import ProductList from "./components/product-list";
import { useParams } from "react-router-dom";
import LoadingPage from "@/components/loading-page";
import useFetchInsuranceBySlug from "./hooks/useFetchInsuranceBySlug";
const ErrorPage = React.lazy(() => import("@/components/error-page"));

const banners = [
  {
    slug: "suc-khoe",
    title: "Bảo hiểm sức khoẻ ưu việt chỉ từ 3.000đ/ngày",
    titleColor: "black",
    bannerSrc: "/banner-2.png",
  },
];

const benefits: InformationItem[] = [
  {
    item: [
      "Phí chỉ từ 3.000 đồng/ngày",
      "Tổng quyền lợi lên tới 454 triệu đồng/năm",
      "Đăng ký & nhận hợp đồng bảo hiểm trực tuyến nhanh - gọn - đơn giản",
      "Bồi thường trong vòng 15 ngày làm việc",
    ],
  },
];

const rules: InformationItem[] = [
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

function InsurancePage() {
  const { slug } = useParams();
  const { data, error } = useFetchInsuranceBySlug(slug as string);
  if (error) return <ErrorPage />;

  if (data)
    return (
      <main className="relative w-full bg-background">
        <section className="relative flex w-full flex-col">
          {banners
            .filter((banner) => banner.slug === slug)
            .map((banner, index) => (
              <Banner
                key={index}
                bannerSrc={banner.bannerSrc}
                title={banner.title}
                titleColor={banner.titleColor}
                button="Mua ngay"
              />
            ))}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[100%] lg:translate-y-1/2">
            <InformationCard
              informations={benefits}
              title={"Ưu điểm nổi bật"}
            />
          </div>
        </section>
        <section className="mt-72 flex w-full justify-center bg-background py-20 lg:mt-40">
          <InformationCard informations={rules} title={"Điều kiện tham gia"} />
        </section>
        <ProductList insurances={data} />
        <Instruction />
      </main>
    );
  return <LoadingPage isLayout={false} />;
}

export default InsurancePage;
