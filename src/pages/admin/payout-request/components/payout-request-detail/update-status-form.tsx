import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogFooter } from "@/components/ui/dialog";
import { FormEvent, useId, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import useUpdateStatusPayoutRequest from "../../hooks/useUpdateStatusPayoutRequest";
import Spinner from "@/components/ui/spinner";
import { useQueryClient } from "@tanstack/react-query";
import { pageIndex, PAGE_SIZE } from "../payout-table";

type UpdateStatusFormProps = {
  requestId: number;
};

function UpdateStatusForm({ requestId }: UpdateStatusFormProps) {
  const { mutateAsync, isPending } = useUpdateStatusPayoutRequest();
  const checkboxId = useId();
  const modalId = useId();
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [isCheck, setIsCheck] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleRefreshQuery = () => {
    queryClient.invalidateQueries({
      queryKey: ["payout-requests", pageIndex.value, PAGE_SIZE],
    });
  };

  const handleSuccess = () => {
    toast({
      variant: "success",
      title: "Thành công",
      description: "Cập nhật trạng thái thành công",
    });
  };

  const handleReject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isCheck === false) {
      toast({
        variant: "destructive",
        description: "Bạn chưa xác nhận điều khoản",
      });
      return;
    }
    if (messageRef.current?.value === "") {
      toast({
        variant: "destructive",
        description: "Bạn chưa nhập lý do từ chối",
      });
      return;
    }
    if (!isPending)
      try {
        await mutateAsync({
          id: requestId,
          status: "rejected",
          message: messageRef.current?.value,
        });
        handleRefreshQuery();
        handleSuccess();
      } catch (e) {
        const error = e as Error;
        toast({
          variant: "destructive",
          title: "Có lỗi xảy ra!",
          description: error.message,
        });
      }
  };

  const handleAccept = async () => {
    if (isCheck === false) {
      toast({
        variant: "destructive",
        description: "Bạn chưa xác nhận điều khoản",
      });
      return;
    }
    if (!isPending)
      try {
        await mutateAsync({
          id: requestId,
          status: "accepted",
        });
        handleRefreshQuery();
        handleSuccess();
      } catch (e) {
        const error = e as Error;
        toast({
          variant: "destructive",
          title: "Có lỗi xảy ra!",
          description: error.message,
        });
      }
  };
  return (
    <>
      {isPending && <Spinner size={48} hasLogo={false} />}
      <div className="mt-2">
        <Checkbox
          id={checkboxId}
          defaultChecked={isCheck}
          onClick={() => {
            setIsCheck((prev) => {
              return !prev;
            });
          }}
        />
        <label className="ml-2 font-semibold" htmlFor={checkboxId}>
          Tôi xác nhận đã đọc kỹ và kiểm chứng toàn bộ thông tin
        </label>
      </div>

      <DialogFooter className="gap-3" id={modalId}>
        <Button onClick={() => handleAccept()} size={"lg"}>
          Duyệt
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button size={"lg"} variant={"destructive"}>
              Từ chối
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleReject} className="flex flex-col gap-3">
              <DialogHeader>
                <DialogTitle>Lý do từ chối yêu cầu bồi thường</DialogTitle>
                <DialogDescription>
                  Vui lòng liệt kê các yêu cầu còn thiếu, hướng dẫn kỹ càng cho
                  khách hàng
                </DialogDescription>
              </DialogHeader>
              <Textarea ref={messageRef} placeholder="Lý do từ chối ..." />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit">Gửi</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </DialogFooter>
    </>
  );
}

export default UpdateStatusForm;
