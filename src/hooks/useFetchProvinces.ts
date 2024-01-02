import { ComboboxFieldData } from "@/components/combobox-field";
import { findAllProvinces } from "@/services/app/address";
import { useQuery } from "@tanstack/react-query";

function useFetchProvinces() {
  return useQuery({
    queryKey: ["provinces"],
    queryFn: async () => {
      const response = await findAllProvinces();
      if (response.status && response.status >= 400) {
        return Promise.reject(response.message);
      }
      if (response.data) {
        return response.data;
      }
    },
    select: (data) => {
      const listData: ComboboxFieldData[] = [];
      data?.forEach((province) => {
        const _province: ComboboxFieldData = {
          label: province.type + " " + province.name,
          value: province.id,
        };
        listData.push(_province);
      });
      return listData;
    },
    staleTime: Infinity,
  });
}

export default useFetchProvinces;
