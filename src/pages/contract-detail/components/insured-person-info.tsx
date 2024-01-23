import { convertGender, formatDate } from "@/lib/utils";
import { Contract } from "@/services/app/contract";

type InsuredPersonInfoItem = {
  key: string;
  title: string;
  type?: "string" | "date" | "gender";
};

const insuredPersonInfo: InsuredPersonInfoItem[] = [
  { key: "name", title: "Họ và tên" },
  { key: "birthdate", title: "Ngày sinh", type: "date" },
  { key: "gender", title: "Giới tính", type: "gender" },
  { key: "identityCard", title: "Số Căn cước công dân" },
  { key: "phone", title: "Số điện thoại" },
  { key: "email", title: "Email" },
  { key: "address", title: "Địa chỉ liên lạc" },
];

type InsuredPersonInfoProps = {
  contract: Contract;
};

function InsuredPersonInfo({ contract }: InsuredPersonInfoProps) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-lg bg-background p-6">
      <h2 className="text-xl font-semibold">Thông tin người được bảo hiểm</h2>

      <div className="flex flex-col gap-6">
        {insuredPersonInfo.map((info) => (
          <div
            className="grid grid-cols-2 items-center md:flex md:gap-14"
            key={info.key}
          >
            <div className="w-28 text-sm font-medium text-slate-500 md:min-w-40">
              {info.title}
            </div>
            <div className="overflow-clip text-wrap">
              {info.type == "gender"
                ? convertGender(contract[info.key])
                : info.type == "date"
                  ? formatDate(contract[info.key])
                  : contract[info.key]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InsuredPersonInfo;
