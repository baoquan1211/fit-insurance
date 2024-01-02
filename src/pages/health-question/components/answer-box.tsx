import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AlertIcon from "@/components/alert-icon";
import { Button } from "@/components/ui/button";
import { InsuranceRegistrationState } from "@/pages/insurance/components/product-list/insurance-fee-form";

function AnswerBox({ state }: { state: InsuranceRegistrationState }) {
  const navigate = useNavigate();

  return (
    <div className="sticky bottom-0 left-0 flex h-fit w-full flex-row gap-3 rounded-lg bg-background p-3 md:flex-col md:p-6">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={"outline"}
            className="font-me w-full border-[1px] border-primary text-primary hover:bg-primary/5 hover:text-primary md:min-w-[250px]"
          >
            Có
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col items-center">
          <AlertIcon height={48} width={48} />
          <DialogHeader>
            <DialogTitle>Không đủ điều kiện mua bảo hiểm</DialogTitle>
            <DialogDescription>
              Lịch sử bệnh lý của Người được bảo hiểm chưa đảm bảo điều kiện
              tham gia bảo hiểm sức khỏe
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex w-full gap-1">
            <Button
              variant={"outline"}
              onClick={() => navigate("/")}
              className="flex-1 border-primary text-primary hover:bg-primary/5 hover:text-primary"
            >
              Quay về trang chủ
            </Button>

            <Button
              onClick={() => navigate("/baohiem/suc-khoe")}
              className="flex-1"
            >
              Thay đổi Người được bảo hiểm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button
        onClick={() => navigate("/dang-ky-thong-tin", { state: state })}
        variant={"outline"}
        className="w-full border-[1px] border-primary font-medium text-primary hover:bg-primary/5 hover:text-primary md:min-w-[250px]"
      >
        Không
      </Button>
    </div>
  );
}

export default AnswerBox;
