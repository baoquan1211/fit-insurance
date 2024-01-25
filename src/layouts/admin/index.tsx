import { useAppSelector } from "@/hooks/redux.hook";
import { cn } from "@/lib/utils";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { Users, Receipt, MessageSquarePlus, ReceiptText } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

type MenuItem = {
  icon: React.ReactNode;
  name: string;
  link?: string;
  number?: number;
};

export type SideBarItem = {
  title: string;
  items: MenuItem[];
};

const sideBarItems: SideBarItem[] = [
  {
    title: "NGƯỜI DÙNG",
    items: [
      {
        icon: <Users />,
        name: "Thông tin",
        link: "#",
      },
    ],
  },
  {
    title: "BẢO HIỂM",
    items: [
      {
        icon: <Receipt />,
        name: "Yêu cầu bồi thường",
        link: "/admin/yeu-cau-thanh-toan",
      },
      {
        icon: <MessageSquarePlus />,
        name: "Chương trình bảo hiểm",
        link: "#",
      },
      {
        icon: <ReceiptText />,
        name: "Hợp đồng",
        link: "#",
      },
    ],
  },
];

interface AccessTokenJwt extends JwtPayload {
  role: string;
}

function AdminLayout() {
  const auth = useAppSelector((state) => state.auth);

  const decodedAccess: AccessTokenJwt = jwtDecode(auth.access as string);
  if (decodedAccess.role !== "ADMIN" && decodedAccess.role !== "MANAGER") {
    window.location.href = "/";
  }

  return (
    <div className="flex h-[calc(100dvh-72px)] flex-col gap-4 bg-muted p-6 md:flex-row">
      <aside className="h-fit w-72 rounded-lg bg-background">
        <div className="flex w-full flex-col justify-center gap-6 rounded-lg bg-background py-6 md:size-fit">
          {sideBarItems.map((sideBarItem, index) => (
            <div className="flex flex-col gap-3" key={index}>
              <h3 className="px-6 text-slate-500">{sideBarItem.title}</h3>
              {sideBarItem.items.map((item, index) => (
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
                  {item.number && item.number}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </aside>
      <main className="inline-block h-full flex-grow rounded-lg bg-background">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
