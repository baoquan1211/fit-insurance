import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function EmptyList() {
  const navigate = useNavigate();
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <img src="/empty-list.svg" alt="empty" className="size-24" />
      <p className="text-lg text-slate-500">Bạn chưa có hợp đồng nào</p>
      <Button size={"lg"} onClick={() => navigate("/")}>
        Mua ngay
      </Button>
    </div>
  );
}

export default EmptyList;
