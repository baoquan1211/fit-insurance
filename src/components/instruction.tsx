import { cn } from "@/lib/utils";

const instructionStep = [
  "Chọn chương trình bảo hiểm",
  "Đăng ký thông tin",
  "Thanh toán",
  "Quản lý hợp đồng trực tuyến",
];

function Instruction() {
  return (
    <section className="hidden w-full items-center justify-center bg-primary-foreground px-6 py-24 md:flex">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-semibold">
          Mua bảo hiểm trực tuyến dễ dàng với 4 bước
        </h2>

        <div className="mt-6 flex flex-col gap-y-3">
          {instructionStep.map((step, index) => (
            <div className="flex gap-x-4" key={index}>
              <div
                className={cn(
                  "relative flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-primary text-xs text-white after:absolute after:bottom-0 after:h-4 after:w-[2px] after:translate-y-[100%] after:bg-gray-500/30",
                  `${instructionStep.length === index + 1 ? "after:h-0" : ""}`,
                )}
              >
                {index + 1}
              </div>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>
      <img
        src="/instruction-banner.png"
        alt="instruction-banner"
        className="h-[300px]"
      />
    </section>
  );
}

export default Instruction;
