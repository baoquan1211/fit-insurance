import { cn } from "@/lib/utils";
import { KeyRound, User2 } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

type MenuItem = {
  icon: React.ReactNode;
  name: string;
  link?: string;
  number?: number;
};

const userMenuItems: MenuItem[] = [
  {
    icon: <User2 />,
    name: "Thông tin cá nhân",
    link: "/nguoi-dung",
  },
  {
    icon: <KeyRound />,
    name: "Thay đổi mật khẩu",
    link: "/nguoi-dung/doi-mat-khau",
  },
];

function UserDetailPage() {
  const location = useLocation();

  return (
    <main className="relative flex h-full w-full flex-grow justify-center bg-gray-100 px-3 py-6 md:py-16">
      <div className="flex w-full flex-col gap-4 md:flex-row lg:max-w-7xl">
        <div className="flex w-full flex-col justify-center rounded-lg bg-background py-6 md:size-fit md:min-w-80">
          <div className="flex flex-col gap-3">
            <h3 className="px-6 text-slate-500">TÀI KHOẢN</h3>
            {userMenuItems.map((item, index) => (
              <Link
                className={cn(
                  "relative flex justify-between px-6 text-sm before:absolute before:left-0 before:hidden before:h-full before:w-1 before:bg-primary before:transition-all before:duration-150 hover:before:block",
                  `${
                    location.pathname === item?.link
                      ? "text-primary before:block"
                      : ""
                  }`,
                )}
                to={item.link ? item.link : "#"}
                key={index}
              >
                <div className="group flex items-center gap-2 transition-all duration-150 hover:text-primary">
                  {item.icon}
                  {item.name}
                </div>
                {item.number && item.number}
              </Link>
            ))}
          </div>
          <div> </div>
        </div>
        <div className="lg:w-[944px]">
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default UserDetailPage;
