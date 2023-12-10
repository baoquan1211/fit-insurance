import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

export type SelectItemType = {
  value: string;
  name: string;
};

type SelectionFieldProps = {
  label?: string;
  placeholder?: string;
  items: SelectItemType[];
  onChange: React.Dispatch<React.SetStateAction<string | undefined>>;
};

function SelectionField({
  label,
  placeholder,
  items,
  onChange,
}: SelectionFieldProps) {
  return (
    <div>
      {label ? (
        <label className="text-sm font-medium text-secondary-foreground/80 mb-1">
          {label}
        </label>
      ) : null}
      <Select onValueChange={(value) => onChange(value)}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="p-3 border-black">
          <SelectGroup>
            {items.map((item, index) => (
              <SelectItem value={item.value} key={index}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default React.memo(SelectionField);
