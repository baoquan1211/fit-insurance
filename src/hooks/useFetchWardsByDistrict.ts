import { ComboboxFieldData } from "@/components/combobox-field";
import { findAllWardsByDistrict } from "@/services/app/address";
import { useQuery } from "@tanstack/react-query";

function useFetchWardsByDistrict(districtId: number) {
  return useQuery({
    queryKey: ["wards", districtId],
    queryFn: async () => {
      if (districtId === undefined) return null;
      const response = await findAllWardsByDistrict(districtId);
      if (response.status && response.status >= 400) {
        return Promise.reject(response.message);
      }
      if (response.data) {
        return response.data;
      }
    },
    select: (data) => {
      if (data === null) return null;
      const listData: ComboboxFieldData[] = [];
      data?.forEach((ward) => {
        const _province: ComboboxFieldData = {
          label: ward.type + " " + ward.name,
          value: ward.id,
        };
        listData.push(_province);
      });
      return listData;
    },
    staleTime: Infinity,
  });
}

export default useFetchWardsByDistrict;
