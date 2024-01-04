import AlertIcon from "@/components/alert-icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

function ExpiredContractBox() {
  const navigate = useNavigate();

  return (
    <div className="sticky bottom-0 left-0 flex h-fit w-full flex-row gap-3 rounded-lg bg-background p-3 md:p-6 lg:w-fit lg:flex-col">
      <Button
        variant={"outline"}
        className="w-full border-[1px] border-primary font-medium text-primary hover:bg-primary/5 hover:text-primary lg:w-[250px]"
        onClick={() => navigate("/baohiem/suc-khoe")}
      >
        Mua lại
      </Button>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={"outline"}
            className="w-full border-[1px] border-primary font-medium text-primary hover:bg-primary/5 hover:text-primary lg:w-[250px]"
          >
            Xóa
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col items-center justify-between">
          <AlertIcon height={48} width={48} />
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              Xóa yêu cầu bảo hiểm
            </DialogTitle>
            <DialogDescription>
              Bạn có chắc muốn xoá yêu cầu bảo hiểm này?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex w-full gap-1">
            <DialogClose asChild>
              <Button
                variant={"outline"}
                className="flex-1 border-primary text-primary hover:bg-primary/5 hover:text-primary"
              >
                Hủy
              </Button>
            </DialogClose>

            <Button className="flex-1">Xóa</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ExpiredContractBox;
