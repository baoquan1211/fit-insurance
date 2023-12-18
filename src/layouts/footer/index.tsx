import FACEBOOK_SVG from "@/assets/svg/facebook.svg";
import LINKEDIN_SVG from "@/assets/svg/linkedin.svg";
import { Link } from "react-router-dom";

type Media = {
  name: string;
  link: string;
  svg: string;
};

function Footer() {
  const medias: Media[] = [
    {
      name: "Facebook",
      link: "https://www.facebook.com/dung.rui.bao.quan.day",
      svg: FACEBOOK_SVG,
    },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/b%E1%BA%A3o-qu%C3%A2n-qu%C3%A1ch-91171227a/",
      svg: LINKEDIN_SVG,
    },
  ];
  return (
    <footer
      id="footer"
      className="flex w-full flex-col items-center justify-center bg-background px-6 py-6 xl:px-0"
    >
      <div className="flex w-full max-w-3xl flex-col justify-center border-b-2 py-2 xl:max-w-5xl">
        <Link
          to="/"
          className="select-none text-3xl font-extrabold text-primary"
        >
          fit<span className="text-foreground/95">@insurance</span>
        </Link>
        <div className="mt-6 flex w-full flex-col justify-between gap-2 md:flex-row">
          <div className="flex flex-col">
            <h4 className="text-base font-bold">{"Liên hệ"}</h4>
            <p className="mt-1 text-slate-600">{"Khoa hệ thống thông tin"}</p>
            <p className="text-slate-600">
              {"Địa chỉ: 227 Nguyễn Văn Cừ, Phường 4, Quận 5, TP.Hồ Chí Minh"}
            </p>
            <p className="mt-2 text-slate-600">
              {"Email: info@fit.hcmus.edu.vn"}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="mb-1 text-base font-bold">{"Mạng xã hội"}</h4>
            {medias.map((media) => (
              <div key={media.name} className="flex flex-row gap-2">
                <a href={media.link}>
                  <img src={media.svg} alt="" />
                </a>
                <span className="text-slate-600">{media.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 text-slate-600">
        {"© Copyright 2023. Made by quan-qb"}
      </div>
    </footer>
  );
}

export default Footer;
