import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerFieldProps = {
  defaultDate?: Date;
  label: string;
  onChange?: React.Dispatch<React.SetStateAction<string | undefined>>;
  fromYear?: number;
  toYear?: number;
};

function DatePickerField({
  defaultDate,
  label,
  onChange,
  fromYear,
  toYear,
}: DatePickerFieldProps) {
  const [date, setDate] = React.useState<Date | undefined>(defaultDate);
  const minYear = React.useMemo(() => {
    const today = new Date();
    return (today.getFullYear() - 19) as number;
  }, []);

  return (
    <div className="flex flex-col">
      {label ? (
        <label className="text-sm font-medium text-secondary-foreground/80 mb-1">
          {label}
        </label>
      ) : null}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "dd/MM/yyyy") : <span>DD/MM/YYYY</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date);
              if (onChange)
                if (date) {
                  onChange(format(date as Date, "yyyy-MM-dd"));
                } else onChange(undefined);
            }}
            toYear={toYear ? toYear : minYear}
            fromYear={fromYear}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default React.memo(DatePickerField);
