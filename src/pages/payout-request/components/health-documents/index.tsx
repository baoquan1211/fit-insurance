import InputField from "@/components/input-field";
import { Signal } from "@preact/signals-react";
import { X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type Document = {
  name: string;
  description?: string;
};

const documentList: Document[] = [
  {
    name: "Căn cước công dân (Hộ chiếu)",
  },
  {
    name: "Hóa đơn y tế và chứng từ liên quan",
    description:
      "Bao gồm hóa đơn chi tiết về các dịch vụ y tế bạn đã nhận, kèm theo các chứng từ như kết quả xét nghiệm, đơn thuốc, và bất kỳ tài liệu y tế nào khác",
  },
  {
    name: "Hóa đơn thanh toán đã chi trả trước (nếu có)",
  },
];

function HealthDocuments({
  healthDocuments,
}: {
  healthDocuments: Signal<File[]>;
}) {
  return (
    <div className="flex max-w-3xl flex-col gap-4 rounded-lg bg-background p-6">
      <div>
        <h2 className="text-xl font-semibold">Thông tin chứng thực</h2>
        <div className="mt-2 text-pretty rounded-lg border-[1px] border-primary bg-primary/5 p-2 text-xs font-normal text-primary">
          Vui lòng đặt tên hình ảnh theo loại giấy tờ để hỗ trợ quá trình duyệt.
          Ví dụ: CanCuocCongDan.png, HonDonThanhToan.jpg, ...
        </div>
        <Sheet>
          <SheetTrigger className="mt-2 w-fit text-left font-medium text-cyan-500">
            Xem danh sách các giấy tờ cần được cung cấp
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader className="mb-3">
              <SheetTitle className="text-left">
                Danh sách các giấy tờ cần cung cấp
              </SheetTitle>
            </SheetHeader>
            <ul className="ml-6 mt-6 flex list-disc flex-col gap-1">
              {documentList?.map((document, index) => (
                <li key={index} className="text-base">
                  {document.name}
                  {document.description && (
                    <span className="text-slate-500">
                      <br />
                      {document.description}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>

      <div className="mt-2">
        <InputField
          label="Giấy tờ sức khỏe liên quan"
          type="file"
          accept="image/*"
          onChange={(event) => {
            if (event.target.files !== null)
              healthDocuments.value = [
                ...healthDocuments.value,
                ...event.target.files,
              ];
          }}
          multiple
          placeholder="Chọn tệp tin"
        />
      </div>
      {healthDocuments.value.length > 0 && (
        <div className="flex flex-col gap-1 pl-2">
          {healthDocuments.value.map((file, index) => (
            <div
              key={index}
              className="flex w-[250px] items-center justify-between gap-4 text-sm text-slate-500 md:w-[350px]"
            >
              <span className="overflow-hidden text-ellipsis text-nowrap">
                file{file.name}
              </span>
              <button
                type="button"
                onClick={() => {
                  const tmpList = [...healthDocuments.value];
                  tmpList.splice(index, 1);
                  healthDocuments.value = tmpList;
                }}
              >
                <X className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HealthDocuments;
