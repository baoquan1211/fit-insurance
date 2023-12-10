import DatePickerField from "@/components/date-picker-field";
import SelectionField, {
  type SelectItemType,
} from "@/components/selection-field";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

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

function InsuranceFeeForm({ insurance }: { insurance: string }) {
  const [gender, setGender] = useState<"male" | "female" | null>();
  const [insuranceOwner, setInsuranceOwner] = useState<string | undefined>();
  const [birthday, setBirthday] = useState<string | undefined>();
  const { toast } = useToast();
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (
          gender == undefined ||
          insuranceOwner == undefined ||
          birthday == undefined
        )
          toast({
            variant: "destructive",
            title: "Có lỗi xảy ra!",
            description: "Vui lòng điền đầy đủ thông tin.",
          });
        console.log({ insurance, gender, insuranceOwner, birthday });
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
        onChange={setBirthday}
        fromYear={1960}
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
      <Button className="w-fit self-end">Tính phí</Button>
    </form>
  );
}

export default InsuranceFeeForm;
