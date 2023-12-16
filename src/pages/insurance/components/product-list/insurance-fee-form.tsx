import DatePickerField from "@/components/date-picker-field";
import SelectionField, {
  type SelectItemType,
} from "@/components/selection-field";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const insuranceOwners: SelectItemType[] = [
  {
    name: "Bản thân",
    value: "self",
  },
  {
    name: "Người thân",
    value: "family-member",
  },
];

export type InsuranceFeeStateType = {
  insuranceId: number;
  gender: string;
  insuranceOwner: string;
  birthdate: string;
  startDate: string;
};

function InsuranceFeeForm({ insuranceId }: { insuranceId: number }) {
  const [gender, setGender] = useState<"male" | "female" | null>();
  const [insuranceOwner, setInsuranceOwner] = useState<string | undefined>();
  const today = new Date();
  const [birthdate, setBirthdate] = useState<string | undefined>();
  const [startDate, setStartDate] = useState<string | undefined>(
    format(today, "yyyy-MM-dd")
  );
  const { toast } = useToast();
  const navigate = useNavigate();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (
          gender == undefined ||
          insuranceOwner == undefined ||
          birthdate == undefined ||
          startDate == undefined
        ) {
          toast({
            variant: "destructive",
            title: "Có lỗi xảy ra!",
            description: "Vui lòng điền đầy đủ thông tin.",
          });
          return;
        }

        navigate(`/baohiem/chi-tiet/${insuranceId}`, {
          state: {
            insuranceId,
            gender,
            insuranceOwner,
            birthdate,
            startDate,
          } as InsuranceFeeStateType,
        });
      }}
      className="flex flex-col gap-6 mt-6"
    >
      <SelectionField
        placeholder="Chọn"
        label="Người được bảo hiểm là"
        items={insuranceOwners}
        onChange={setInsuranceOwner}
      />
      <DatePickerField
        label={"Ngày sinh"}
        onChange={setBirthdate}
        fromYear={1960}
        toYear={today.getFullYear() - 7}
      />
      <div className="flex flex-col">
        <label className="text-sm font-medium text-secondary-foreground/80 mb-1">
          Giới tính
        </label>
        <div className="flex gap-6">
          <div className="flex gap-2 items-center">
            <Checkbox
              className="rounded-full"
              checked={gender === "male"}
              onClick={() => setGender("male")}
            />
            <span>Nam</span>
          </div>
          <div className="flex gap-2 items-center">
            <Checkbox
              className="rounded-full"
              checked={gender === "female"}
              onClick={() => setGender("female")}
            />
            <span>Nữ</span>
          </div>
        </div>
      </div>
      <DatePickerField
        label={"Ngày hiệu lực bảo hiểm"}
        onChange={setStartDate}
        fromYear={today.getFullYear()}
        toYear={today.getFullYear() + 1}
        defaultDate={today}
      />
      <Button className="w-fit self-end">Tính phí</Button>
    </form>
  );
}

export default InsuranceFeeForm;
