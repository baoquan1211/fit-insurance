import DatePickerField from "@/components/date-picker-field";
import SelectionField, { type SelectItem } from "@/components/selection-field";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const insuranceOwners: SelectItem[] = [
  {
    name: "Bản thân",
    value: "self",
  },
  {
    name: "Người thân",
    value: "family-member",
  },
];

export type InsuranceRegistrationState = {
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
  const tommorrow = new Date(+new Date() + 86400000);
  const [birthdate, setBirthdate] = useState<string | undefined>();
  const [startDate, setStartDate] = useState<string | undefined>(
    format(tommorrow, "yyyy-MM-dd"),
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
          } as InsuranceRegistrationState,
        });
      }}
      className="mt-6 flex flex-col gap-6"
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
        <label className="mb-1 text-sm font-medium text-secondary-foreground/80">
          Giới tính
        </label>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <Checkbox
              className="rounded-full"
              checked={gender === "male"}
              onClick={() => setGender("male")}
              id="male-check-box"
            />
            <label htmlFor="male-check-box">Nam</label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              className="rounded-full"
              checked={gender === "female"}
              onClick={() => setGender("female")}
              id="female-check-box"
            />
            <label htmlFor="female-check-box">Nữ</label>
          </div>
        </div>
      </div>
      <DatePickerField
        label={"Ngày hiệu lực bảo hiểm"}
        onChange={setStartDate}
        fromYear={tommorrow.getFullYear()}
        toYear={tommorrow.getFullYear() + 1}
        toDate={new Date(+tommorrow + 86400000 * 29)}
        fromDate={tommorrow}
        defaultDate={tommorrow}
      />
      <Button className="w-fit self-end">Tính phí</Button>
    </form>
  );
}

export default InsuranceFeeForm;
