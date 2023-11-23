import { cn } from "@/lib/utils";

const instructionStep = [
  "Chọn chương trình bảo hiểm",
  "Đăng ký thông tin",
  "Thanh toán",
  "Quản lý hợp đồng trực tuyến",
];

function Instruction() {
  return (
    <section className="flex mt-24 items-center justify-center py-12 w-full bg-primary-foreground">
      <div className="max-w-xl">
        <h1 className="text-2xl font-semibold">
          Mua bảo hiểm trực tuyến dễ dàng với 4 bước
        </h1>

        <div className="flex flex-col gap-y-3 mt-6">
          {instructionStep.map((step, index) => (
            <div className="flex gap-x-4" key={index}>
              <div
                className={cn(
                  "bg-primary rounded-full w-5 h-5 flex items-center justify-center text-xs text-white cursor-pointer after:bg-gray-500/30 after:w-[2px] after:h-4 relative after:absolute after:bottom-0 after:translate-y-[100%]",
                  `${instructionStep.length === index + 1 ? "after:h-0" : ""}`
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
        src="./instruction-banner.png"
        alt="instruction-banner"
        className="h-[300px]"
      />
    </section>
  );
}

export default Instruction;
