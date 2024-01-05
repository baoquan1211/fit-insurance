import React, { Suspense } from "react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";
import ContractList from "./components/contract-list";

const Spinner = React.lazy(() => import("@/components/ui/spinner"));

type TabType = {
  tab: string;
  title: string;
};

const tabs: TabType[] = [
  {
    tab: "1",
    title: "Hoàn thành",
  },
  {
    tab: "2",
    title: "Chưa hoàn thành",
  },
  {
    tab: "3",
    title: "Hết hạn",
  },
];

function ContractManage() {
  const [searchParams, setSearchParams] = useSearchParams({
    tab: "1",
  });

  return (
    <main className="relative min-h-[calc(100dvh-72px)] w-full bg-gray-100">
      <div className="flex justify-center bg-white px-4 pt-6">
        <div className="w-full max-w-5xl">
          <h1 className="mb-4 self-start text-2xl font-semibold">
            Quản lý hợp đồng
          </h1>
          <div className="flex gap-6 overflow-x-auto lg:gap-16">
            {tabs.map((tab) => (
              <button
                key={tab.tab}
                onClick={() => setSearchParams({ tab: tab.tab })}
                className={cn(
                  "relative w-max whitespace-nowrap p-2 font-medium duration-200 after:absolute after:bottom-0 after:left-0 after:w-full after:bg-primary after:transition-all",
                  `${
                    searchParams.get("tab") == tab.tab
                      ? "after:h-[2px]"
                      : "text-slate-500 after:h-0 after:translate-x-1"
                  }`,
                )}
              >
                {tab.title}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center p-2 md:p-10">
        <Suspense
          fallback={
            <div className="lg:mt-64flex mt-32 h-full items-center">
              <Spinner size={96} />
            </div>
          }
        >
          <ContractList
            status={
              searchParams.get("tab") == "1"
                ? "active"
                : searchParams.get("tab") == "2"
                  ? "incomplete"
                  : "expired"
            }
          />
        </Suspense>
      </div>
    </main>
  );
}

export default ContractManage;
