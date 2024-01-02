import React from "react";
import ComboboxField from "@/components/combobox-field";
import useFetchWardsByDistrict from "@/hooks/useFetchWardsByDistrict";

type WardComboboxProps = {
  districtId?: number;
  setWard: React.Dispatch<React.SetStateAction<string | number | undefined>>;
};

function WardCombobox({ districtId, setWard }: WardComboboxProps) {
  const { data: wards, isLoading } = useFetchWardsByDistrict(districtId!);

  return (
    <ComboboxField
      data={wards!}
      label="Phường/Xã"
      setValue={setWard}
      loading={isLoading}
    />
  );
}

export default React.memo(WardCombobox);
