import { Button } from "@/components/ui/button";

function ActiveContractBox() {
  return (
    <div className="sticky bottom-0 left-0 flex h-fit w-full flex-row gap-3 rounded-lg bg-background p-3 md:p-6 lg:w-fit lg:flex-col">
      <Button
        variant={"outline"}
        className="w-full border-[1px] border-primary font-medium text-primary hover:bg-primary/5 hover:text-primary lg:w-[250px]"
      >
        Yêu cầu thanh toán
      </Button>

      <Button
        variant={"outline"}
        className="w-full border-[1px] border-primary font-medium text-primary hover:bg-primary/5 hover:text-primary lg:w-[250px]"
      >
        Chỉnh sửa thông tin
      </Button>
    </div>
  );
}

export default ActiveContractBox;
