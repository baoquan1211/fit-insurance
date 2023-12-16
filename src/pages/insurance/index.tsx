import React from "react";
import Instruction from "@/components/instruction";
import Banner from "../home/components/banner-carousel/banner";
import InformationCard, {
  InformationItem,
} from "./components/information-card";
import ProductList, { Insurance } from "./components/product-list";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { DataResponse } from "@/services";
import { findBySlug } from "@/services/app/insurance";
import LoadingPage from "@/components/loading-page";
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
  const { data, error } = useQuery({
    queryKey: ["insurances"],
    queryFn: async () => {
      const response: DataResponse = await findBySlug(slug as string);
      if (response.status && response.status >= 400) {
        return Promise.reject(response.message);
      }
      if (response.data) return response.data as Insurance[];
    },
  });
  if (error) return <ErrorPage />;

  if (data)
    return (
      <main className="relative bg-background w-full">
        <section className="relative flex flex-col w-full">
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
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-[100%] lg:translate-y-1/2">
            <InformationCard
              informations={benefits}
              title={"Ưu điểm nổi bật"}
            />
          </div>
        </section>
        <section className="bg-background py-20 w-full flex justify-center mt-72 lg:mt-40">
          <InformationCard informations={rules} title={"Điều kiện tham gia"} />
        </section>
        <ProductList insurances={data} />
        <Instruction />
      </main>
    );
  return <LoadingPage isLayout={false} />;
}

export default InsurancePage;
