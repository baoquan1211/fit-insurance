import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import Spinner from "./ui/spinner";

export interface ComboboxFieldData {
  value: string | number;
  label: string;
}

interface ComboboxFieldProps {
  label?: string;
  placeholder?: string;
  data: ComboboxFieldData[];
  setValue: React.Dispatch<React.SetStateAction<string | number | undefined>>;
  className?: string;
  loading?: boolean;
}

export function ComboboxField({
  label,
  data,
  placeholder,
  setValue,
  className,
  loading = false,
}: ComboboxFieldProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const id = React.useId();

  function displayLabel(search: string, data: ComboboxFieldData[]) {
    if (search && data) {
      const _label = data.find((item) => item.label.toLowerCase() === search)
        ?.label;
      if (_label) return _label;
    }
    return placeholder ? placeholder : "Chọn";
  }

  return (
    <div className="flex flex-col">
      {label ? (
        <label
          htmlFor={id}
          className="mb-1 text-sm font-medium text-secondary-foreground/80"
        >
          {label}
        </label>
      ) : null}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("w-full justify-between md:w-52", className)}
            disabled={data === undefined || data === null}
            id={id}
          >
            <span className="overflow-clip text-ellipsis">
              {displayLabel(search, data)}
            </span>

            {loading ? (
              <Spinner size={16} hasLogo={false} />
            ) : (
              <ChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandEmpty>No data found.</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="h-fit max-h-80 w-full overflow-auto">
                {data?.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.label}
                    onSelect={(currentValue) => {
                      setSearch(currentValue === search ? "" : currentValue);
                      setOpen(false);
                      setValue(
                        data.find(
                          (item) => item.label.toLowerCase() === currentValue,
                        )?.value,
                      );
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        item.label.toLowerCase() === search
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {item.label}
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default React.memo(ComboboxField);
