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
      className="items-center w-full py-6 justify-center flex flex-col xl:px-0 px-6 bg-background"
    >
      <div className="max-w-3xl xl:max-w-5xl w-full justify-center flex flex-col py-2 border-b-2">
        <Link
          to="/"
          className="font-extrabold text-3xl text-primary select-none"
        >
          fit<span className="text-foreground/95">@insurance</span>
        </Link>
        <div className="flex justify-between w-full flex-col md:flex-row mt-6 gap-2">
          <div className="flex flex-col">
            <h4 className="font-bold text-base">{"Liên hệ"}</h4>
            <p className="text-slate-600 mt-1">{"Khoa hệ thống thông tin"}</p>
            <p className="text-slate-600">
              {"Địa chỉ: 227 Nguyễn Văn Cừ, Phường 4, Quận 5, TP.Hồ Chí Minh"}
            </p>
            <p className="text-slate-600 mt-2">
              {"Email: info@fit.hcmus.edu.vn"}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="font-bold text-base mb-1">{"Mạng xã hội"}</h4>
            {medias.map((media) => (
              <div key={media.name} className="flex gap-2 flex-row">
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
