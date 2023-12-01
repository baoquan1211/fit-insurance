import { Input } from "./ui/input";
import { useId } from "react";

export interface InputFieldProps {
  label?: string;
  placeholder?: string;
  type?: string;
  name?: string;
  inputRef?: React.ForwardedRef<HTMLInputElement>;
}

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
        <label htmlFor={id} className="text-sm font-normal text-slate-600 mb-1">
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

export default InputField;
