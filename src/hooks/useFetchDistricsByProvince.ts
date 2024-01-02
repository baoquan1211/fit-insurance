import { ComboboxFieldData } from "@/components/combobox-field";
import { District, findAllDistrictsByProvince } from "@/services/app/address";
import { useQuery } from "@tanstack/react-query";

function useFetchDistricsByProvince(provinceId: number) {
  return useQuery({
    queryKey: ["districts", provinceId],
    queryFn: async () => {
      if (provinceId === undefined) return null;
      const response = await findAllDistrictsByProvince(provinceId);
      if (response.status && response.status >= 400) {
        return Promise.reject(response.message);
      }
      if (response.data) {
        return response.data as District[];
      }
    },
    select: (data) => {
      if (data === null) return null;
      const listData: ComboboxFieldData[] = [];
      data?.forEach((district) => {
        const _province: ComboboxFieldData = {
          label: district.type + " " + district.name,
          value: district.id,
        };
        listData.push(_province);
      });
      return listData;
    },
    staleTime: Infinity,
  });
}

export default useFetchDistricsByProvince;
