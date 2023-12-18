const slogan = [
  {
    title: "4 bước đăng ký",
    detail: "Bảo hiểm trực tuyến dễ dàng",
  },
  {
    title: "100% trực tuyến",
    detail: "Đăng ký, nhận và quản lý hợp đồng bảo hiểm",
  },
  {
    title: "An toàn tuyệt đối",
    detail: "Bảo mật thông tin khách hàng",
  },
];

function BannerSlogan() {
  return (
    <div className="absolute bottom-0 left-1/2 flex w-[95%] -translate-x-1/2 translate-y-[100%] flex-col items-center justify-center gap-6 rounded-3xl bg-primary-foreground px-6 py-10 drop-shadow-xl lg:w-fit lg:translate-y-1/2 lg:flex-row lg:px-14">
      <h3 className="w-full min-w-fit font-inter text-2xl font-bold lg:w-fit lg:text-center">
        {"Ưu điểm nổi bật"}
      </h3>
      {slogan.map((sloganItem, index) => (
        <div
          className="flex w-full flex-row items-center gap-x-4 md:items-start lg:w-[250px] lg:flex-col"
          key={index}
        >
          <div className="h-fit w-fit rounded-full bg-primary/10 stroke-primary p-3">
            <svg
              viewBox="0 0 24 24"
              focusable="false"
              data-icon="check-circle"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                d="M12 3.75A8.28 8.28 0 003.75 12 8.28 8.28 0 0012 20.25 8.28 8.28 0 0020.25 12c0-.76-.08-1.5-.25-2.16a.75.75 0 111.46-.36c.2.79.29 1.66.29 2.52A9.78 9.78 0 0112 21.75 9.78 9.78 0 012.25 12a9.78 9.78 0 0114.92-8.29.75.75 0 11-.8 1.28A8.15 8.15 0 0012 3.75z"
                fillRule="evenodd"
              ></path>
              <path
                clipRule="evenodd"
                d="M23.53 2.47c.3.3.3.77 0 1.06l-11 11c-.3.3-.77.3-1.06 0l-4-4a.75.75 0 111.06-1.06L12 12.94 22.47 2.47c.3-.3.77-.3 1.06 0z"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold lg:mt-3">{sloganItem.title}</h4>
            <p className="lg:mt-1">{sloganItem.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BannerSlogan;
