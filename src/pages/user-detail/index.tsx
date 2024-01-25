import { useAppSelector } from "@/hooks/redux.hook";
import useFetchPayoutRequestByBuyer from "@/hooks/useFetchPayoutRequestByBuyer";
import { SideBarItem } from "@/layouts/admin";
import { cn } from "@/lib/utils";
import { KeyRound, User2, Receipt } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

function UserDetailPage() {
  const auth = useAppSelector((state) => state.auth);
  const { data: requests } = useFetchPayoutRequestByBuyer(
    auth.email as string,
    "all",
  );
  const userMenuItems: SideBarItem[] = [
    {
      title: "TÀI KHOẢN",
      items: [
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
      ],
    },
    {
      title: "BẢO HIỂM",
      items: [
        {
          name: "Yêu cầu bồi thường",
          icon: <Receipt />,
          link: "/nguoi-dung/danh-sach-yeu-cau",
          number: requests?.length,
        },
      ],
    },
  ];
  const location = useLocation();

  return (
    <main className="relative flex h-full w-full flex-grow justify-center bg-muted px-3 py-6 md:py-16">
      <div className="flex w-full flex-col gap-4 md:flex-row lg:max-w-7xl">
        <aside className="flex w-full flex-col justify-center gap-6 rounded-lg bg-background py-6 md:size-fit md:min-w-80">
          {userMenuItems.map((userMenuItem, index) => (
            <div className="flex flex-col gap-3" key={index}>
              <h3 className="px-6 text-slate-500">{userMenuItem.title}</h3>
              {userMenuItem.items.map((item, index) => (
                <Link
                  className={cn(
                    "relative flex justify-between px-6 text-sm before:absolute before:left-0 before:hidden before:h-full before:w-1 before:bg-primary before:transition-all before:duration-150 hover:text-primary hover:before:block",
                    `${
                      location.pathname === item?.link
                        ? "text-primary before:block"
                        : ""
                    }`,
                  )}
                  to={item.link ? item.link : "#"}
                  key={index}
                >
                  <div className="group flex items-center gap-2 transition-all duration-150">
                    {item.icon}
                    {item.name}
                  </div>
                  <span className="flex items-center text-primary">
                    {item.number && item.number}
                  </span>
                </Link>
              ))}
            </div>
          ))}
          <div> </div>
        </aside>
        <div className="lg:min-w-[944px]">
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default UserDetailPage;
