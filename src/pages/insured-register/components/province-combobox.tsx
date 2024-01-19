import React from "react";
import ComboboxField from "@/components/combobox-field";
import useFetchProvinces from "@/hooks/useFetchProvinces";

type RegionComboboxProps = {
  setProvince: React.Dispatch<
    React.SetStateAction<string | number | undefined>
  >;
};

function ProvinceCombobox({ setProvince }: RegionComboboxProps) {
  const { data: provinces, isLoading } = useFetchProvinces();

  return (
    <ComboboxField
      setValue={setProvince}
      data={provinces!}
      label="Tỉnh/Thành phố"
      loading={isLoading}
    />
  );
}

export default React.memo(ProvinceCombobox);
