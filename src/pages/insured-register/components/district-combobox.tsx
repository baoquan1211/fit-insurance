import React from "react";
import ComboboxField from "@/components/combobox-field";
import useFetchDistricsByProvince from "@/hooks/useFetchDistricsByProvince";

type DistrictComboboxProps = {
  provinceId?: number;
  setDistrict: React.Dispatch<
    React.SetStateAction<string | number | undefined>
  >;
};

function DistrictCombobox({ provinceId, setDistrict }: DistrictComboboxProps) {
  const { data: districts, isLoading } = useFetchDistricsByProvince(
    provinceId!,
  );
  return (
    <ComboboxField
      data={districts!}
      label="Quận/Huyện"
      setValue={setDistrict}
      loading={isLoading}
    />
  );
}

export default React.memo(DistrictCombobox);
