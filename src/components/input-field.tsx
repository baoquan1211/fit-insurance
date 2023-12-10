import { Input } from "./ui/input";
import React, { useId } from "react";

type InputFieldProps = {
  label?: string;
  placeholder?: string;
  type?: string;
  name?: string;
  inputRef?: React.ForwardedRef<HTMLInputElement>;
};

function InputField({
  label,
  name,
  placeholder,
  type,
  inputRef,
  ...props
}: InputFieldProps) {
  const id = useId();
  return (
    <div>
      {label ? (
        <label
          htmlFor={id}
          className="text-sm font-medium text-secondary-foreground/80 mb-1"
        >
          {label}
        </label>
      ) : null}
      <Input
        id={id}
        placeholder={placeholder}
        type={type}
        name={name}
        ref={inputRef}
        {...props}
      />
    </div>
  );
}

export default React.memo(InputField);
