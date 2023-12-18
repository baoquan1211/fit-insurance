import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

export type SelectItem = {
  value: string;
  name: string;
};

type SelectionFieldProps = {
  label?: string;
  placeholder?: string;
  items: SelectItem[];
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
        <label className="mb-1 text-sm font-medium text-secondary-foreground/80">
          {label}
        </label>
      ) : null}
      <Select onValueChange={(value) => onChange(value)}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="border-black p-3">
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
