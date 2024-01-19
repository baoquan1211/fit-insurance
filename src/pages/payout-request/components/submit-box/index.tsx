import AlertIcon from "@/components/alert-icon";
import { Button } from "@/components/ui/button";

function SubmitBox() {
  return (
    <div className="sticky bottom-0 left-0 flex h-fit w-full flex-col gap-4 rounded-lg bg-background p-3 md:p-6 lg:max-w-xs">
      <div className="flex gap-2">
        <AlertIcon width={24} height={24} />
        <p className="text-justify text-sm">
          Bằng việc bấm “Gửi yêu cầu”, tôi xác nhận toàn bộ thông tin cung cấp
          là đúng sự thật. Nếu có gì sai xót, tôi hoàn toàn chịu trách nhiệm
          trước pháp luật.
        </p>
      </div>

      <Button type="submit">Gửi yêu cầu</Button>
    </div>
  );
}

export default SubmitBox;
